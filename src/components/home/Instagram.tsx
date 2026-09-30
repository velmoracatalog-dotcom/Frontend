"use client";

import { InstagramIcon } from "@/components/icons";
import { CatalogImage } from "@/components/ui/CatalogImage";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { SectionSlider } from "@/components/ui/SectionSlider";
import { useCatalog } from "@/context/CatalogContext";

export function Instagram() {
  const { settings } = useCatalog();
  const instagram = settings.instagram;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <Reveal className="mb-8 text-center">
        <div className="mb-3 flex justify-center text-bronze">
          <InstagramIcon className="h-6 w-6" />
        </div>
        <h2 className="font-serif text-4xl text-ink md:text-5xl">
          Follow {instagram.handle}
        </h2>
        <p className="mt-3 text-sm tracking-[0.18em] text-stone uppercase">
          {instagram.subtitle}
        </p>
        <Ornament className="mt-5" />
      </Reveal>
      <SectionSlider perView={4} breakpoints={{ sm: 2, md: 3, lg: 4 }}>
        {instagram.posts.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="group relative aspect-square overflow-hidden bg-cream"
          >
            <CatalogImage
              src={src}
              alt={`Velmora Instagram look ${index + 1}`}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/0 text-ivory opacity-0 transition duration-500 group-hover:bg-ink/35 group-hover:opacity-100">
              <InstagramIcon className="h-6 w-6" />
            </div>
          </div>
        ))}
      </SectionSlider>
    </section>
  );
}
