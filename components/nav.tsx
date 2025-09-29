import Image from "next/image";
import logo from "../assets/logo.png";
import NavClient from "./NavClient";
import Link from "next/link";

export default function NavServer() {
  return (
    <nav className="sticky top-0 z-50 bg-white/20 backdrop-blur-xl border-b border-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="relative w-28 h-10 md:w-32 md:h-12 group"
          >
            <Image
              src={logo}
              alt="Logo"
              fill
              className="object-contain transition-all duration-300 group-hover:scale-105 group-hover:opacity-90"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center space-x-8 font-medium">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
              { href: "/categories", label: "Categories" },
              { href: "/AboutUs", label: "About Us" },
              { href: "/sale", label: "Sale", highlight: true },
            ].map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={`relative py-2 px-1 transition-all duration-300 hover:text-blue-600 ${
                    item.highlight ? 'text-red-600 font-semibold' : 'text-gray-700'
                  } group`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  {item.highlight && (
                    <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Client-side interactive */}
          <NavClient />
        </div>
      </div>
    </nav>
  );
}