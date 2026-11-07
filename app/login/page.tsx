"use client";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="bg-ivory p-8 md:p-12 border border-choco/10 w-full max-w-md shadow-xl">
        <h1 className="font-display text-3xl text-choco mb-2 text-center">Connexion Admin</h1>
        <p className="text-sm text-choco/50 text-center mb-8">Accès réservé à l'équipe Dakar Dreamers.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-widest2 text-choco/70 block mb-2">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-choco/30 p-3 text-sm outline-none focus:border-choco transition" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-widest2 text-choco/70 block mb-2">Mot de passe</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-choco/30 p-3 text-sm outline-none focus:border-choco transition" />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button disabled={loading} className="btn-primary w-full justify-center mt-4">
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
  );
}