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
            <div className="flex justify-between font-medium">
              <span>
                <strong>{o.reference}</strong> — {o.customer_name} ({o.customer_phone})
              </span>
              <span>{fcfa(o.total_fcfa)}</span>
            </div>
            <div className="text-xs text-choco/60 mt-2 flex gap-4">
              <span>Ville : {o.city}</span>
              <span>Paiement : {o.payment_method}</span>
              <span>Statut : <strong className="uppercase">{o.status}</strong></span>
            </div>
            <div className="text-xs text-choco/60 mt-1">
              Adresse : {o.address}
            </div>
          </div>
        ))}
        {(!orders || orders.length === 0) && (
          <p className="p-6 text-sm text-choco/50">Aucune commande pour l'instant.</p>
        )}
      </div>
    </div>
  );
}