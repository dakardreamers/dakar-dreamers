import { supabase } from "@/lib/supabase";
import { fcfa } from "@/lib/format";
import Link from "next/link";
import StatusSelector from "./StatusSelector";

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
          <div key={o.id} className="p-6 border-b border-choco/10 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-cream/50 transition">
            
            {/* Infos principales (cliquables pour voir le détail) */}
            <Link href={`/admin/commandes/${o.id}`} className="flex-1">
              <div className="flex justify-between md:justify-start md:gap-8 items-center">
                <div>
                  <p className="font-medium text-choco">{o.reference}</p>
                  <p className="text-sm text-choco/80">{o.customer_name} ({o.customer_phone})</p>
                  <p className="text-xs text-choco/50 mt-1">{new Date(o.created_at).toLocaleDateString('fr-FR')} · {o.city}</p>
                </div>
                <div className="text-right md:text-left">
                  <p className="text-sm font-medium">{fcfa(o.total_fcfa)}</p>
                  <p className="text-xs text-choco/50">{o.items.length} article(s)</p>
                </div>
              </div>
            </Link>

            {/* Menu déroulant pour changer le statut */}
            <div className="w-full md:w-48">
              <StatusSelector orderId={o.id} currentStatus={o.status} />
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