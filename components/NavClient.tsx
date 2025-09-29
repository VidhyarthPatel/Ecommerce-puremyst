"use client";

import { useState, useEffect } from "react";
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function NavClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchCounts = async () => {
    if (session?.user) {
      try {
        const cartRes = await fetch("/api/cart");
        const cartData = await cartRes.json();
        setCartCount(cartData?.items?.length || 0);

        const wishlistRes = await fetch("/api/wishlist");
        const wishlistData = await wishlistRes.json();
        setWishlistCount(wishlistData?.items?.length || 0);
      } catch (err) {
        console.error("Failed to fetch counts:", err);
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const localWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setCartCount(localCart.length);
      setWishlistCount(localWishlist.length);
    }
  };

  useEffect(() => {
    fetchCounts();

    // Listen for real-time updates from cart and wishlist
    const handleCartUpdated = () => fetchCounts();
    window.addEventListener("cartUpdated", handleCartUpdated);
    window.addEventListener("wishlistUpdated", handleCartUpdated);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
      window.removeEventListener("wishlistUpdated", handleCartUpdated);
    };
  }, [session]);

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
          {/* Wishlist */}
          <Link href="/wishlist" className="relative p-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-110 active:scale-95 group">
            <Heart size={20} className="transition-all duration-200 group-hover:fill-red-100 group-hover:stroke-red-500" />
            {wishlistCount > 0 && isMounted && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:bg-red-600">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-110 active:scale-95 group">
            <ShoppingBag size={20} className="transition-all duration-200 group-hover:stroke-2" />
            {cartCount > 0 && isMounted && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center transition-all duration-300 animate-bounce-once hover:scale-125 hover:bg-gray-800">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          <div className="relative group">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-110 active:scale-95">
              <User size={20} />
            </button>
            {/* Account Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              {session?.user ? (
                <>
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                    <p className="text-xs text-gray-500">{session.user.email}</p>
                  </div>
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Account</Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Orders</Link>
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 border-t border-gray-100">Sign Out</button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">Sign In</Link>
                  <Link href="/auth/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100">Create Account</Link>
                </>
              )}
            </div>
          </div>

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
