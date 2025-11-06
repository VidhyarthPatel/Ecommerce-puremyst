// app/api/cart/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Return empty items since we're using local storage only
    return NextResponse.json({ items: [] }, { status: 200 });
  } catch (err) {
    console.error("GET cart error:", err);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Return empty items since we're using local storage only
    return NextResponse.json({ items: [] }, { status: 200 });
  } catch (err) {
    console.error("POST cart error:", err);
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    // Return empty items since we're using local storage only
    return NextResponse.json({ items: [] }, { status: 200 });
  } catch (err) {
    console.error("PUT cart error:", err);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    // Return empty items since we're using local storage only
    return NextResponse.json({ items: [] }, { status: 200 });
  } catch (err) {
    console.error("DELETE cart error:", err);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
