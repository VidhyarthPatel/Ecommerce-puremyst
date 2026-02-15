import ProductDetailClient from "./ProductDetailClient";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

// Define the expected shape of the product data with relations
interface ProductWithRelations {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  originalPrice: number | null;
  units: number;
  rating: number | null;
  reviewCount: number | null;
  ProductsImage: { imageUrl: string }[];
  faqs: { question: string; answer: string }[];
  keyFeatures?: string[];
  keyFeatures?: string[];
  specifications?: any;
  reviews?: any[];
}

// Helper to fetch product data
async function getProduct(slug: string): Promise<ProductWithRelations | null> {
  const product = await prisma.products.findUnique({
    where: { slug },
    include: { ProductsImage: true, faqs: true },
  });

  return product as unknown as ProductWithRelations;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | PureMyst",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} | PureMyst`,
    description: product.description || `Buy ${product.name} from PureMyst. Best price and quality guaranteed.`,
    keywords: [product.name, "water purifier", "RO", "UV", "PureMyst"],
    openGraph: {
      title: `${product.name} | PureMyst`,
      description: product.description || `Buy ${product.name} from PureMyst.`,
      images: product.ProductsImage && product.ProductsImage.length > 0
        ? [{ url: product.ProductsImage[0].imageUrl }]
        : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-lg text-gray-500">❌ Product not found.</p>
      </div>
    );
  }

  // Construct JSON-LD Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.ProductsImage?.map((img) => img.imageUrl) || [],
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "PureMyst"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.puremyst.in/products/${product.slug}`,
      "priceCurrency": "INR",
      "price": product.price,
      "availability": product.units > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating || "4.5",
      "reviewCount": product.reviewCount || "50"
    }
  };

  const faqSchema = product.faqs && product.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": product.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Fetch related products
  const relatedProducts = await prisma.products.findMany({
    where: {
      category: product.category,
      NOT: {
        id: product.id,
      },
    },
    take: 4,
    include: {
      ProductsImage: true,
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}