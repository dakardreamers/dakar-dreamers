import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-choco text-ivory/80 py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div>
          <p className="font-display text-2xl text-ivory tracking-[0.25em] mb-4">DAKAR DREAMERS</p>
          <p className="text-sm leading-relaxed">Née à Dakar. Faite pour le monde.</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-widest2 text-ivory mb-4">Boutique</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/boutique" className="link-underline">Tous les produits</Link></li>
            <li><Link href="/collections" className="link-underline">Collections</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-widest2 text-ivory mb-4">Aide</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="link-underline">FAQ</Link></li>
            <li><Link href="/livraison" className="link-underline">Livraison & retours</Link></li>
            <li><Link href="/contact" className="link-underline">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-widest2 text-ivory mb-4">Suivre</p>
          <ul className="space-y-2 text-sm">
            <li><a href="https://instagram.com/dakardreamers" className="link-underline">Instagram</a></li>
            <li><a href="https://tiktok.com/@dakardreamers" className="link-underline">TikTok</a></li>
          </ul>
        </div>
      </div>
      <p className="text-center text-xs text-ivory/40 mt-16">© {new Date().getFullYear()} Dakar Dreamers — Tous droits réservés.</p>
    </footer>
  );
}