"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-store";

const links = [
  { href: "/boutique", label: "Boutique" },
  { href: "/collections", label: "Collections" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = useCart((s) => s.items.reduce((t, i) => t + i.qty, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ivory/90 backdrop-blur-md py-3 border-b border-choco/10" : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Menu">
            <span className="block w-6 h-px bg-choco mb-1.5" />
            <span className="block w-6 h-px bg-choco" />
          </button>
          <Link href="/" className="font-display text-xl md:text-2xl tracking-[0.25em] text-choco">
            DAKAR DREAMERS
          </Link>
          <nav className="hidden md:flex gap-10">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="link-underline text-[11px] uppercase tracking-widest2 text-choco">
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/panier" className="text-[11px] uppercase tracking-widest2 text-choco">
            Panier ({count})
          </Link>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            className="fixed inset-0 z-[60] bg-choco text-ivory p-8 flex flex-col"
          >
            <button onClick={() => setOpen(false)} className="self-end text-2xl">✕</button>
            <nav className="mt-20 flex flex-col gap-8">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-display text-4xl">
                  {l.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}