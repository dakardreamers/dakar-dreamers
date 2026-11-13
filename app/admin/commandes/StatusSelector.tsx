"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function StatusSelector({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const statuses = [
    { value: "pending", label: "En attente" },
    { value: "confirmed", label: "Confirmée" },
    { value: "shipped", label: "Expédiée" },
    { value: "delivered", label: "Livrée" },
    { value: "cancelled", label: "Annulée" },
  ];

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      alert("Erreur lors de la mise à jour");
      setStatus(currentStatus);
    } else {
      // On force Next.js à aller chercher les nouvelles données sur le serveur
      router.refresh();
    }
    setLoading(false);
  }

  const getColor = (s: string) => {
    switch (s) {
      case "pending": return "text-orange-600 bg-orange-100 border-orange-200";
      case "confirmed": return "text-blue-600 bg-blue-100 border-blue-200";
      case "shipped": return "text-purple-600 bg-purple-100 border-purple-200";
      case "delivered": return "text-green-600 bg-green-100 border-green-200";
      case "cancelled": return "text-red-600 bg-red-100 border-red-200";
      default: return "text-choco bg-cream border-choco/20";
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={loading}
      className={`w-full p-2 text-xs font-medium uppercase tracking-widest border appearance-none cursor-pointer outline-none transition ${getColor(status)}`}
    >
      {statuses.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  );
}