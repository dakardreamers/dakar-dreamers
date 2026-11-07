export default function FAQ() {
  const faqs = [
    { q: "Quels sont les délais de livraison ?", a: "24 à 72h à Dakar, 3 à 7 jours dans le reste du Sénégal." },
    { q: "Quels moyens de paiement ?", a: "Wave, Orange Money ou paiement à la livraison." },
    { q: "Puis-je retourner un article ?", a: "Oui, sous 7 jours, article non porté et dans son emballage." },
  ];
  return (
    <main className="pt-32 pb-32 max-w-3xl mx-auto px-6">
      <h1 className="section-title mb-8">FAQ</h1>
      <div className="space-y-6">
        {faqs.map((f) => (
          <div key={f.q}>
            <p className="font-medium text-choco mb-2">{f.q}</p>
            <p className="text-choco/70 text-sm">{f.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}