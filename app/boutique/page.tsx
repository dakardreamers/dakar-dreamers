import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

const cats = [
  { value: "", label: "Tout" },
  { value: "tshirts", label: "T-shirts" },
  { value: "hoodies", label: "Hoodies" },
  { value: "bonnets", label: "Bonnets" },
  { value: "accessoires", label: "Accessoires" },
  { value: "nouveautes", label: "Nouveautés" },
];

export default async function Boutique({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams; // <-- La correction est ici

  let query = supabase.from("products").select("*").eq("is_active", true);
  if (cat) query = query.eq("category", cat);
  const { data: products } = await query.order("created_at", { ascending: false });

  return (
    <main className="pt-32 pb-32 max-w-7xl mx-auto px-6">
      <h1 className="section-title mb-8">Boutique</h1>
      <div className="flex flex-wrap gap-3 mb-16">
        {cats.map((c) => (
          <a
            key={c.value}
            href={c.value ? `/boutique?cat=${c.value}` : "/boutique"}
            className={`px-5 py-2 text-xs uppercase tracking-widest2 border transition ${
              (cat ?? "") === c.value
                ? "bg-choco text-ivory border-choco"
                : "border-choco/30 text-choco hover:border-choco"
            }`}
          >
            {c.label}
          </a>
        ))}
      </div>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.map((p: any) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <p className="text-choco/60 text-sm">Aucun produit disponible dans cette catégorie.</p>
      )}
    </main>
  );
}