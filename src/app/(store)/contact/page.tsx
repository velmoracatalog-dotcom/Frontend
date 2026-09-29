"use client";

import { useEffect, useState } from "react";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { useCatalog } from "@/context/CatalogContext";
import { apiFetch } from "@/lib/api";

const empty = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const { settings } = useCatalog();
  const { user } = useAuth();
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!user) return;
    setForm((current) => ({
      ...current,
      name: current.name || user.name || "",
      email: current.email || user.email || "",
      phone: current.phone || user.phone || "",
    }));
  }, [user]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSent(false);
    try {
      await apiFetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setSent(true);
      setForm({
        ...empty,
        name: user?.name ?? "",
        email: user?.email ?? "",
        phone: user?.phone ?? "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send message");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <PageHeader
        eyebrow="Correspondence"
        title="Contact"
        copy="A note, a call, or a message — the atelier is open for styling advice, orders, and anything you wish to ask."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5">
          <a
            href={`mailto:${settings.email}`}
            className="group flex flex-col border border-line bg-ivory px-7 py-8 transition duration-500 hover:-translate-y-1 hover:border-bronze/50"
          >
            <MailIcon className="h-6 w-6 text-bronze" />
            <p className="mt-5 text-[11px] tracking-[0.22em] text-stone uppercase">Email</p>
            <p className="mt-2 font-serif text-2xl text-ink transition group-hover:text-bronze">
              {settings.email}
            </p>
          </a>
          <a
            href={`tel:${settings.tel}`}
            className="group flex flex-col border border-line bg-ivory px-7 py-8 transition duration-500 hover:-translate-y-1 hover:border-bronze/50"
          >
            <PhoneIcon className="h-6 w-6 text-bronze" />
            <p className="mt-5 text-[11px] tracking-[0.22em] text-stone uppercase">Telephone</p>
            <p className="mt-2 font-serif text-2xl text-ink transition group-hover:text-bronze">
              {settings.phoneDisplay}
            </p>
          </a>
          <a
            href={settings.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="btn-fill inline-flex cursor-pointer items-center gap-2 bg-ink px-7 py-3.5 text-[11px] tracking-[0.22em] text-ivory uppercase"
          >
            <WhatsAppIcon className="relative z-10 h-4 w-4" />
            <span>Message on WhatsApp</span>
          </a>
        </div>

        <form onSubmit={submit} className="border border-line bg-ivory px-6 py-8 md:px-8">
          <p className="text-[11px] tracking-[0.22em] text-bronze uppercase">Write to us</p>
          <h2 className="mt-3 font-serif text-3xl">Send a note</h2>
          <div className="mt-8 space-y-4">
            <label className="block">
              <span className="text-[11px] tracking-[0.18em] text-stone uppercase">Name</span>
              <input
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
              />
            </label>
            <label className="block">
              <span className="text-[11px] tracking-[0.18em] text-stone uppercase">Email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
              />
            </label>
            <label className="block">
              <span className="text-[11px] tracking-[0.18em] text-stone uppercase">Phone</span>
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
              />
            </label>
            <label className="block">
              <span className="text-[11px] tracking-[0.18em] text-stone uppercase">Subject</span>
              <input
                value={form.subject}
                onChange={(event) => setForm({ ...form, subject: event.target.value })}
                placeholder="Order, styling, or a question"
                className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
              />
            </label>
            <label className="block">
              <span className="text-[11px] tracking-[0.18em] text-stone uppercase">Message</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
              />
            </label>
            {error && <p className="text-sm text-bronze">{error}</p>}
            {sent && <p className="text-sm text-stone">Thank you. Your note is with the house.</p>}
            <button
              type="submit"
              disabled={saving}
              className="btn-fill w-full cursor-pointer bg-ink py-3 text-[11px] tracking-[0.22em] text-ivory uppercase disabled:opacity-40"
            >
              <span>{saving ? "Sending..." : "Send message"}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
