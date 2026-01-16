import ProductDetailClient from "./ProductDetailClient";
import { prisma } from "@/lib/prisma";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.products.findUnique({
    where: { slug },
    include: { ProductsImage: true, faqs: true } as any,
  });

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-lg text-gray-500">❌ Product not found.</p>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}