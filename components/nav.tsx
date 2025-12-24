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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show navbar at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      {/* Solid Background */}
      <div className="absolute inset-0 bg-white dark:bg-blue-900 dark:border-blue-800 " />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="relative w-32 h-12 md:w-40 md:h-14 group flex-shrink-0"
          >
            <img
              src={logo.src}
              alt="PureMyst Logo"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <li key={item.label} className="relative group">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      type="button"
                      className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-theme-blue dark:hover:text-theme-blue transition-colors duration-200 focus:outline-none group-hover:text-theme-blue dark:group-hover:text-theme-blue"
                    >
                      {item.label}
                      <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>

                    {/* Premium Dropdown */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 p-2 bg-white dark:bg-blue-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100 z-50">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-blue-800 rotate-45 border-l border-t border-gray-100 dark:border-gray-700" />
                      <div className="relative flex flex-col gap-1 bg-white dark:bg-blue-800 rounded-xl overflow-hidden">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className={`px-4 py-3 text-sm rounded-lg transition-all duration-200 flex items-center justify-between group/item ${dropdownItem.highlight
                              ? "bg-blue-50 dark:bg-blue-900/20 text-theme-blue dark:text-theme-blue font-semibold"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-theme-blue dark:hover:text-theme-blue"
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
                      ? "text-red-500 hover:text-red-600"
                      : "text-gray-700 dark:text-gray-200 hover:text-theme-blue dark:hover:text-theme-blue"
                      }`}
                  >
                    {item.label}
                    {!item.highlight && (
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-theme-blue transition-all duration-300 group-hover:w-full" />
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Client-side Interactive Components */}
          <NavClient />
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
