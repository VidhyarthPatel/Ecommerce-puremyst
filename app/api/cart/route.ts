// app/api/cart/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return NextResponse.json({ items: [] }, { status: 200 });

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json({ items: cart?.items || [] }, { status: 200 });
  } catch (err) {
    console.error("GET cart error:", err);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productSlug, quantity } = body;

    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    // Ensure user exists in DB
    let user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          name: session.user?.name || "",
          email: session.user?.email || "",
        },
      });
    }

    // Find product by slug
    const product = await prisma.products.findUnique({ where: { slug: productSlug } });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    // Find or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId }, include: { items: true } });
    }

    // Add or update item
    const existingItem = cart.items.find(i => i.productId === product.id);
    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + Number(quantity) },
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId: product.id, quantity: Number(quantity) },
      });
    }

    const updatedCart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json({ items: updatedCart?.items || [] }, { status: 200 });
  } catch (err) {
    console.error("POST cart error:", err);
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { productSlug, quantity } = body;

    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
    if (!cart) return NextResponse.json({ items: [] }, { status: 404 });

    const item = cart.items.find(i => i.product.slug === productSlug);
    if (!item) return NextResponse.json({ items: cart.items || [] }, { status: 404 });

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: item.id } });
    } else {
      await prisma.cartItem.update({ where: { id: item.id }, data: { quantity } });
    }

    const updatedCart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json({ items: updatedCart?.items || [] }, { status: 200 });
  } catch (err) {
    console.error("PUT cart error:", err);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { productSlug } = body;

    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return NextResponse.json({ items: [] }, { status: 401 });

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
    if (!cart) return NextResponse.json({ items: [] }, { status: 404 });

    const item = cart.items.find(i => i.product.slug === productSlug);
    if (!item) return NextResponse.json({ items: cart.items || [] }, { status: 200 });

    await prisma.cartItem.delete({ where: { id: item.id } });

    const updatedCart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json({ items: updatedCart?.items || [] }, { status: 200 });
  } catch (err) {
    console.error("DELETE cart error:", err);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
