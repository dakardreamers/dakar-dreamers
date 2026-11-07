import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

export default async function Collections() {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("category", "nouveautes");

  return (
    <main className="pt-32 pb-32 max-w-7xl mx-auto px-6">
      <h1 className="section-title mb-16">Collections</h1>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {data.map((p: any) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <p className="text-choco/60">Aucune collection pour l'instant.</p>
      )}
    </main>
  );
}