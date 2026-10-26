import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-[#073e1c] text-white font-sans">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">PureMyst</h3>
              <p className="text-emerald-100/80 leading-relaxed text-sm">
                Elevating your daily hydration with advanced purification technology. Pure, safe, and sustainable water solutions for every home.
              </p>
            </div>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-9 h-9 bg-white/10 rounded-sm flex items-center justify-center hover:bg-[#0b6c2c] transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 rounded-sm flex items-center justify-center hover:bg-[#0b6c2c] transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 rounded-sm flex items-center justify-center hover:bg-[#0b6c2c] transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-white mb-5 uppercase tracking-wider text-xs">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/AboutUs', label: 'About Us' },
                { href: '/products', label: 'Our Products' },
                { href: '/ro-water-purifier', label: 'RO Purifiers' },
                { href: '/contact', label: 'Contact Support' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-emerald-100/75 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Solutions */}
          <div>
            <h4 className="text-base font-semibold text-white mb-5 uppercase tracking-wider text-xs">
              Our Solutions
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/ro-water-purifier', label: 'RO Water Purifiers' },
                { href: '/commercial-water-purifier', label: 'Commercial Systems' },
                { href: '/washing-machine-cleaner', label: 'Appliance Filters' },
                { href: '/accessories', label: 'Filter Cartridges & Accessories' },
                { href: '/products', label: 'All Products' },
              ].map((solution) => (
                <li key={solution.label}>
                  <Link
                    href={solution.href}
                    className="text-emerald-100/75 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {solution.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-semibold text-white mb-5 uppercase tracking-wider text-xs">
              Contact Us
            </h4>
            <div className="space-y-4 text-emerald-100/80 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#22c55e] mt-1 flex-shrink-0" />
                <span className="leading-relaxed">
                  Solanki Hospital, GROUND FLOOR,<br />
                  3 Gokul A Apartment, Zanzarada Road,<br />
                  Monalisa Township, Junagadh - 362001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                <a href="tel:+919426130904" className="hover:text-white transition-colors">
                  +91 9426130904
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                <a href="mailto:support@puremyst.in" className="hover:text-white transition-colors">
                  support@puremyst.in
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#052e15]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-emerald-100/60 text-xs">
              © {new Date().getFullYear()} PureMyst. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-xs">
              <Link href="/privacy-policy" className="text-emerald-100/60 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/shipping-policy" className="text-emerald-100/60 hover:text-white transition-colors duration-200">
                Shipping Policy
              </Link>
              <Link href="/privacy-policy" className="text-emerald-100/60 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/warranty-policy" className="text-emerald-100/60 hover:text-white transition-colors duration-200">
                Warranty Policy
              </Link>
              <Link href="/return-refund-policy" className="text-emerald-100/60 hover:text-white transition-colors duration-200">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;