// app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma"; // <--- use default export (adjust if your lib exports named)

const ItemSchema = z.object({
  productId: z.string().min(1),
  productSlug: z.string().optional().nullable().default(""),
  productName: z.string().min(1),
  productPrice: z.number().nonnegative(),
  productImage: z.string().optional().nullable().default(""),
  quantity: z.number().int().positive(),
});

const CustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  address: z.string().min(3).max(100),
  city: z.string().min(1).max(50),
  state: z.string().min(1).max(50),
  zipCode: z.string().min(1).max(10),
});

const CreateOrderSchema = z.object({
  customer: CustomerSchema,
  items: z.array(ItemSchema).min(1),
  shippingRupees: z.number().nonnegative().optional(),
});

// read envs once
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.warn(
    "Warning: Razorpay keys not set. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env"
  );
}

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID ?? "",
  key_secret: RAZORPAY_KEY_SECRET ?? "",
});

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
    const perPage = Math.min(100, Math.max(1, Number(url.searchParams.get("perPage") ?? 10)));
    const status = (url.searchParams.get("status") ?? "all").toLowerCase();
    const search = (url.searchParams.get("search") ?? "").trim();

    const where: any = {};

    if (status !== "all") {
      where.status = status;
    }

    if (search) {
      const q = search.toLowerCase();
      where.OR = [
        { orderNumber: { contains: q, mode: "insensitive" } },
        { guestName: { contains: q, mode: "insensitive" } },
        { guestEmail: { contains: q, mode: "insensitive" } },
      ];
    }

    const [total, orders] = await Promise.all([
      prisma.guestOrder.count({ where }),
      prisma.guestOrder.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
        include: { items: true },
      }),
    ]);

    return NextResponse.json({
      ok: true,
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
      data: orders,
    });
  } catch (err: any) {
    console.error("orders.GET error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parse = CreateOrderSchema.safeParse(body);

    if (!parse.success) {
      // zod issues - return structured errors
      return NextResponse.json(
        { ok: false, error: "Invalid request payload", issues: parse.error.format() },
        { status: 400 }
      );
    }

    const { customer, items, shippingRupees } = parse.data;

    // compute totals server-side (rupees, as your schema uses Float)
    const subtotal = items.reduce((s, it) => s + it.productPrice * it.quantity, 0);
    const shipping = typeof shippingRupees === "number" ? shippingRupees : subtotal > 0 ? 40 : 0;
    const total = subtotal + shipping;

    const totalPaise = Math.round(total * 100);
    if (totalPaise <= 0) {
      return NextResponse.json({ ok: false, error: "Invalid total amount" }, { status: 400 });
    }

    const receipt = `pm_${uuidv4()}`;

    // create DB order and items snapshot
    const createdOrder = await prisma.guestOrder.create({
      data: {
        orderNumber: receipt,
        guestName: customer.name,
        guestEmail: customer.email ?? "",
        guestPhone: customer.phone,
        guestAddress: customer.address,
        guestCity: customer.city,
        guestState: customer.state,
        guestZipCode: customer.zipCode,

        subtotal,
        shipping,
        total,
        // currency: "INR",
        paymentMethod: "online",
        status: "pending",
        paymentStatus: "pending",
        receipt,

        items: {
          create: items.map((it) => ({
            productId: it.productId,
            productSlug: it.productSlug ?? "",
            productName: it.productName,
            productPrice: it.productPrice,
            productImage: it.productImage ?? "",
            quantity: it.quantity,
          })),
        },
      },
      include: { items: true },
    });

    // Create Razorpay order (wrap to catch external errors)
    let rzpOrder;
    try {
      rzpOrder = await razorpay.orders.create({
        amount: totalPaise,
        currency: "INR",
        receipt,
        notes: { guestOrderId: createdOrder.id, source: "puremyst" },
      });
    } catch (rzErr: any) {
      console.error("Razorpay create order error:", rzErr);
      // Optionally rollback DB order or mark it failed. For now, return error.
      return NextResponse.json(
        { ok: false, error: "Payment gateway error creating order" },
        { status: 502 }
      );
    }

    await prisma.guestOrder.update({
      where: { id: createdOrder.id },
      data: { razorpayOrderId: rzpOrder.id, status: "created" },
    });

    return NextResponse.json(
      {
        ok: true,
        guestOrderId: createdOrder.id,
        razorpayOrderId: rzpOrder.id,
        amountPaise: totalPaise,
        currency: rzpOrder.currency ?? "INR",
        key: RAZORPAY_KEY_ID,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("orders.create error:", err);
    return NextResponse.json({ ok: false, error: "Server error creating order" }, { status: 500 });
  }
}
