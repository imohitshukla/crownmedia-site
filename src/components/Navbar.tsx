"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-zinc-900/70 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center group gap-0.5"
        >
          <div className="relative flex items-center justify-center">
            <svg 
              className="absolute -top-3 w-6 h-6 text-[#d4af37] group-hover:scale-110 transition-transform duration-300" 
              viewBox="0 0 512 512" 
              fill="currentColor"
            >
              <path d="M496 160c-26.5 0-48 21.5-48 48 0 7.8 1.9 15.2 5.3 21.8l-87.3 65.5c-4.4-1.1-9-1.8-13.9-1.8-13.6 0-26 5.8-34.6 15l-44-88.1c3.8-7 6.1-15.1 6.1-23.7 0-26.5-21.5-48-48-48s-48 21.5-48 48c0 8.7 2.3 16.7 6.1 23.7l-44 88.1c-8.7-9.2-21.1-15-34.6-15-4.9 0-9.6.7-13.9 1.8l-87.3-65.5c3.3-6.6 5.3-14 5.3-21.8 0-26.5-21.5-48-48-48S0 181.5 0 208c0 23.3 16.6 42.6 38.6 47.1l65.8 197.6c3.2 9.6 12.1 16.3 22.2 16.3h258.8c10.1 0 19-6.7 22.2-16.3l65.8-197.6C495.4 250.6 512 231.3 512 208c0-26.5-21.5-48-48-48z"/>
            </svg>
            <span className="text-3xl font-serif font-bold text-white tracking-tighter mt-2">CM</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#d4af37] font-serif font-bold tracking-[0.15em] text-[10px] leading-tight">CROWN MEDIA</span>
            <span className="text-gray-400 text-[6px] tracking-[0.2em] uppercase">Digital Marketing Agency</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-orange-400 transition-colors text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button (Desktop) */}
        <div className="hidden md:block">
          <Link
            href="#contact"
            className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-orange-500 rounded-full overflow-hidden transition-all hover:bg-orange-600 hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
          >
            <span>Let's Talk</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white focus:outline-none z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-b border-white/5 py-6 px-6 flex flex-col gap-4 shadow-2xl md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-200 hover:text-orange-400 py-2 border-b border-white/5 last:border-none"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 px-6 py-3 text-center font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors"
            >
              Let's Talk
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
