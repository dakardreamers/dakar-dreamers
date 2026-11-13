"use client"; // <-- On passe en client component pour gérer l'état de la couleur

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { fcfa } from "@/lib/format";
import AddToCart from "./AddToCart";
import ProductGallery from "@/components/ProductGallery";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const [product, setProduct] = useState<any>(null);
  const [activeColor, setActiveColor] = useState<string>("");

  useEffect(() => {
    async function fetchProduct() {
      const { slug } = await params;
      const { data: p, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !p) {
        notFound();
      } else {
        setProduct(p);
        // On initialise avec la première couleur du produit
        if (p.variants && p.variants.length > 0) {
          setActiveColor(p.variants[0].color);
        }
      }
    }
    fetchProduct();
  }, [params]);

  if (!product) return <div className="pt-32 text-center text-choco">Chargement...</div>;

  const safeVariants = product.variants && product.variants.length > 0 
    ? product.variants 
    : [{ color: "Standard", images: product.images || [] }];

  return (
    <main className="pt-28 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 pb-32">
      {/* On transmet activeColor à la galerie */}
      <ProductGallery 
        variants={safeVariants} 
        alt={product.name} 
        activeColor={activeColor} 
        onColorChange={setActiveColor} 
      />
      
      <div className="md:sticky md:top-28 self-start">
        <p className="text-[11px] uppercase tracking-widest2 text-choco/50 mb-3">{product.category}</p>
        <h1 className="font-display text-4xl md:text-5xl text-choco mb-4">{product.name}</h1>
        <p className="text-xl text-choco mb-8">{fcfa(product.price_fcfa)}</p>
        <p className="text-sm text-choco/70 leading-relaxed mb-10">{product.description}</p>
        
        {/* On transmet activeColor au panier */}
        <AddToCart product={{ ...product, selectedColor: activeColor }} />
      </div>
    </main>
  );
}