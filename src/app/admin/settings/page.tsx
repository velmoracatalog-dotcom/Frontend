"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { Settings } from "@/lib/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    void apiFetch<Settings>("/api/settings").then(setSettings);
  }, []);

  if (!settings) return <p className="text-stone">Loading settings...</p>;

  return (
    <div>
      <h1 className="font-serif text-4xl">Settings</h1>
      <form
        className="mt-8 grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void apiFetch("/api/settings", {
            method: "PATCH",
            body: JSON.stringify(settings),
          }).then(() => setMessage("Saved"));
        }}
      >
        <input className="border border-line px-3 py-2 text-sm" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
        <input className="border border-line px-3 py-2 text-sm" value={settings.phoneDisplay} onChange={(e) => setSettings({ ...settings, phoneDisplay: e.target.value })} />
        <input className="border border-line px-3 py-2 text-sm" value={settings.hero.title} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, title: e.target.value } })} />
        <input className="border border-line px-3 py-2 text-sm" value={settings.hero.subtitle} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, subtitle: e.target.value } })} />
        <textarea className="border border-line px-3 py-2 text-sm" value={settings.footerTagline} onChange={(e) => setSettings({ ...settings, footerTagline: e.target.value })} />
        <button className="btn-fill bg-ink py-3 text-[11px] tracking-[0.2em] text-ivory uppercase"><span>Save settings</span></button>
        {message && <p className="text-sm text-bronze">{message}</p>}
      </form>
    </div>
  );
}
