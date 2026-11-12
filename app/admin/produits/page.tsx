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
    sizes: "S,M,L,XL",
    // On crée un tableau de variantes. Par défaut, une variante vide.
    variants: [{ color: "", images: "" }], 
  });

  async function load() {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data ?? []);
  }

  useEffect(() => { load(); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    
    // On transforme le texte "url1, url2" en tableau d'URLs
    const formattedVariants = form.variants.map(v => ({
      color: v.color,
      images: v.images.split(",").map(s => s.trim()).filter(Boolean)
    }));

    const payload = {
      name: form.name,
      slug: form.slug,
      price_fcfa: form.price_fcfa,
      category: form.category,
      description: form.description,
      stock: form.stock,
      sizes: form.sizes.split(",").map(s => s.trim()).filter(Boolean),
      variants: formattedVariants,
      images: formattedVariants[0]?.images || [], // L'image principale pour la boutique
    };

    const { error } = await supabase.from("products").insert(payload);
    if (error) return alert(error.message);
    
    // Reset form
    setForm({ name: "", slug: "", price_fcfa: 0, category: "tshirts", description: "", stock: 0, sizes: "S,M,L,XL", variants: [{ color: "", images: "" }] });
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

  // Gérer l'ajout/suppression de variantes
  const addVariant = () => setForm({ ...form, variants: [...form.variants, { color: "", images: "" }] });
  const removeVariant = (index: number) => {
    const newVariants = [...form.variants];
    newVariants.splice(index, 1);
    setForm({ ...form, variants: newVariants });
  };
  const updateVariant = (index: number, key: string, value: string) => {
    const newVariants = [...form.variants];
    newVariants[index] = { ...newVariants[index], [key]: value };
    setForm({ ...form, variants: newVariants });
  };

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
          <option value="avenir">À venir</option>
        </select>
        <input placeholder="Tailles (S,M,L,XL)" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className="border p-3" />
        <input required type="number" placeholder="Stock total" value={form.stock} onChange={(e) => setForm({ ...form, stock: +e.target.value })} className="border p-3" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border p-3 col-span-2" rows={3} />

        {/* SECTION VARIANTES (Couleurs et Images) */}
        <div className="col-span-2 mt-4 p-4 border border-choco/20 bg-cream/50">
          <p className="font-display text-lg mb-4">Couleurs et Images</p>
          {form.variants.map((v, i) => (
            <div key={i} className="flex gap-4 mb-4 items-start">
              <div className="w-1/3">
                <label className="text-xs uppercase tracking-widest text-choco/60">Couleur</label>
                <input placeholder="Ex: Noir" value={v.color} onChange={(e) => updateVariant(i, "color", e.target.value)} className="w-full border p-2 mt-1" />
              </div>
              <div className="flex-1">
                <label className="text-xs uppercase tracking-widest text-choco/60">URLs Images (séparées par une virgule)</label>
                <input placeholder="url_face.jpg, url_dos.jpg, url_detail.jpg" value={v.images} onChange={(e) => updateVariant(i, "images", e.target.value)} className="w-full border p-2 mt-1" />
              </div>
              {form.variants.length > 1 && (
                <button type="button" onClick={() => removeVariant(i)} className="mt-6 text-red-600 text-sm">Supprimer</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addVariant} className="text-xs uppercase tracking-widest2 text-olive underline">+ Ajouter une couleur</button>
        </div>

        <button className="btn-primary col-span-2 justify-center mt-4">Créer le produit</button>
      </form>

      <div className="bg-ivory border border-choco/10">
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-4 p-4 border-b border-choco/10">
            <span className="text-sm">{p.name} — {p.price_fcfa} FCFA · {p.category}</span>
            <div className="flex gap-3 text-xs uppercase tracking-widest2">
              <button onClick={() => toggle(p.id, !p.is_active)}>{p.is_active ? "Désactiver" : "Activer"}</button>
              <button onClick={() => del(p.id)} className="text-red-700">Suppr.</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}