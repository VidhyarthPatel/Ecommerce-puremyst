// app/api/verify-and-save/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import crypto from "crypto";

// replace the following with your DB logic
async function saveOrderToDB(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  customer: any;
  items: any[];
  amount?: number;
}) {
  // TODO: implement DB insertion (Mongo, Prisma, Postgres...)
  // return the inserted order id
  // Example pseudo:
  // const newOrder = await db.orders.create({ data: { ... }});
  // return newOrder.id;
  return "fake-order-id-123"; // replace
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as any;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer, items } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      console.warn("Invalid signature", { expected, got: razorpay_signature });
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // signature valid -> now save order + customer address to DB
    const savedOrderId = await saveOrderToDB({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      items,
    });

    // return created order id so frontend can redirect to confirmation
    return NextResponse.json({ ok: true, orderId: savedOrderId });
  } catch (err: any) {
    console.error("verify-and-save error:", err);
    return NextResponse.json({ error: err.message || "server error" }, { status: 500 });
  }
}
