import Link from "next/link";

export default async function Confirmation({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams; // <-- La correction est ici

  return (
    <main className="pt-32 pb-32 max-w-3xl mx-auto px-6 text-center">
      <p className="text-[11px] uppercase tracking-widest2 text-olive mb-4">Commande confirmée</p>
      <h1 className="section-title mb-8">Merci ✦</h1>
      <p className="text-choco/70 mb-4">Ta commande a bien été enregistrée.</p>
      {ref && (
        <p className="text-choco mb-10">
          Référence : <strong>{ref}</strong>
        </p>
      )}
      <p className="text-sm text-choco/60 mb-10">
        Tu recevras une confirmation par téléphone ou email. Pour toute question, écris-nous.
      </p>
      <Link href="/boutique" className="btn-primary">
        Retour à la boutique
      </Link>
    </main>
  );
}