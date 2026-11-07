export default function Contact() {
  return (
    <main className="pt-32 pb-32 max-w-3xl mx-auto px-6">
      <h1 className="section-title mb-8">Contact</h1>
      <p className="text-choco/70 mb-6">Une question, une collaboration ? Écris-nous.</p>
      <ul className="space-y-3 text-choco">
        <li>
          Email : <a href="mailto:dakardreamers@gmail.com" className="underline">hello@dakardreamers.com</a>
        </li>
        <li>
          WhatsApp : <a href="https://wa.me/221785420621" className="underline">+221 77 000 00 00</a>
        </li>
        <li>
          Instagram : <a href="https://instagram.com/dakardreamers" className="underline">@dakardreamers</a>
        </li>
      </ul>
    </main>
  );
}