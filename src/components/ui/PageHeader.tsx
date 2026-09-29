import { Ornament } from "@/components/ui/Ornament";

export function PageHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mb-12 text-center">
      <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">{eyebrow}</p>
      <h1 className="mt-3 font-serif text-4xl md:text-6xl">{title}</h1>
      <Ornament className="mt-5" />
      {copy && (
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-stone">{copy}</p>
      )}
    </div>
  );
}
