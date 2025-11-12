// app/api/verify-payment/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import crypto from "crypto";

type VerifyBody = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as VerifyBody;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET!;
    const generated_signature = crypto
      .createHmac("sha256", key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // TODO: update order in DB: set status paid for razorpay_order_id
      // await updateOrderPaidInDB(razorpay_order_id, razorpay_payment_id);

      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } catch (err: any) {
    console.error("verify-payment error:", err);
    return NextResponse.json({ error: err.message || "server error" }, { status: 500 });
  }
}
