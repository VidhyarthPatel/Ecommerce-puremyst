"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import logo from "../assets/logo.png";
import NavClient from "./NavClient";
import { ChevronDown } from "lucide-react";

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

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  {
    label: "Products",
    dropdown: true,
    dropdownItems: [
      { href: "/ro-water-purifier", label: "RO Water Purifier" },
      { href: "/commercial-water-purifier", label: "Commercial Water Purifier" },
      { href: "/washing-machine-cleaner", label: "Washing Machine Cleaner" },
      { href: "/accessories", label: "Accessories" },
      { href: "/products", label: "View All Products", highlight: true },
    ],
  },
  { href: "/AboutUs", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/sale", label: "Sale", highlight: true },
];

export default function NavServer() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled ? "shadow-lg backdrop-blur-md bg-[#007C91]/90" : "bg-[#007C91]"
        }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="relative w-32 h-50 md:w-40 md:h-50 group flex-shrink-0"
          >
            <img
              src={logo.src}
              alt="PureMyst Logo"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 brightness-0 invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.label} className="relative group">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      type="button"
                      className="flex items-center text-sm font-medium text-white hover:text-blue-200 transition-colors duration-200 focus:outline-none"
                    >
                      {item.label}
                      <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>

                    {/* Premium Dropdown */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 p-2 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100 z-50">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100" />
                      <div className="relative flex flex-col gap-1 bg-white rounded-xl overflow-hidden">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className={`px-4 py-3 text-sm rounded-lg transition-all duration-200 flex items-center justify-between group/item ${dropdownItem.highlight
                              ? "bg-blue-50 text-blue-600 font-semibold"
                              : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                              }`}
                          >
                            {dropdownItem.label}
                            {dropdownItem.highlight && <ArrowRightIcon className="w-4 h-4" />}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={`relative text-sm font-medium transition-colors duration-200 ${item.highlight
                      ? "text-red-300 hover:text-red-100"
                      : "text-white hover:text-blue-200"
                      }`}
                  >
                    {item.label}
                    {!item.highlight && (
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full" />
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/products" className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-full shadow-md transition-all duration-300 hover:shadow-lg transform">
              Shop Now
            </Link>
            {/* Client components like Search/Cart */}
            <NavClient navItems={navItems} />
          </div>

          {/* Mobile Toggle (Inside NavClient but we need to structure it right) - Actually NavClient has the toggle. 
              We passed navItems to NavClient. We should wrap NavClient to fit in.
              Wait, NavClient creates the right side structure in the original code.
              Let's check NavClient again.
           */}
          <div className="lg:hidden">
            <NavClient navItems={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
