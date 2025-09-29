import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> } // ✅ params is a Promise
) {
  const { slug } = await params; // ✅ Await the entire params object first, then destructure
  const product = await prisma.products.findUnique({
    where: { slug },
    include: { ProductsImage: true },
  });

  if (!product) return new NextResponse("Product not found", { status: 404 });

  return NextResponse.json(product);
}