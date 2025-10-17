import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import slugify from "slugify";

// ------------------ VALIDATION SCHEMA ------------------
const productSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().nonnegative("Price must be >= 0"),
  units: z.number().int().nonnegative("Units must be >= 0"),
  featured: z.boolean().optional(),
  rating: z.number().min(0).max(5).optional(),
  images: z.array(z.string().url()).optional(),
  category: z.string().min(1, "Category is required"),
});

// ------------------ CREATE PRODUCT ------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { images, slug, ...rest } = parsed.data;

    // ✅ generate slug
    const newSlug = slugify(rest.name ?? "", { lower: true, strict: true });

    const product = await prisma.products.create({
      data: {
        name: rest.name ?? "",
        category: rest.category,
        slug: newSlug, // use generated slug
        description: rest.description ?? "",
        price: rest.price ?? 0,
        units: rest.units ?? 0,
        featured: rest.featured ?? false,
        rating: rest.rating ?? 0,
        ProductsImage: {
          create: (images ?? []).map((url) => ({ imageUrl: url })),
        },
      },
      include: { ProductsImage: true },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.error("POST /api/products error:", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

// ------------------ GET ALL PRODUCTS ------------------
export async function GET() {
  try {
    const products = await prisma.products.findMany({
      include: { ProductsImage: true },
    });
    return NextResponse.json(products);
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ------------------ UPDATE PRODUCT ------------------
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const updateSchema = productSchema.extend({
      slug: z.string().min(1, "Current product slug is required"),
    });

    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { slug, images, ...rest } = parsed.data;

    // 🔥 always regenerate new slug from name
    const newSlug = slugify(rest.name, { lower: true, strict: true });

    const updatedProduct = await prisma.products.update({
      where: { slug }, // match old slug
      data: {
        name: rest.name ?? "",
        description: rest.description ?? "",
        price: rest.price ?? 0,
        units: rest.units ?? 0,
        category: rest.category,
        slug: newSlug, // update slug
        featured: rest.featured ?? false,
        rating: rest.rating ?? 0,
        ProductsImage: {
          deleteMany: {}, // clear old
          create: (images ?? []).map((url) => ({ imageUrl: url })),
        },
      },
      include: { ProductsImage: true },
    });

    return NextResponse.json(updatedProduct);
  } catch (err: any) {
    console.error("PUT /api/products error:", err);
    return NextResponse.json(
      { error: "Failed to update product", details: err?.message },
      { status: 500 }
    );
  }
}

// ------------------ DELETE PRODUCT ------------------
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        { error: "Product slug is required" },
        { status: 400 }
      );
    }

    await prisma.products.delete({ where: { slug: slug } });
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/products error:", err);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
