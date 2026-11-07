"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.15 }} animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.2, 0.7, 0.2, 1] }}
        className="absolute inset-0 bg-cover bg-center bg-sand"
        style={{ backgroundImage: "url('https://swqckjgzswsuntqdfdxh.supabase.co/storage/v1/object/public/products/XKFR2390.JPG')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/50" />
      <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 pb-24">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9 }}
          className="text-ivory/80 text-[11px] uppercase tracking-widest2 mb-6">
          Collection Automne — Dakar, Sénégal
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }}
          className="font-display text-ivory text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tight max-w-5xl">
          Rêver plus grand.<br />S'habiller comme tel.
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12 flex gap-4 flex-wrap">
          <Link href="/boutique" className="btn-primary !bg-ivory !text-choco hover:!bg-olive hover:!text-ivory">
            Shop Now →
          </Link>
          <Link href="/a-propos" className="btn-ghost !border-ivory/50 !text-ivory hover:!bg-ivory hover:!text-choco">
            Notre histoire
          </Link>
        </motion.div>
      </div>
    </section>
  );
}