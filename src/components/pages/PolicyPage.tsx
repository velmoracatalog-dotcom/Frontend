"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { useCatalog } from "@/context/CatalogContext";

export function PolicyPage({ id }: { id: string }) {
  const { settings } = useCatalog();
  const policy = settings.policies.find((item) => item.id === id);

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <PageHeader
        eyebrow="The House"
        title={policy?.title ?? "Policy"}
        copy={policy?.copy}
      />
      <div className="border border-line bg-ivory px-6 py-8 md:px-10">
        <p className="text-sm leading-8 text-stone">
          {policy?.copy ?? "This note will appear once settings are saved in the dashboard."}
        </p>
        <p className="mt-6 text-sm leading-8 text-stone">
          If you need help with an order, write to us from the contact page. The
          atelier answers with the same care we pack each piece.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block text-[12px] tracking-[0.2em] uppercase text-bronze hover:text-ink"
        >
          Contact the house
        </Link>
      </div>
    </section>
  );
}
