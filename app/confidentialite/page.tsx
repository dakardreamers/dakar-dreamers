export default function Confidentialite() {
  return (
    <main className="pt-32 pb-32 max-w-3xl mx-auto px-6">
      <h1 className="section-title mb-8">Politique de Confidentialité</h1>
      <div className="prose prose-choco text-sm leading-relaxed space-y-4">
        <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        <h2 className="font-display text-2xl mt-8 mb-2">1. Données collectées</h2>
        <p>Nous collectons les informations que tu nous fournis lors d'une commande : nom, numéro de téléphone, adresse email et adresse de livraison.</p>
        <h2 className="font-display text-2xl mt-8 mb-2">2. Utilisation des données</h2>
        <p>Tes données sont utilisées uniquement pour traiter ta commande, te livrer et te contacter en cas de besoin. Elles ne sont jamais vendues à des tiers.</p>
        <h2 className="font-display text-2xl mt-8 mb-2">3. Cookies</h2>
        <p>Notre site utilise des cookies pour mémoriser ton panier. Tu peux à tout moment refuser les cookies non essentiels via la bannière prévue à cet effet.</p>
        <h2 className="font-display text-2xl mt-8 mb-2">4. Tes droits</h2>
        <p>Tu peux demander la suppression de tes données en nous contactant à dakardreamers@gmail.com.</p>
      </div>
    </main>
  );
}