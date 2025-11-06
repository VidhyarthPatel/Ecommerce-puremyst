"use client";

import { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";

export default function NavClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { totalItems: cartCount, refreshCart } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Listen for cart updates to refresh cart count
  useEffect(() => {
    const handleCartUpdated = () => {
      console.log('Cart updated event received in NavClient');
      refreshCart();
    };
    
    window.addEventListener("cartUpdated", handleCartUpdated);
    
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
    };
  }, [refreshCart]);

  return (
    <>
      <div className="flex items-center space-x-4">
        {/* Search Button - Mobile */}
        <button onClick={() => setSearchOpen(true)} className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-110 active:scale-95">
          <Search size={20} />
        </button>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:block relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search products..." className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-all duration-300 focus:scale-105 focus:shadow-sm" />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-3">
          {/* Cart */}
          <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-110 active:scale-95 group">
            <ShoppingBag size={20} className="transition-all duration-200 group-hover:stroke-2" />
            {cartCount > 0 && isMounted && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center transition-all duration-300 animate-bounce-once hover:scale-125 hover:bg-gray-800">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu */}
          <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-110 active:scale-95">
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes bounce-once { 0%,100%{transform:scale(1);}50%{transform:scale(1.2);} }
        .animate-bounce-once { animation: bounce-once 0.5s ease-in-out; }
      `}</style>
    </>
  );
}
