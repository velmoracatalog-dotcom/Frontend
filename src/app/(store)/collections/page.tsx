"use client";

import Link from "next/link";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { NewCollection } from "@/components/home/NewCollection";
import { PageHeader } from "@/components/ui/PageHeader";
import { useCatalog } from "@/context/CatalogContext";

export default function CollectionsPage() {
  const { settings } = useCatalog();

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-16 md:px-8 md:pt-24">
        <PageHeader
          eyebrow="The Atelier"
          title="Collections"
          copy={settings.newCollection.subtitle}
        />
      </section>
      <NewCollection />
      <FeaturedCategories showHeader={false} />
      <div className="pb-16 text-center md:pb-24">
        <Link
          href="/shop"
          className="btn-fill inline-flex cursor-pointer bg-ink px-8 py-3.5 text-[11px] tracking-[0.22em] text-ivory uppercase"
        >
          <span>Shop all pieces</span>
        </Link>
      </div>
    </>
  );
}
