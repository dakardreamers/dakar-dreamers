"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { fcfa } from "@/lib/format";

export default function ProductCard({ p }: { p: any }) {
  const isPreorder = p.stock !== null && p.stock <= 0;

  return (
    <motion.div whileHover="hover" initial="rest" animate="rest" className="group">
      <Link href={`/boutique/${p.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-sand/30">
          <motion.img
            src={p.images?.[0] || "/images/placeholder.jpg"}
            alt={p.name}
            variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            className="w-full h-full object-cover"
          />
          {isPreorder && (
            <div className="absolute top-4 left-4">
              <span className="bg-olive text-ivory text-[10px] uppercase tracking-widest2 px-3 py-1">
                Précommande
              </span>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-choco">{p.name}</h3>
            <p className="text-[11px] text-choco/50 uppercase tracking-widest mt-1">{p.category}</p>
          </div>
          <span className="text-sm text-choco">{fcfa(p.price_fcfa)}</span>
        </div>
      </Link>
    </motion.div>
  );
}