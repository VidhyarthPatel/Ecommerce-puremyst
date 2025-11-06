import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation schema for guest order
const guestOrderSchema = z.object({
  guestInfo: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    paymentMethod: z.enum(["card", "upi", "cod"]),
  }),
  items: z.array(z.object({
    productId: z.string(),
    productSlug: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().int().positive(),
    imageUrl: z.string(),
  })),
  subtotal: z.number().nonnegative(),
  shipping: z.number().nonnegative(),
  total: z.number().nonnegative(),
});

// Create guest order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = guestOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { guestInfo, items, subtotal, shipping, total } = parsed.data;

    // Create the guest order
    const order = await prisma.guestOrder.create({
      data: {
        guestName: guestInfo.name,
        guestEmail: guestInfo.email,
        guestPhone: guestInfo.phone,
        guestAddress: guestInfo.address,
        guestCity: guestInfo.city,
        guestState: guestInfo.state,
        guestZipCode: guestInfo.zipCode,
        subtotal,
        shipping,
        total,
        paymentMethod: guestInfo.paymentMethod,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            productSlug: item.productSlug,
            productName: item.name,
            productPrice: item.price,
            productImage: item.imageUrl,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order);
  } catch (err) {
    console.error("POST /api/orders error:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

// Get guest order by ID
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("id");
    const orderNumber = searchParams.get("orderNumber");

    // If no specific order requested, return all orders (for admin dashboard)
    if (!orderId && !orderNumber) {
      const orders = await prisma.guestOrder.findMany({
        include: {
          items: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return NextResponse.json(orders);
    }

    const order = await prisma.guestOrder.findUnique({
      where: orderId ? { id: orderId } : { orderNumber: orderNumber! },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (err) {
    console.error("GET /api/orders error:", err);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

// Update order status (for admin use)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const order = await prisma.guestOrder.update({
      where: { id: orderId },
      data: { status },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order);
  } catch (err) {
    console.error("PUT /api/orders error:", err);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
