import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
import NavClient from "./NavClient";

type DropdownItem = {
  href: string;           // required string -> fixes the TS error
  label: string;
  highlight?: boolean;
};

type NavItem = {
  href?: string;          // optional for top-level items like "Products" (which is not clickable)
  label: string;
  dropdown?: boolean;
  dropdownItems?: DropdownItem[];
  highlight?: boolean;
};

export default function NavServer() {
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
        { href: "/products", label: "View All Products →", highlight: true },
      ],
    },
    { href: "/AboutUs", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/sale", label: "Sale", highlight: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 text-gray-800">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="relative w-28 h-10 md:w-32 md:h-12 group flex-shrink-0"
          >
            <Image
              src={logo}
              alt="PureMyst Logo"
              fill
              className="object-contain transition-all duration-300 group-hover:scale-105 group-hover:opacity-90"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8 font-medium relative">
            {navItems.map((item) => (
              <li key={item.label} className="relative group">
                {/* DROPDOWN MENU */}
                {item.dropdown ? (
                  <div className="relative">
                    {/* Use a button (not Link) so clicking doesn't navigate */}
                    <button
                      type="button"
                      className="flex items-center py-2 px-1 text-gray-700 hover:text-blue-600 transition-all duration-300 focus:outline-none"
                    >
                      {item.label}
                      <svg
                        className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* DROPDOWN LIST (hover-based; SSR) */}
                    <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 ease-in-out z-50">
                      <div className="relative p-2">
                        {item.dropdownItems?.map((dropdownItem, index) => (
                          // dropdownItem.href is typed `string`, so TS knows it's present
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className={`flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                              dropdownItem.highlight
                                ? "bg-blue-50 text-blue-600 font-semibold border border-blue-100"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            } ${index === 0 ? "mt-0" : "mt-1"}`}
                          >
                            {dropdownItem.label}
                            {dropdownItem.highlight && (
                              <svg
                                className="ml-2 w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // For non-dropdown items, only render Link if href exists
                  item.href ? (
                    <Link
                      href={item.href}
                      className={`relative py-2 px-1 transition-all duration-300 ${
                        item.highlight
                          ? "text-red-600 font-semibold hover:text-red-700"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                          item.highlight ? "bg-red-600" : "bg-blue-600"
                        }`}
                      />
                      {item.highlight && (
                        <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      )}
                    </Link>
                  ) : (
                    // fallback: render a non-clickable element if no href (shouldn't be needed here)
                    <span className="relative py-2 px-1 text-gray-700">{item.label}</span>
                  )
                )}
              </li>
            ))}
          </ul>

          {/* Client-side Interactive Components (cart, icons, etc.) */}
          <NavClient />
        </div>
      </div>
    </nav>
  );
}
