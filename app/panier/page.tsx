"use client";
import { useCart } from "@/lib/cart-store";
import { fcfa } from "@/lib/format";
import Link from "next/link";

export default function Panier() {
  const { items, remove, setQty, total } = useCart();
  const t = total();

  return (
    <main className="pt-32 pb-32 max-w-5xl mx-auto px-6">
      <h1 className="section-title mb-12">Mon panier</h1>
      {items.length === 0 ? (
        <div>
          <p className="text-choco/60 mb-6">Ton panier est vide.</p>
          <Link href="/boutique" className="btn-primary">
            Découvrir la boutique →
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6 mb-12">
            {items.map((i) => (
              <div
                key={`${i.id}-${i.size}-${i.color}`}
                className="flex gap-6 border-b border-choco/10 pb-6"
              >
                <img
                  src={i.image || "/images/placeholder.jpg"}
                  alt={i.name}
                  className="w-24 h-32 object-cover bg-sand/30"
                />
                <div className="flex-1">
                  <h3 className="text-choco">{i.name}</h3>
                  <p className="text-xs text-choco/50 mt-1">
                    {i.size} {i.color && `· ${i.color}`}
                  </p>
                  <p className="text-sm mt-2">{fcfa(i.price_fcfa)}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => setQty(i.id, i.size, i.color, i.qty - 1)}
                      className="w-8 h-8 border border-choco/30"
                    >
                      −
                    </button>
                    <span className="text-sm w-8 text-center">{i.qty}</span>
                    <button
                      onClick={() => setQty(i.id, i.size, i.color, i.qty + 1)}
                      className="w-8 h-8 border border-choco/30"
                    >
                      +
                    </button>
                    <button
                      onClick={() => remove(i.id, i.size, i.color)}
                      className="ml-4 text-xs uppercase tracking-widest2 text-choco/50 hover:text-choco"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mb-8">
            <span className="text-xs uppercase tracking-widest2">Total</span>
            <span className="text-xl text-choco">{fcfa(t)}</span>
          </div>
          <Link href="/checkout" className="btn-primary w-full justify-center">
            Passer commande
          </Link>
        </>
      )}
    </main>
  );
}