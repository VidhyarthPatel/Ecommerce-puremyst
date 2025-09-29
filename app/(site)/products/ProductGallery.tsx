// "use client";

// import { useState } from "react";

// export function ProductGallery({ product }: { product: any }) {
//   const [previewImage, setPreviewImage] = useState(
//     product.ProductsImage?.[0]?.imageUrl || "/placeholder.png"
//   );

//   const handleAddToCart = () => {
//     alert(`🛒 Added "${product.name}" to cart`);
//   };

//   const handleBuyNow = () => {
//     alert(`⚡ Proceeding to checkout for "${product.name}"`);
//   };

//   return (
//     <div className="font-sans max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
//       {/* LEFT SIDE - IMAGE GALLERY */}
//       <div className="flex gap-6">
//         {/* Thumbnails */}
//         <div className="flex flex-col gap-4">
//           {product.ProductsImage?.map((img: any, i: number) => (
//             <img
//               key={i}
//               src={img.imageUrl}
//               alt={`${product.name} ${i}`}
//               className={`w-20 h-20 object-cover border rounded-md cursor-pointer transition ${
//                 previewImage === img.imageUrl
//                   ? "border-black shadow-md"
//                   : "hover:border-gray-400"
//               }`}
//               onClick={() => setPreviewImage(img.imageUrl)}
//             />
//           ))}
//         </div>
//         {/* Main Image */}
//         <div className="flex-1">
//           <img
//             src={previewImage}
//             alt={product.name}
//             className="w-full h-[450px] object-cover rounded-xl shadow-lg transition-all duration-300"
//           />
//         </div>
//       </div>

//       {/* RIGHT SIDE - DETAILS */}
//       <div>
//         <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

//         {/* Rating */}
//         <div className="flex items-center gap-2 mb-4">
//           <span className="bg-green-600 text-white text-sm px-2 py-1 rounded">
//             {product.rating || "4.5"} ★
//           </span>
//           <span className="text-gray-500 text-sm">Customer Reviews</span>
//         </div>

//         {/* Price */}
//         <div className="mb-6">
//           <span className="text-4xl font-semibold text-gray-900">
//             ₹{product.price}
//           </span>
//           <span className="text-gray-500 line-through ml-3">₹6,999</span>
//           <span className="text-green-600 ml-3 font-medium">62% OFF</span>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-4 mb-6">
//           <button
//             onClick={handleAddToCart}
//             className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-semibold shadow transition"
//           >
//             🛒 Add to Cart
//           </button>
//           <button
//             onClick={handleBuyNow}
//             className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold shadow transition"
//           >
//             ⚡ Buy Now
//           </button>
//         </div>

//         {/* Description */}
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-2">About this item</h2>
//           <p className="text-gray-700 leading-relaxed">
//             {product.description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
