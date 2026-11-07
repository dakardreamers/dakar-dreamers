import { supabase } from "@/lib/supabase";
import { fcfa } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const [{ count: nbProducts }, { data: orders }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(10),
  ]);

  const revenue = (orders ?? []).reduce((t, o) => t + o.total_fcfa, 0);

  return (
    <div className="space-y-10">
      <h1 className="section-title">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-ivory p-6 border border-choco/10">
          <p className="text-xs uppercase tracking-widest2 mb-2">Produits</p>
          <p className="text-3xl font-display">{nbProducts ?? 0}</p>
        </div>
        <div className="bg-ivory p-6 border border-choco/10">
          <p className="text-xs uppercase tracking-widest2 mb-2">Commandes récentes</p>
          <p className="text-3xl font-display">{orders?.length ?? 0}</p>
        </div>
        <div className="bg-ivory p-6 border border-choco/10">
          <p className="text-xs uppercase tracking-widest2 mb-2">CA récent</p>
          <p className="text-3xl font-display">{fcfa(revenue)}</p>
        </div>
      </div>
      <div className="bg-ivory border border-choco/10">
        {(orders ?? []).map((o) => (
          <div key={o.id} className="flex justify-between p-4 border-b border-choco/10 text-sm">
            <span>{o.reference} — {o.customer_name}</span>
            <span>{fcfa(o.total_fcfa)} · {o.status}</span>
          </div>
        ))}
        {(!orders || orders.length === 0) && (
          <p className="p-6 text-sm text-choco/50">Aucune commande pour l'instant.</p>
        )}
      </div>
    </div>
  );
}