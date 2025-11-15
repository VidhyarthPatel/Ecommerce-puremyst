import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import crypto from "crypto";

type Body = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  customer?: { name?: string; email?: string; phone?: string; address?: string };
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer } = body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET!;
    const generated = crypto.createHmac("sha256", key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Payment is valid — update your DB:
    // mark order (by razorpay_order_id) as paid and save razorpay_payment_id
    // store customer info (customer.address etc) alongside the order
    // optionally send confirmation email or SMS here

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("verify-payment error:", err);
    return NextResponse.json({ error: err.message || "server error" }, { status: 500 });
  }
}
