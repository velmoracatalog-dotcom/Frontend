"use client";

import { CardIcon, ReturnIcon, TruckIcon } from "@/components/icons";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { SectionSlider } from "@/components/ui/SectionSlider";
import { useCatalog } from "@/context/CatalogContext";

const icons = {
  truck: TruckIcon,
  card: CardIcon,
  return: ReturnIcon,
};

export function WhyVelmora() {
  const { settings } = useCatalog();

  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <Reveal className="mb-8 text-center">
        <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">The Promise</p>
        <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">Why Velmora?</h2>
        <Ornament className="mt-5" />
      </Reveal>
      <SectionSlider perView={3} breakpoints={{ sm: 1, md: 2, lg: 3 }}>
        {settings.whyPoints.map((point) => {
          const Icon = icons[point.icon as keyof typeof icons] ?? TruckIcon;
          return (
            <div
              key={point.title}
              className="h-full border border-line bg-ivory px-7 py-10 text-center transition duration-500 hover:-translate-y-1 hover:border-bronze/40"
            >
              <Icon className="mx-auto h-8 w-8 text-bronze" />
              <h3 className="mt-5 font-serif text-2xl">{point.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone">{point.copy}</p>
            </div>
          );
        })}
      </SectionSlider>
    </section>
  );
}
