import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { fcfa } from "@/lib/format";
import AddToCart from "./AddToCart";

export const revalidate = 60;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: p, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!p || error) notFound();

  return (
    <main className="pt-28 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 pb-32">
      <div className="space-y-4">
        {(p.images ?? []).length > 0 ? (
          p.images.map((src: string, i: number) => (
            <img
              key={i}
              src={src}
              alt={p.name}
              className="w-full aspect-[3/4] object-cover bg-sand/30"
            />
          ))
        ) : (
          <img
            src="/images/placeholder.jpg"
            alt={p.name}
            className="w-full aspect-[3/4] object-cover bg-sand/30"
          />
        )}
      </div>
      <div className="md:sticky md:top-28 self-start">
        <p className="text-[11px] uppercase tracking-widest2 text-choco/50 mb-3">{p.category}</p>
        <h1 className="font-display text-4xl md:text-5xl text-choco mb-4">{p.name}</h1>
        <p className="text-xl text-choco mb-8">{fcfa(p.price_fcfa)}</p>
        <p className="text-sm text-choco/70 leading-relaxed mb-10">{p.description}</p>
        <AddToCart product={p} />
      </div>
    </main>
  );
}