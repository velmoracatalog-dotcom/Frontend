"use client";

import { useCatalog } from "@/context/CatalogContext";

export function Marquee() {
  const { settings } = useCatalog();
  const items = settings.marqueeItems;

  return (
    <div className="overflow-hidden border-y border-line bg-ivory py-4">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8">
            <span className="font-serif text-xl tracking-[0.18em] text-ink uppercase">
              {item}
            </span>
            <span className="text-[10px] text-bronze">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
