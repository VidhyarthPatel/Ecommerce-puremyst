// app/api/webhook/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    const bodyText = await req.text(); // raw body
    const signature = req.headers.get("x-razorpay-signature") || "";

    const expected = crypto.createHmac("sha256", secret).update(bodyText).digest("hex");

    if (expected !== signature) {
      console.warn("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(bodyText);
    const event = payload.event; // e.g. 'payment.captured', 'order.paid', etc.
    console.log("Verified webhook event:", event);

    // Example: handle payment captured
    if (event === "payment.captured") {
      const payment = payload.payload.payment.entity;
      const razorpayOrderId = payment.order_id;
      const paymentId = payment.id;
      const amount = payment.amount; // in paise

      // TODO: update your DB: set order paid using razorpayOrderId
      // await markOrderPaid(razorpayOrderId, paymentId, amount);

      // Optionally send confirmation email to customer (see below)
    }

    // respond quickly
    return NextResponse.json({ status: "ok" });
  } catch (err: any) {
    console.error("webhook error:", err);
    return NextResponse.json({ error: err.message || "server error" }, { status: 500 });
  }
}
