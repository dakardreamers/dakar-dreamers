"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";

export default function AddToCart({ product }: { product: any }) {
  const [size, setSize] = useState(product.sizes?.[0] ?? "M");
  const [color, setColor] = useState(product.colors?.[0] ?? "");
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  // On considère qu'un produit est en précommande si le stock est 0 ou moins
  const isPreorder = product.stock !== null && product.stock <= 0;

  function handle() {
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
                className={`w-12 h-12 text-sm border transition ${
                  size === s
                    ? "bg-choco text-ivory border-choco"
                    : "border-choco/30 text-choco hover:border-choco"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.colors?.length > 0 && (
        <div>
          <p className="text-[11px] uppercase tracking-widest2 mb-3">Couleur</p>
          <div className="flex gap-2 flex-wrap">
            {product.colors.map((c: string) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`px-4 h-10 text-xs border transition ${
                  color === c
                    ? "bg-choco text-ivory border-choco"
                    : "border-choco/30 text-choco hover:border-choco"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message d'avertissement pour la précommande */}
      {isPreorder && (
        <div className="bg-olive/10 border border-olive/30 p-4 text-sm text-olive">
          <strong>Précommande :</strong> Cette pièce est en cours de production. 
          Ta commande sera expédiée sous 2 à 3 semaines.
        </div>
      )}

      <button onClick={handle} className="btn-primary w-full justify-center">
        {added ? "Ajouté ✦" : isPreorder ? "Précommander" : "Ajouter au panier"}
      </button>
    </div>
  );
}