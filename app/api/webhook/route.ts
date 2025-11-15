// app/api/webhook/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  const bodyText = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  const expected = crypto.createHmac("sha256", webhookSecret).update(bodyText).digest("hex");
  if (expected !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const payload = JSON.parse(bodyText);
  const event = payload.event;

  if (event === "payment.captured" || event === "order.paid") {
    const payment = payload.payload.payment.entity;
    const razorpayOrderId = payment.order_id;
    const razorpayPaymentId = payment.id;
    const amount = payment.amount; // paise

    // TODO:
    // 1) Try to find DB order by razorpayOrderId (if you saved earlier)
    // 2) If not found, attempt to reconcile using any client metadata in order.notes
    // 3) Save order as paid, mark payment id & amount
    // 4) If you didn't get customer in notes and client didn't call verify-and-save,
    //    you may need to contact customer separately or ask support to reconcile.

    console.log("Webhook verified: payment captured", { razorpayOrderId, razorpayPaymentId, amount });
  }

  return NextResponse.json({ ok: true });
}
