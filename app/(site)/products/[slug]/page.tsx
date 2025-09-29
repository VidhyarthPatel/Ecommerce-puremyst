import ProductDetailClient from "./ProductDetailClient";

async function getProduct(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>; // ✅ Change to Promise
}) {
  const { slug } = await params; // ✅ Await params first, then destructure
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-lg text-gray-500">❌ Product not found.</p>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}