"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Search, ShoppingBag, Menu, X, ChevronDown, ChevronUp, User } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";

type DropdownItem = {
  href: string;
  label: string;
  highlight?: boolean;
};

type NavItem = {
  href?: string;
  label: string;
  dropdown?: boolean;
  dropdownItems?: DropdownItem[];
  highlight?: boolean;
};

export default function NavClient({ navItems }: { navItems: NavItem[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
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

  const toggleAccordion = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <>
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex items-center relative group">
          <input
            type="text"
            placeholder="Search..."
            className="pl-4 pr-10 py-2 w-48 focus:w-64 bg-gray-100 border border-transparent focus:border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500 transition-colors" />
          </div>
        </div>

        {/* Search Icon - Mobile */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="lg:hidden p-2 text-gray-600 hover:text-[#0b6c2c] transition-colors"
        >
          <Search size={22} />
        </button>

        {/* User Profile */}
        <Link
          href="/dashboard"
          className="hidden lg:block relative p-2 text-gray-600 hover:text-[#0b6c2c] transition-colors group"
        >
          <User size={22} className="group-hover:scale-110 transition-transform duration-200" />
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className="relative p-2 text-gray-600 hover:text-[#0b6c2c] transition-colors group"
        >
          <ShoppingBag size={22} className="group-hover:scale-110 transition-transform duration-200" />
          {cartCount > 0 && isMounted && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#4c35e6] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce-once shadow-sm ring-2 ring-white">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden p-2 text-gray-600 hover:text-[#0b6c2c] transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[9999] bg-white dark:bg-[#004D5A] transition-transform duration-300 ease-in-out lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
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
                  {navItems.map((item) => (
                    <div key={item.label} className="border-b border-gray-100 dark:border-gray-800 pb-2 last:border-0">
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => toggleAccordion(item.label)}
                            className="flex items-center justify-between w-full text-2xl font-light tracking-tight text-gray-900 dark:text-white hover:text-[#007C91] py-2"
                          >
                            {item.label}
                            {expandedItem === item.label ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-300 ${expandedItem === item.label ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                              }`}
                          >
                            <div className="flex flex-col space-y-3 pl-4 border-l-2 border-gray-100 dark:border-gray-700 ml-1">
                              {item.dropdownItems?.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  onClick={() => setMenuOpen(false)}
                                  className={`text-lg font-light ${subItem.highlight
                                    ? "text-[#007C91] font-normal"
                                    : "text-gray-600 dark:text-gray-300 hover:text-[#007C91]"
                                    }`}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href || "#"}
                          onClick={() => setMenuOpen(false)}
                          className={`block text-2xl font-light tracking-tight py-2 ${item.highlight
                            ? "text-red-500 font-normal"
                            : "text-gray-900 dark:text-white hover:text-[#007C91]"
                            }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Animations */}
      <style jsx>{`
        @keyframes bounce-once { 0%,100%{transform:scale(1);}50%{transform:scale(1.2);} }
        .animate-bounce-once { animation: bounce-once 0.5s ease-in-out; }
      `}</style>
    </>
  );
}

