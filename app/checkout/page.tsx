"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import { fcfa } from "@/lib/format";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [payment, setPayment] = useState<"wave" | "orange" | "cod">("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const subtotal = total();
  const shipping = subtotal >= 50000 ? 0 : 2000;
  const grand = subtotal + shipping;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      customer: {
        name: fd.get("name"),
        phone: fd.get("phone"),
        email: fd.get("email"),
        address: fd.get("address"),
        city: fd.get("city"),
      },
      items,
      paymentMethod: payment,
    };
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      clear();
      if (data.redirect) window.location.href = data.redirect;
      else router.push("/checkout/confirmation?ref=" + data.order.reference);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="pt-32 pb-32 max-w-5xl mx-auto px-6">
        <p>Panier vide.</p>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-32 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16">
      <form onSubmit={submit} className="space-y-6">
        <h1 className="section-title">Livraison</h1>
        <input required name="name" placeholder="Nom complet" className="w-full border border-choco/30 p-4" />
        <input required name="phone" placeholder="Téléphone (ex: 77 000 00 00)" className="w-full border border-choco/30 p-4" />
        <input name="email" type="email" placeholder="Email (optionnel)" className="w-full border border-choco/30 p-4" />
        <input required name="address" placeholder="Adresse" className="w-full border border-choco/30 p-4" />
        <input required name="city" placeholder="Ville" defaultValue="Dakar" className="w-full border border-choco/30 p-4" />

        <div>
          <p className="text-[11px] uppercase tracking-widest2 mb-3">Paiement</p>
          <div className="space-y-2">
            {[
              { v: "wave", l: "Wave" },
              { v: "orange", l: "Orange Money" },
              { v: "cod", l: "Paiement à la livraison" },
            ].map((opt) => (
              <label
                key={opt.v}
                className={`flex items-center gap-3 p-4 border cursor-pointer transition ${
                  payment === opt.v ? "border-choco bg-cream" : "border-choco/30"
                }`}
              >
                <input
                  type="radio"
                  checked={payment === opt.v}
                  onChange={() => setPayment(opt.v as any)}
                />
                <span className="text-sm">{opt.l}</span>
              </label>
            ))}
          </div>
          <p className="text-[11px] text-choco/50 mt-3">
            Wave et Orange Money s'activent dès que le compte marchand est configuré. Sinon, paiement à la livraison.
          </p>
        </div>

        {error && <p className="text-sm text-red-700">{error}</p>}
        <button disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50">
          {loading ? "Envoi..." : `Payer ${fcfa(grand)}`}
        </button>
      </form>

      <aside className="bg-cream p-8 self-start">
        <p className="text-[11px] uppercase tracking-widest2 mb-6">Récapitulatif</p>
        {items.map((i) => (
          <div key={`${i.id}-${i.size}-${i.color}`} className="flex justify-between text-sm py-2">
            <span>{i.name} × {i.qty}</span>
            <span>{fcfa(i.price_fcfa * i.qty)}</span>
          </div>
        ))}
        <div className="border-t border-choco/20 mt-4 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Sous-total</span>
            <span>{fcfa(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Livraison</span>
            <span>{shipping === 0 ? "Gratuite" : fcfa(shipping)}</span>
          </div>
          <div className="flex justify-between font-medium text-choco pt-2 border-t border-choco/20">
            <span>Total</span>
            <span>{fcfa(grand)}</span>
          </div>
        </div>
      </aside>
    </main>
  );
}