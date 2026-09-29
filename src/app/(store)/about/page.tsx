"use client";

import { WhyVelmora } from "@/components/home/WhyVelmora";
import { PageHeader } from "@/components/ui/PageHeader";
import { useCatalog } from "@/context/CatalogContext";

export default function AboutPage() {
  const { settings } = useCatalog();

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <PageHeader
        eyebrow="The House"
        title="About Velmora"
        copy={settings.footerTagline}
      />
      <div className="mx-auto max-w-3xl border border-line bg-ivory px-6 py-10 md:px-12">
        <p className="font-serif text-3xl leading-snug text-ink">
          Classic pieces, modern living — made for everyday elegance.
        </p>
        <p className="mt-6 text-sm leading-8 text-stone">
          Velmora is a house of curated fashion, accessories, and lifestyle. We
          choose fewer things, more carefully — so what you wear and keep feels
          considered, not rushed. From the first note to the last fold of tissue,
          the atelier is built for quiet luxury.
        </p>
      </div>
      <WhyVelmora />
    </section>
  );
}
