"use client";

import Link from "next/link";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { useCatalog } from "@/context/CatalogContext";

export function Contact() {
  const { settings } = useCatalog();

  return (
    <section id="contact" className="border-t border-line bg-cream/40">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="text-center">
          <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">Correspondence</p>
          <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">Visit The House</h2>
          <Ornament className="mt-5" />
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-stone">
            A note, a call, or a message — the atelier is open for styling advice,
            orders, and anything you wish to ask.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal>
            <a
              href={`mailto:${settings.email}`}
              className="group flex h-full flex-col border border-line bg-ivory px-7 py-8 transition duration-500 hover:-translate-y-1 hover:border-bronze/50"
            >
              <MailIcon className="h-6 w-6 text-bronze" />
              <p className="mt-5 text-[11px] tracking-[0.22em] text-stone uppercase">Email</p>
              <p className="mt-2 font-serif text-2xl text-ink transition group-hover:text-bronze">
                {settings.email}
              </p>
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={`tel:${settings.tel}`}
              className="group flex h-full flex-col border border-line bg-ivory px-7 py-8 transition duration-500 hover:-translate-y-1 hover:border-bronze/50"
            >
              <PhoneIcon className="h-6 w-6 text-bronze" />
              <p className="mt-5 text-[11px] tracking-[0.22em] text-stone uppercase">Telephone</p>
              <p className="mt-2 font-serif text-2xl text-ink transition group-hover:text-bronze">
                {settings.phoneDisplay}
              </p>
            </a>
          </Reveal>
        </div>

        <Reveal className="mt-8 flex justify-center" delay={0.15}>
          <a
            href={settings.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="btn-fill inline-flex items-center gap-2 bg-ink px-7 py-3.5 text-[11px] tracking-[0.22em] text-ivory uppercase"
          >
            <WhatsAppIcon className="relative z-10 h-4 w-4" />
            <span>Message on WhatsApp</span>
          </a>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 border-t border-line pt-10 md:grid-cols-3">
          {settings.policies
            .filter((note) => note.id === "privacy" || note.id === "terms")
            .map((note, index) => (
            <Reveal key={note.id} delay={index * 0.08}>
              <Link href={`/${note.id}`} className="block transition hover:text-bronze">
                <h3 className="font-serif text-2xl text-ink">{note.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone">{note.copy}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
