import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import crypto from "crypto"

const VerificationSchema = z.object({
  razorpay_payment_id: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  guestOrderId: z.string().min(1),
})

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export async function POST(req: NextRequest) {
  try{

    if (!RAZORPAY_KEY_SECRET) {
      throw new Error("Payment secret not configured");
    }

    const body = await req.json()
    const parsed = VerificationSchema.safeParse(body)

    if(!parsed.success) {
      return NextResponse.json({ ok:false, error: "Invalid payload", issues: parsed.error.format() }, { status: 400 })
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, guestOrderId } = parsed.data;

    const localOrder = await prisma.guestOrder.findUnique({
      where: {id: guestOrderId},
    })

    if(!localOrder) {
      return NextResponse.json({ ok:false, error: "Order not found"}, { status: 404 })
    }

    if(!localOrder.razorpayOrderId || localOrder.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json({ ok:false, error: "Razorpay order mismatch" }, { status: 400 })
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET).update(payload).digest("hex")

    const sigBuffer = Buffer.from(razorpay_signature, "utf8")
    const expectedBuffer = Buffer.from(expectedSignature, "utf8")

    if(sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)){
      console.warn("Razorpay signature verification failed", { razorpay_order_id, razorpay_payment_id })
      return NextResponse.json({ ok:false, error: "Invalid Signature" }, {status: 400});
    }

    const updated = await prisma.guestOrder.update({
      where: {id: guestOrderId },
      data: {
        paymentStatus: "Paid",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "confirmed",
        paidAt: new Date()
      },
      include: { items: true },
    });

    return NextResponse.json({ ok: true, message: "Payment Verified", order: updated }, { status: 200 })
    
  }catch(err) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}