"use client";
import React, { useState } from "react";

type Customer = { name?: string; email?: string; phone?: string };
type Props = {
  amountRupees: number;
  productName?: string;
  customer?: Customer;
};

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export default function RazorpayCheckoutButton({ amountRupees, productName, customer }: Props) {
  const [loading, setLoading] = useState(false);

  async function loadRazorpaySdk() {
    if (window.Razorpay) return;
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
      document.body.appendChild(script);
    });
  }

  async function handlePay() {
    setLoading(true);
    try {
      await loadRazorpaySdk();

      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountRupees }),
      });

      const order = await res.json();
      if (!res.ok || !order?.id) {
        throw new Error(order?.error || "Could not create order");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: productName || "My Store",
        description: "Order payment",
        order_id: order.id,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          // Send to server to verify
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyJson = await verifyRes.json();
          if (verifyRes.ok) {
            // Success flow: show UI + redirect + update DB
            alert("Payment successful!");
          } else {
            alert("Payment verification failed: " + (verifyJson?.error || ""));
          }
        },
        prefill: {
          name: customer?.name || "",
          email: customer?.email || "",
          contact: customer?.phone || "",
        },
        theme: { color: "#2563eb" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" onClick={handlePay} disabled={loading}>
      {loading ? "Processing…" : `Pay ₹${amountRupees}`}
    </button>
  );
}
