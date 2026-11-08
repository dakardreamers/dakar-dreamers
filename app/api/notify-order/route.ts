import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// On initialise Resend avec la clé qu'on a mise sur Vercel
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // On récupère les données envoyées par Supabase
    const body = await req.json();
    
    // Les infos de la commande sont dans "record"
    const order = body.record;

    // On envoie l'email
    const { data, error } = await resend.emails.send({
      // ⚠️ IMPORTANT: Pour que ça marche sans configurer de domaine, 
      // Resend te permet d'envoyer depuis cette adresse de test :
      from: "Dakar Dreamers <onboarding@resend.dev>", 
      to: ["dakardreamers@gmail.com"], // ⚠️ METS TON VRAI EMAIL ICI
      subject: `🛍️ Nouvelle commande : ${order.reference}`,
      html: `
        <h2>Nouvelle commande reçue !</h2>
        <p><strong>Référence :</strong> ${order.reference}</p>
        <p><strong>Client :</strong> ${order.customer_name}</p>
        <p><strong>Téléphone :</strong> ${order.customer_phone}</p>
        <p><strong>Adresse :</strong> ${order.address}, ${order.city}</p>
        <p><strong>Total :</strong> ${order.total_fcfa} FCFA</p>
        <p><strong>Paiement :</strong> ${order.payment_method}</p>
        <br/>
        <p><a href="https://dakar-dreamers.vercel.app/admin/commandes">Voir dans l'admin</a></p>
      `,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Erreur serveur:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}