// app/api/create-order/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const key_id = process.env.RAZORPAY_KEY_ID!;
const key_secret = process.env.RAZORPAY_KEY_SECRET!;

const razorpay = new Razorpay({ key_id, key_secret });

type CreateOrderBody = {
  amount: number; // rupees, e.g., 499
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateOrderBody;
    const rupees = body.amount;
    if (!rupees || rupees <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const amountInPaise = Math.round(rupees * 100);
    const options = {
      amount: amountInPaise,
      currency: body.currency || "INR",
      receipt: body.receipt || `rcpt_${Date.now()}`,
      payment_capture: 1,
      notes: body.notes || {},
    };

    const order = await razorpay.orders.create(options as any);
    // Save mapping in DB: yourOrderId <-> order.id (do this in real app)
    return NextResponse.json(order);
  } catch (err: any) {
    console.error("create-order error:", err);
    return NextResponse.json({ error: err.message || "server error" }, { status: 500 });
  }
}
