"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import logo from "../assets/logo.png";
import NavClient from "./NavClient";
import { ChevronDown, Truck, Globe, Smartphone, Mail } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled ? "shadow-md bg-white" : "bg-white"
        }`}
    >
      {/* Top Banner */}
      <div className="bg-[#0b6c2c] text-white text-xs sm:text-sm font-bold text-center py-2 uppercase tracking-wide w-full flex items-center justify-center h-8">
        UP TO 50% OFF SITEWIDE + FREE INSTALLATION
      </div>

      {/* Secondary Info Bar */}
      <div className="hidden lg:flex justify-between items-center px-4 sm:px-6 lg:px-8 py-2 border-b border-gray-100 text-xs text-gray-500 bg-gray-50 h-10">
        <div className="flex items-center space-x-6">
          <span className="flex items-center"><Truck size={14} className="mr-2" /> Free delivery on all orders</span>
          <span className="flex items-center"><Globe size={14} className="mr-2" /> Empowering over 20 million customers worldwide</span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="flex items-center"><Smartphone size={14} className="mr-2" /> Exclusive offers on the App</span>
          <span className="flex items-center"><Mail size={14} className="mr-2" /> Sign up to avail our latest deals</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="w-full px-4 sm:px-6 lg:px-8 relative bg-white">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link
            href="/"
            className="relative w-40 h-20 md:w-56 md:h-24 group flex-shrink-0"
          >
            <img
              src={logo.src}
              alt="PureMyst Logo"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.label} className="relative group">
                {item.dropdown ? (
                  <div className="relative h-full flex items-center">
                    <button
                      type="button"
                      className="flex items-center text-xs font-bold text-gray-800 hover:text-[#0b6c2c] transition-colors duration-200 focus:outline-none uppercase tracking-wide h-full py-6"
                    >
                      {item.label}
                      <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>

                    {/* Premium Dropdown */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-[90%] mt-2 w-64 p-2 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100 z-50">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100" />
                      <div className="relative flex flex-col gap-1 bg-white rounded-xl overflow-hidden">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className={`px-4 py-3 text-xs rounded-lg transition-all duration-200 flex items-center justify-between group/item ${dropdownItem.highlight
                              ? "bg-[#0b6c2c]/5 text-[#0b6c2c] font-bold"
                              : "text-gray-600 hover:bg-gray-50 hover:text-[#0b6c2c]"
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
                    className={`relative text-xs font-bold transition-colors duration-200 uppercase tracking-wide py-6 flex items-center ${item.highlight
                      ? "text-red-500 hover:text-red-600"
                      : "text-gray-800 hover:text-[#0b6c2c]"
                      }`}
                  >
                    {item.label}
                    {!item.highlight && (
                      <span className="absolute bottom-4 left-0 w-0 h-0.5 bg-[#0b6c2c] transition-all duration-300 group-hover:w-full" />
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center space-x-6 h-full">
            <NavClient navItems={navItems} />
          </div>

          <div className="lg:hidden flex items-center h-full">
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
