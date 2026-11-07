import { supabase } from "@/lib/supabase";
import { fcfa } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminOrders() {
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-10">
      <h1 className="section-title">Commandes</h1>
      <div className="bg-ivory border border-choco/10">
        {(orders ?? []).map((o) => (
          <div key={o.id} className="p-4 border-b border-choco/10 text-sm">
            <div className="flex justify-between">
              <span>
                <strong>{o.reference}</strong> — {o.customer_name} ({o.customer_phone})
              </span>
              <span>{fcfa(o.total_fcfa)}</span>
            </div>
            <div className="text-xs text-choco/60 mt-1">
              {o.city} · {o.payment_method} · {o.status}
            </div>
          </div>
        ))}
        {(!orders || orders.length === 0) && (
          <p className="p-6 text-sm text-choco/50">Aucune commande.</p>
        )}
      </div>
    </div>
  );
}