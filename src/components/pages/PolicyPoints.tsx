import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import type { PolicySection } from "@/lib/privacy";

export function PolicyPoints({
  eyebrow,
  title,
  copy,
  sections,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  sections: PolicySection[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <PageHeader eyebrow={eyebrow} title={title} copy={copy} />
      <div className="space-y-14">
        {sections.map((section) => (
          <article key={section.title}>
            <h2 className="font-serif text-3xl text-ink md:text-4xl">{section.title}</h2>
            <p className="mt-3 text-base leading-8 text-ink/80">{section.subtitle}</p>
            <div className="mt-5 space-y-3">
              {section.points.map((point) => (
                <p key={point} className="text-sm leading-8 text-stone">
                  {point}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="mt-16 text-sm text-stone">
        Need the house?{" "}
        <Link href="/contact" className="text-bronze hover:text-ink">
          Write to us
        </Link>
        .
      </p>
    </section>
  );
}
