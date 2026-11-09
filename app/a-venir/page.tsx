import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

export default async function Avenir() {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("category", "avenir");

  return (
    <main className="pt-32 pb-32 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-[11px] uppercase tracking-widest2 text-olive mb-4">Teaser</p>
        <h1 className="section-title mb-4">Prochainement</h1>
        <p className="text-choco/60">Découvre les pièces qui arrivent très bientôt dans le vestiaire Dakar Dreamers.</p>
      </div>
      
      {data && data.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {data.map((p: any) => (
             <div key={p.id} className="relative group">
               <ProductCard p={{...p, stock: 0}} /> {/* On force stock à 0 pour afficher Épuisé/Teaser */}
             </div>
          ))}
        </div>
      ) : (
        <p className="text-choco/60 text-center">Rien pour l'instant. Reviens bientôt.</p>
      )}
    </main>
  );
}