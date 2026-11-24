import { supabaseAdmin } from "@/lib/supabase";
import { fcfa } from "@/lib/format";
import Link from "next/link";
import StatusSelector from "./StatusSelector";

// On force Next.js à ne jamais mettre cette page en cache
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminOrders() {
  // ⚠️ ON UTILISE LE CLIENT ADMIN POUR ÊTRE SÛR DE VOIR TOUTES LES COMMANDES
  const { data: orders, error } = await supabaseAdmin()
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="text-red-500">Erreur de chargement : {error.message}</div>;
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <h1 className="section-title">Commandes</h1>
        <p className="text-sm text-choco/50">{orders?.length || 0} commande(s)</p>
      </div>
      
      <div className="bg-ivory border border-choco/10">
        {(orders ?? []).map((o) => (
          <div key={o.id} className="p-6 border-b border-choco/10 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-cream/50 transition">
            
            <Link href={`/admin/commandes/${o.id}`} className="flex-1">
              <div className="flex justify-between md:justify-start md:gap-8 items-center">
                <div>
                  <p className="font-medium text-choco">{o.reference}</p>
                  <p className="text-sm text-choco/80">{o.customer_name} ({o.customer_phone})</p>
                  <p className="text-xs text-choco/50 mt-1">
                    {new Date(o.created_at).toLocaleDateString('fr-FR')} à {new Date(o.created_at).toLocaleTimeString('fr-FR')} · {o.city}
                  </p>
                </div>
                <div className="text-right md:text-left">
                  <p className="text-sm font-medium">{fcfa(o.total_fcfa)}</p>
                  <p className="text-xs text-choco/50">{o.items?.length || 0} article(s)</p>
                </div>
              </div>
            </Link>

            <div className="w-full md:w-48">
              <StatusSelector orderId={o.id} currentStatus={o.status} />
            </div>

          </div>
        ))}
        {(!orders || orders.length === 0) && (
          <div className="p-12 text-center">
            <p className="text-sm text-choco/50 mb-4">Aucune commande pour l'instant.</p>
            <Link href="/boutique" className="btn-primary">Aller sur la boutique</Link>
          </div>
        )}
      </div>
    </div>
  );
}