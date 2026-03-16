"use client";

import { useState, useEffect } from "react";
import { CompassIcon } from "./Icons";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Journey", href: "#journey" },
  { label: "Connect", href: "#connect" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-xl shadow-lg shadow-coral/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <CompassIcon className="w-7 h-7 text-coral transition-transform group-hover:rotate-180 duration-700" />
          <span className="font-extrabold text-xl tracking-tight text-ink">
            viva<span className="text-gradient">pulse</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => {
            const colors = ["text-coral", "text-violet", "text-turquoise", "text-golden"];
            const bgColors = ["hover:bg-coral/10", "hover:bg-violet/10", "hover:bg-turquoise/10", "hover:bg-golden/10"];
            return (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm text-ink-muted ${colors[i]} font-bold px-4 py-2 rounded-full ${bgColors[i]} transition-all duration-300`}
                style={{ ["--hover-color" as string]: colors[i] }}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-ink-muted hover:text-coral transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream/95 backdrop-blur-xl border-t-2 border-coral/10">
          {navItems.map((item, i) => {
            const colors = ["text-coral", "text-violet", "text-turquoise", "text-golden"];
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-6 py-3 ${colors[i]} font-bold hover:bg-cream-dark/50 transition-colors`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
