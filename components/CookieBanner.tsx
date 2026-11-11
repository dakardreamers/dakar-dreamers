"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("dd-cookie-consent");
    if (!consent) setShow(true);
  }, []);

  function accept() {
    localStorage.setItem("dd-cookie-consent", "true");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-choco text-ivory p-6 z-[100] flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-xs max-w-2xl">
        Nous utilisons des cookies pour mémoriser ton panier et améliorer ton expérience. 
        En cliquant sur "Accepter", tu acceptes notre <Link href="/confidentialite" className="underline">politique de confidentialité</Link>.
      </p>
      <div className="flex gap-3">
        <button onClick={accept} className="bg-ivory text-choco px-6 py-2 text-xs uppercase tracking-widest2 hover:bg-olive hover:text-ivory transition">
          Accepter
        </button>
      </div>
    </div>
  );
}