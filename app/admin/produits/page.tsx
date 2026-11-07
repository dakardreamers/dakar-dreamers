"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price_fcfa: 0,
    category: "tshirts",
    description: "",
    stock: 0,
    images: "",
    sizes: "S,M,L,XL",
    colors: "",
  });

  async function load() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts(data ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      images: form.images ? form.images.split(",").map((s) => s.trim()).filter(Boolean) : [],
      sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      colors: form.colors ? form.colors.split(",").map((s) => s.trim()).filter(Boolean) : [],
    };
    const { error } = await supabase.from("products").insert(payload);
    if (error) return alert(error.message);
    setForm({
      name: "",
      slug: "",
      price_fcfa: 0,
      category: "tshirts",
      description: "",
      stock: 0,
      images: "",
      sizes: "S,M,L,XL",
      colors: "",
    });
    load();
  }

  async function toggle(id: string, active: boolean) {
    await supabase.from("products").update({ is_active: active }).eq("id", id);
    load();
  }

  async function del(id: string) {
    if (!confirm("Supprimer ce produit ?")) return;
    await supabase.from("products").delete().eq("id", id);
    load();
  }

  return (
    <div className="space-y-10">
      <h1 className="section-title">Produits</h1>
      <form onSubmit={create} className="grid grid-cols-2 gap-4 bg-ivory p-6 border border-choco/10">
        <input required placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-3" />
        <input required placeholder="Slug (ex: hoodie-noir)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="border p-3" />
        <input required type="number" placeholder="Prix FCFA" value={form.price_fcfa} onChange={(e) => setForm({ ...form, price_fcfa: +e.target.value })} className="border p-3" />
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border p-3">
          <option value="tshirts">T-shirts</option>
          <option value="hoodies">Hoodies</option>
          <option value="bonnets">Bonnets</option>
          <option value="accessoires">Accessoires</option>
          <option value="nouveautes">Nouveautés</option>
        </select>
        <input placeholder="URLs images (séparées par virgule)" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} className="border p-3 col-span-2" />
        <input placeholder="Tailles (S,M,L,XL)" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className="border p-3" />
        <input placeholder="Couleurs (Noir,Crème)" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} className="border p-3" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border p-3 col-span-2" rows={3} />
        <button className="btn-primary col-span-2 justify-center">Créer le produit</button>
      </form>
      <div className="bg-ivory border border-choco/10">
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-4 p-4 border-b border-choco/10">
            <span className="text-sm">{p.name} — {p.price_fcfa} FCFA · {p.category}</span>
            <div className="flex gap-3 text-xs uppercase tracking-widest2">
              <button onClick={() => toggle(p.id, !p.is_active)}>
                {p.is_active ? "Désactiver" : "Activer"}
              </button>
              <button onClick={() => del(p.id)} className="text-red-700">Suppr.</button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="p-6 text-sm text-choco/50">Aucun produit. Crée le premier ci-dessus.</p>
        )}
      </div>
    </div>
  );
}