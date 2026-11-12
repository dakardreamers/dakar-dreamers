"use client";
import { useState } from "react";

export default function ProductGallery({ variants, alt }: { variants: any[]; alt: string }) {
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [mainImage, setMainImage] = useState(variants[0]?.images?.[0] || "/images/placeholder.jpg");

  const activeVariant = variants[activeColorIndex] || { images: [] };

  function handleColorChange(index: number) {
    setActiveColorIndex(index);
    setMainImage(variants[index]?.images?.[0] || "/images/placeholder.jpg");
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Miniatures (vignettes) */}
      <div className="flex gap-4 overflow-x-auto">
        {activeVariant.images.map((src: string, i: number) => (
          <button
            key={i}
            onClick={() => setMainImage(src)}
            className={`w-20 h-24 flex-shrink-0 border-2 transition-all ${
              mainImage === src ? "border-choco" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img src={src} alt={`${alt} - vue ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Grande image */}
      <div className="flex-1">
        <img src={mainImage} alt={alt} className="w-full aspect-[3/4] object-cover bg-sand/30" />
      </div>

      {/* Boutons de couleurs */}
      <div className="mt-4">
        <p className="text-[11px] uppercase tracking-widest2 mb-3">Couleurs</p>
        <div className="flex gap-2 flex-wrap">
          {variants.map((v, i) => (
            <button
              key={i}
              onClick={() => handleColorChange(i)}
              className={`px-4 h-10 text-xs border transition ${
                activeColorIndex === i
                  ? "bg-choco text-ivory border-choco"
                  : "border-choco/30 text-choco hover:border-choco"
              }`}
            >
              {v.color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}