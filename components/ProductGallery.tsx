"use client";
import { useState } from "react";

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [mainImage, setMainImage] = useState(images[0] || "/images/placeholder.jpg");

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Miniatures (vignettes) */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible w-full md:w-24">
        {images.map((src, i) => (
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
        <img
          src={mainImage}
          alt={alt}
          className="w-full aspect-[3/4] object-cover bg-sand/30"
        />
      </div>
    </div>
  );
}