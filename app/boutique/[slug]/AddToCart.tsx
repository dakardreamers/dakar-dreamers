"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";

export default function AddToCart({ product }: { product: any }) {
  const [size, setSize] = useState(product.sizes?.[0] ?? "M");
  const [color, setColor] = useState(product.colors?.[0] ?? "");
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stock !== null && product.stock <= 0;

  function handle() {
    if (isOutOfStock) return;
    add({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price_fcfa: product.price_fcfa,
      image: product.images?.[0] ?? "",
      size,
      color,
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="space-y-6">
      {product.sizes?.length > 0 && (
        <div>
          <p className="text-[11px] uppercase tracking-widest2 mb-3">Taille</p>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((s: string) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                disabled={isOutOfStock}
                className={`w-12 h-12 text-sm border transition ${
                  size === s
                    ? "bg-choco text-ivory border-choco"
                    : "border-choco/30 text-choco hover:border-choco disabled:opacity-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <button 
        onClick={handle} 
        disabled={isOutOfStock}
        className={`w-full justify-center btn-primary ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isOutOfStock ? "Épuisé" : added ? "Ajouté ✦" : "Ajouter au panier"}
      </button>
    </div>
  );
}