"use client";

import Image from "next/image";
import Link from "next/link";
import { MailIcon, PhoneIcon } from "@/components/icons";
import { useCatalog } from "@/context/CatalogContext";
import { footerLinks } from "@/lib/fallback";

export function Footer() {
  const { settings } = useCatalog();

  return (
    <footer className="border-t border-line bg-ivory">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-mark.png"
              alt="Velmora"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <p className="font-serif text-2xl tracking-[0.28em] text-ink">VELMORA</p>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-stone">
            {settings.footerTagline}
          </p>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.22em] text-bronze uppercase">The House</p>
          <nav className="mt-5 flex flex-col gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-ink transition hover:text-bronze"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.22em] text-bronze uppercase">Correspondence</p>
          <div className="mt-5 space-y-4">
            <a
              href={`mailto:${settings.email}`}
              className="flex items-start gap-3 text-sm text-ink transition hover:text-bronze"
            >
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
              {settings.email}
            </a>
            <a
              href={`tel:${settings.tel}`}
              className="flex items-start gap-3 text-sm text-ink transition hover:text-bronze"
            >
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
              {settings.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-[11px] tracking-[0.16em] text-stone uppercase md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Velmora. All rights reserved.</p>
          <p>Crafted for timeless living.</p>
        </div>
      </div>
    </footer>
  );
}
