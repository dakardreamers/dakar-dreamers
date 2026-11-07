import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <main>
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex justify-between items-end mb-16">
          <h2 className="section-title">Dernières pièces</h2>
          <Link href="/boutique" className="link-underline text-xs uppercase tracking-widest2 text-choco">
            Tout voir →
          </Link>
        </div>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.map((p: any) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <p className="text-choco/60 text-sm">
            Aucun produit pour l'instant. Ajoute-en via{" "}
            <Link href="/admin/produits" className="underline">/admin/produits</Link>.
          </p>
        )}
      </section>

      <section className="bg-cream py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[11px] uppercase tracking-widest2 text-olive mb-6">Notre histoire</p>
          <h2 className="section-title mb-8">
            Née à Dakar.<br />Faite pour le monde.
          </h2>
          <p className="text-choco/70 max-w-2xl mx-auto leading-relaxed">
            Dakar Dreamers est une déclaration. Celle d'une génération qui ose rêver grand,
            qui transforme l'ambition en vêtements, et l'élégance en attitude.
          </p>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}