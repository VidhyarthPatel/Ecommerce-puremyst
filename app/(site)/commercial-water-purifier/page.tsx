import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/commercial-water-purifier`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💧</span>
          </div>
          <p className="text-gray-500 text-lg">No products available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-gray-900 mb-3">Indistrials water purifiers</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Advanced purification technology for clean, safe drinking water</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any) => {
            const firstImage =
              product.ProductsImage?.[0]?.imageUrl ?? "/placeholder.png";

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group"
              >
                <div className="bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-all duration-300 overflow-hidden flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-6">
                    <img
                      src={firstImage}
                      alt={product.name}
                      className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-medium text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
                      {product.description || "Premium water purification system"}
                    </p>

                    <div className="mt-auto space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold text-gray-900">
                          ₹{product.price}
                        </span>
                        {product.rating && (
                          <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full">
                            <span className="text-blue-600 text-sm">⭐</span>
                            <span className="text-blue-600 text-sm font-medium">{product.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* View Details Button */}
                      <button className="w-full mt-3 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 group-hover:bg-blue-50 group-hover:text-blue-600">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}