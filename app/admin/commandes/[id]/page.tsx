import { supabase } from "@/lib/supabase";
import { fcfa } from "@/lib/format";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CommandeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !order) notFound();

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/commandes" className="text-sm underline text-choco/60 hover:text-choco">← Retour aux commandes</Link>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="section-title">Commande {order.reference}</h1>
          <p className="text-choco/60 text-sm mt-2">Passée le {new Date(order.created_at).toLocaleDateString('fr-FR')} à {new Date(order.created_at).toLocaleTimeString('fr-FR')}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest2 text-choco/50 mb-1">Total</p>
          <p className="text-2xl font-display text-choco">{fcfa(order.total_fcfa)}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Infos Client */}
        <div className="bg-ivory p-6 border border-choco/10">
          <h2 className="font-display text-xl mb-4">Client</h2>
          <div className="space-y-2 text-sm text-choco/80">
            <p><strong className="text-choco">Nom :</strong> {order.customer_name}</p>
            <p><strong className="text-choco">Téléphone :</strong> <a href={`tel:${order.customer_phone}`} className="underline">{order.customer_phone}</a></p>
            {order.customer_email && <p><strong className="text-choco">Email :</strong> {order.customer_email}</p>}
            <p><strong className="text-choco">Adresse :</strong> {order.address}, {order.city}</p>
          </div>
        </div>

        {/* Infos Paiement & Statut */}
        <div className="bg-ivory p-6 border border-choco/10">
          <h2 className="font-display text-xl mb-4">Paiement & Statut</h2>
          <div className="space-y-2 text-sm text-choco/80">
            <p><strong className="text-choco">Méthode :</strong> <span className="uppercase">{order.payment_method}</span></p>
            <p><strong className="text-choco">Statut paiement :</strong> <span className="uppercase">{order.payment_status}</span></p>
            <p><strong className="text-choco">Statut commande :</strong> <span className="uppercase bg-olive/20 text-olive px-2 py-1 rounded">{order.status}</span></p>
          </div>
        </div>
      </div>

      {/* Articles commandés */}
      <div className="bg-ivory border border-choco/10">
        <h2 className="font-display text-xl p-6 border-b border-choco/10">Articles</h2>
        <div className="p-6 space-y-4">
          {order.items.map((item: any, index: number) => (
            <div key={index} className="flex gap-4 items-center">
              <img src={item.image || "/images/placeholder.jpg"} alt={item.name} className="w-16 h-20 object-cover bg-sand/30" />
              <div className="flex-1">
                <p className="text-sm font-medium text-choco">{item.name}</p>
                <p className="text-xs text-choco/60">Taille : {item.size} · Couleur : {item.color}</p>
                <p className="text-xs text-choco/60">Quantité : {item.qty}</p>
              </div>
              <p className="text-sm font-medium">{fcfa(item.price_fcfa * item.qty)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}