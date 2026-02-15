"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";

interface OrderItem {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
}

interface GuestOrder {
  id: string;
  orderNumber: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestAddress: string;
  guestCity: string;
  guestState: string;
  guestZipCode: string;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  status: string;
  items: OrderItem[];
  createdAt: string;
}

import { Skeleton } from "@/components/ui/skeleton";
// ... imports

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<GuestOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Skeleton Component
  const OrderSkeleton = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 mb-12">
          <Skeleton className="w-24 h-24 rounded-full" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-48" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-full max-w-md" />
                <Skeleton className="h-5 w-40" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm h-64 space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-8 w-full mt-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders?id=${orderId}`);
        if (!response.ok) {
          throw new Error("Order not found");
        }
        const orderData = await response.json();
        setOrder(orderData.order);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return <OrderSkeleton />;
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/products">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "confirmed":
        return "text-blue-600 bg-blue-100";
      case "shipped":
        return "text-purple-600 bg-purple-100";
      case "delivered":
        return "text-green-600 bg-green-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Order Received";
      case "confirmed":
        return "Order Confirmed";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-1 animate-fadeIn">
          <div className="relative w-24 h-24">
            {/* Circle animation */}
            <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-pulseRing"></div>

            {/* Circle background */}
            <div className="absolute inset-0 rounded-full bg-green-100 scale-0 animate-scaleUp"></div>

            {/* Tick mark */}
            <svg
              className="absolute inset-0 m-auto w-16 h-16 text-green-600 animate-drawCheck"
              viewBox="0 0 52 52"
            >
              <circle
                className="stroke-current text-green-300"
                cx="26"
                cy="26"
                r="25"
                fill="none"
                strokeWidth="2"
              />
              <path
                className="stroke-current text-green-600"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 27l7 7 16-16"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-light text-gray-900 animate-fadeSlide">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 animate-fadeSlide delay-150 mb-4">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                Order Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Number
                  </label>
                  <p className="text-lg font-mono text-gray-900">
                    {order.orderNumber}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Date
                  </label>
                  <p className="text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Amount
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{order.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Address
              </h2>
              <div className="text-gray-700">
                <p className="font-medium">{order.guestName}</p>
                <p>{order.guestAddress}</p>
                <p>
                  {order.guestCity}, {order.guestState} {order.guestZipCode}
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{order.guestPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{order.guestEmail}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Method
              </h2>
              <div className="text-gray-700">
                <p className="capitalize">
                  {order.paymentMethod.replace("_", " ")}
                </p>
                {order.paymentMethod === "cod" && (
                  <p className="text-sm text-gray-600 mt-1">
                    Payment will be collected upon delivery
                  </p>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items
              </h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ₹{item.productPrice.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ₹{order.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {order.shipping > 0
                      ? `₹${order.shipping.toLocaleString()}`
                      : "Free"}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/products" className="block">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Continue Shopping
                  </button>
                </Link>

                <button
                  onClick={() => window.print()}
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition-colors"
                >
                  Print Order
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• You'll receive an email confirmation shortly</li>
                  <li>• We'll process your order within 1-2 business days</li>
                  <li>• You'll get tracking information when shipped</li>
                  <li>• Expected delivery: 3-5 business days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}