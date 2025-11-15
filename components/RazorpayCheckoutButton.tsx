"use client";

import React, { useState } from "react";

type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

type GuestInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

export default function RazorpayCheckoutButton({
  amountRupees,
  guestInfo,
  items,
}: {
  amountRupees: number; // rupees (e.g., 499)
  guestInfo: GuestInfo;
  items: CartItem[];
}) {
  const [loading, setLoading] = useState(false);

  // ensure razorpay script loaded
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((res) => {
      if (typeof window === "undefined") return res(false);
      if ((window as any).Razorpay) return res(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => res(true);
      script.onerror = () => res(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (!guestInfo.name || !guestInfo.phone || !guestInfo.address) {
      alert("Please fill required contact & address fields.");
      return;
    }

    setLoading(true);
    try {
      const ok = await loadRazorpayScript();
      if (!ok) throw new Error("Unable to load Razorpay SDK");

      // Map items to the shape expected by server
      const payload = {
        customer: {
          name: guestInfo.name,
          email: guestInfo.email,
          phone: guestInfo.phone,
          address: guestInfo.address,
          city: guestInfo.city,
          state: guestInfo.state,
          zipCode: guestInfo.zipCode,
        },
        items: items.map((it) => ({
          productId: it.id,
          productSlug: it.slug,
          productName: it.name,
          productPrice: it.price, // rupees (server will convert to paise)
          productImage: it.imageUrl ?? "",
          quantity: it.quantity,
        })),
        // Optional: you may send shippingRupees if your server accepts it
      };

      // CREATE ORDER (server: create DB row + Razorpay order)
      const createResp = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const createJson = await createResp.json();
      if (!createResp.ok || !createJson.ok) {
        console.error("create-order error", createJson);
        throw new Error(createJson.error || "Failed to create order");
      }

      const { razorpayOrderId, amountPaise, currency, guestOrderId, key } =
        createJson;

      if (!razorpayOrderId || !amountPaise || !key) {
        throw new Error("Invalid create-order response");
      }

      // Open Razorpay Checkout
      const options = {
        key, // RAZORPAY_KEY_ID from server
        amount: amountPaise,
        currency: currency ?? "INR",
        name: "PureMyst",
        description: `Order ${guestOrderId ?? ""}`,
        order_id: razorpayOrderId,
        prefill: {
          name: guestInfo.name,
          email: guestInfo.email,
          contact: guestInfo.phone,
        },
        handler: async function (response: any) {
          // response: { razorpay_payment_id, razorpay_order_id, razorpay_signature }
          try {
            // Verify payment on server
            const verifyResp = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyJson = await verifyResp.json();
            if (!verifyResp.ok || !verifyJson.ok) {
              console.error("verify-payment failed", verifyJson);
              alert(
                "Payment verification failed. If money was deducted, contact support with your order id."
              );
              return;
            }

            // Success: clear cart and redirect to success page
            try {
              localStorage.removeItem("ecommerce_cart");
              window.dispatchEvent(new Event("cartUpdated"));
            } catch (e) {
              // ignore
            }

            // redirect to order confirmation — use guestOrderId if returned
            const successOrderId = verifyJson.guestOrderId ?? guestOrderId;
            if (successOrderId) {
              window.location.href = `/order-confirmation/${successOrderId}`;
            } else {
              window.location.href = "/order-confirmation";
            }
          } catch (err) {
            console.error("Error verifying payment", err);
            alert("Payment succeeded but verification failed. Contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            // Optional: handle user dismissed checkout
            console.log("Razorpay modal closed");
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("checkout error:", err);
      alert(err.message || "Checkout error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Processing..." : `Pay ₹${amountRupees.toLocaleString()}`}
    </button>
  );
}
