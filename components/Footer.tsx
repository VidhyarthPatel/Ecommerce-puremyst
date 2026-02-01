import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-[#007C91] text-white font-sans">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">PureMyst</h3>
              <p className="text-blue-50/80 leading-relaxed text-base">
                Elevating your daily hydration with advanced purification technology. Pure, safe, and sustainable water solutions for every home.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300">
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/products', label: 'Our Products' },
                { href: '/categories', label: 'Categories' },
                { href: '/contact', label: 'Contact Support' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-blue-50/70 hover:text-white transition-colors duration-300 text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Our Solutions</h4>
            <ul className="space-y-3">
              {[
                'RO Water Purifiers',
                'UV Purification',
                'Alkaline Filters',
                'Commercial Systems',
                'Industrial Plants',
                'Water Softeners',
              ].map((product) => (
                <li key={product}>
                  <span className="text-blue-50/70 hover:text-white transition-colors duration-300 text-base cursor-pointer">
                    {product}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
            <div className="space-y-4 text-blue-50/80 text-base">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
                <span>
                  Solanki Hospital, GROUND FLOOR,<br />
                  3 Gokul A Apartment, Zanzarada Road,<br />
                  Monalisa Township, Junagadh - 362001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                <span>+91 9426130904</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                <span>support@puremyst.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-blue-50/60 text-sm">
              © {new Date().getFullYear()} PureMyst. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy-policy" className="text-blue-50/60 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/shipping-policy" className="text-blue-50/60 hover:text-white transition-colors duration-300">
                Shipping Policy
              </Link>
              <Link href="/terms" className="text-blue-50/60 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/warranty-policy" className="text-blue-50/60 hover:text-white transition-colors duration-300">
                Warranty Policy
              </Link>
              <Link href="/return-refund-policy" className="text-blue-50/60 hover:text-white transition-colors duration-300">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer