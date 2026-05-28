"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Problem", href: "#problem" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Guarantee", href: "#guarantee" },
  ];

  return (
    <nav
      style={{ backgroundColor: "#0f1f3d" }}
      className="fixed top-0 left-0 right-0 z-50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Wordmark */}
        <a href="#" className="flex items-center gap-3 group">
          <Image
            src="/logo.svg"
            alt="DoMoreDeals logo"
            width={40}
            height={40}
            className="flex-shrink-0"
          />
          <span
            className="text-2xl tracking-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#ffffff",
              fontWeight: 700,
            }}
          >
            Do<span style={{ color: "#c9a84c" }}>More</span>Deals
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book-call"
            className="px-5 py-2.5 rounded text-sm font-semibold transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "#c9a84c",
              color: "#0f1f3d",
              fontFamily: "var(--font-inter, sans-serif)",
            }}
          >
            Book a Free Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 space-y-4"
          style={{ backgroundColor: "#0f1f3d" }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-gray-300 hover:text-white py-2 border-b border-white/10"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book-call"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center px-5 py-3 rounded font-semibold mt-4"
            style={{ backgroundColor: "#c9a84c", color: "#0f1f3d" }}
          >
            Book a Free Call
          </a>
        </div>
      )}
    </nav>
  );
}
