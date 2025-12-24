import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.products.findMany({
            where: {
                category: {
                    equals: "Washing Machine Cleaner"
                },
            },
            include: {
                ProductsImage: true
            }
        })

        return NextResponse.json(products)

    } catch (err) {
        console.error("Error fetching washing machine cleaners:", err);
        return NextResponse.json({ error: "Failed to fetch washing machine cleaners" }, { status: 500 })
    }
}
