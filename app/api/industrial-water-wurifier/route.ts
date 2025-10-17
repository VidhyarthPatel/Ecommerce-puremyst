import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const products = await prisma.products.findMany({
            where: {
                categories: { 
                    has: "Industrial-Water-Purifier" 
                },
            },
            include: {
                ProductsImage: true
            }
        })

        return NextResponse.json(products)

    }catch(err){
        console.error("Error fetching water purifiers:", err);
        return NextResponse.json({ error: "Failed to fetch water purifiers" }, { status: 500 })
    }
}