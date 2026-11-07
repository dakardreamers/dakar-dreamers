"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("newsletter").insert({ email });
    setState(error ? "err" : "ok");
    if (!error) setEmail("");
  }

  return (
    <section className="bg-choco text-ivory py-32">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[11px] uppercase tracking-widest2 text-ivory/60 mb-6">Rejoindre le cercle</p>
        <h2 className="font-display text-4xl md:text-6xl mb-10">Sois le premier informé.</h2>
        <form onSubmit={submit} className="flex flex-col md:flex-row gap-3 max-w-xl mx-auto">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.com"
            className="flex-1 bg-transparent border-b border-ivory/40 px-2 py-4 text-sm outline-none focus:border-ivory placeholder:text-ivory/40" />
          <button className="btn-primary !bg-ivory !text-choco hover:!bg-olive hover:!text-ivory">S'inscrire</button>
        </form>
        {state === "ok" && <p className="mt-4 text-xs text-olive">Bienvenue dans le cercle ✦</p>}
        {state === "err" && <p className="mt-4 text-xs text-sand">Une erreur est survenue, réessaie.</p>}
      </div>
    </section>
  );
}