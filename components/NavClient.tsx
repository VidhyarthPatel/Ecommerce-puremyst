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

  useEffect(() => {
    const handleCartUpdated = () => {
      refreshCart();
    };
    window.addEventListener("cartUpdated", handleCartUpdated);
    return () => window.removeEventListener("cartUpdated", handleCartUpdated);
  }, [refreshCart]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  return (
    <>
      <div className="flex items-center space-x-2 md:space-x-6">
        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex items-center relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-theme-blue transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-48 focus:w-64 bg-gray-100/50 dark:bg-white/5 border border-transparent focus:border-theme-blue/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-theme-blue/20 transition-all duration-300"
          />
        </div>

        {/* Search Icon - Mobile */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-theme-blue dark:hover:text-theme-blue transition-colors"
        >
          <Search size={22} />
        </button>

        {/* Cart */}
        <Link
          href="/cart"
          className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-theme-blue dark:hover:text-theme-blue transition-colors group"
        >
          <ShoppingBag size={22} className="group-hover:scale-110 transition-transform duration-200" />
          {cartCount > 0 && isMounted && (
            <span className="absolute -top-0.5 -right-0.5 bg-theme-blue text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce-once shadow-sm ring-2 ring-white dark:ring-blue-900">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-theme-blue dark:hover:text-theme-blue transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-white dark:bg-blue-900 transition-transform duration-300 ease-in-out lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
            <span className="text-lg font-bold text-gray-900 dark:text-white">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-4">
              <MobileNavLink href="/" label="Home" onClick={() => setMenuOpen(false)} />
              <MobileNavLink href="/products" label="Products" onClick={() => setMenuOpen(false)} />
              <MobileNavLink href="/about" label="About Us" onClick={() => setMenuOpen(false)} />
              <MobileNavLink href="/contact" label="Contact" onClick={() => setMenuOpen(false)} />
              <MobileNavLink href="/sale" label="Sale" highlight onClick={() => setMenuOpen(false)} />
            </div>
          </div>
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

function MobileNavLink({ href, label, highlight, onClick }: { href: string, label: string, highlight?: boolean, onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block text-2xl font-light tracking-tight ${highlight
        ? "text-red-500 font-normal"
        : "text-gray-900 dark:text-white hover:text-theme-blue"
        }`}
    >
      {label}
    </Link>
  );
}
