import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import crypto from "crypto"
import { resend } from "@/lib/resend";

const VerificationSchema = z.object({
  razorpay_payment_id: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  guestOrderId: z.string().min(1),
})

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export async function POST(req: NextRequest) {
  try {

    if (!RAZORPAY_KEY_SECRET) {
      throw new Error("Payment secret not configured");
    }

    const body = await req.json()
    const parsed = VerificationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid payload", issues: parsed.error.format() }, { status: 400 })
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, guestOrderId } = parsed.data;

    const localOrder = await prisma.guestOrder.findUnique({
      where: { id: guestOrderId },
    })

    if (!localOrder) {
      return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 })
    }

    if (!localOrder.razorpayOrderId || localOrder.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json({ ok: false, error: "Razorpay order mismatch" }, { status: 400 })
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET).update(payload).digest("hex")

    const sigBuffer = Buffer.from(razorpay_signature, "utf8")
    const expectedBuffer = Buffer.from(expectedSignature, "utf8")

    if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
      console.warn("Razorpay signature verification failed", { razorpay_order_id, razorpay_payment_id })
      return NextResponse.json({ ok: false, error: "Invalid Signature" }, { status: 400 });
    }

    const updated = await prisma.guestOrder.update({
      where: { id: guestOrderId },
      data: {
        paymentStatus: "Paid",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "confirmed",
        paidAt: new Date()
      },
      include: { items: true },
    });

    // Send emails
    try {
      // Send confirmation email to customer
      await resend.emails.send({
        from: 'PureMyst <onboarding@resend.dev>',
        to: updated.guestEmail,
        subject: `Order Confirmation - ${updated.orderNumber}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h1 style="color: #333;">Thank you for your purchase!</h1>
            <p>Hi <strong>${updated.guestName}</strong>,</p>
            <p>Your order <strong>#${updated.orderNumber}</strong> has been successfully placed and paid for.</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <h3>Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 2px solid #eee;">
                  <th style="padding: 10px 0; text-align: left;">Item</th>
                  <th style="padding: 10px 0; text-align: center;">Qty</th>
                  <th style="padding: 10px 0; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${updated.items.map(item => `
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px 0;">${item.productName}</td>
                    <td style="padding: 10px 0; text-align: center;">${item.quantity}</td>
                    <td style="padding: 10px 0; text-align: right;">${updated.currency} ${item.productPrice}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div style="margin-top: 20px; text-align: right;">
              <p>Subtotal: ${updated.currency} ${updated.subtotal}</p>
              <p>Shipping: ${updated.currency} ${updated.shipping}</p>
              <h2 style="color: #333;">Total: ${updated.currency} ${updated.total}</h2>
            </div>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p>We'll notify you when your items are on the way.</p>
            <p>Regards,<br/>PureMyst Team</p>
          </div>
        `
      });

      // Send notification email to founder
      await resend.emails.send({
        from: 'PureMyst <onboarding@resend.dev>',
        to: 'vidyarthpatel@gmail.com',
        subject: `New Order Received - ${updated.orderNumber}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h1 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Order Alert!</h1>
            <p><strong>Order Number:</strong> ${updated.orderNumber}</p>
            <p><strong>Customer:</strong> ${updated.guestName} (${updated.guestEmail})</p>
            <p><strong>Phone:</strong> ${updated.guestPhone}</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <h3>Shipping Address</h3>
            <p>${updated.guestAddress}<br/>${updated.guestCity}, ${updated.guestState} - ${updated.guestZipCode}</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <h3>Items</h3>
            <ul>
              ${updated.items.map(item => `<li>${item.productName} (x${item.quantity}) - ${updated.currency} ${item.productPrice}</li>`).join('')}
            </ul>
            <h2>Total Revenue: ${updated.currency} ${updated.total}</h2>
          </div>
        `
      });
    } catch (emailError) {
      console.error("Failed to send purchase emails:", emailError);
    }

    return NextResponse.json({ ok: true, message: "Payment Verified", order: updated }, { status: 200 })

  } catch (err) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}