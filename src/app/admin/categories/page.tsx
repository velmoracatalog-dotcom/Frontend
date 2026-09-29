"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { Category } from "@/lib/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ name: "", slug: "", image: "", order: "0" });

  async function load() {
    setCategories(await apiFetch<Category[]>("/api/categories"));
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div>
      <h1 className="font-serif text-4xl">Categories</h1>
      <form
        className="mt-8 grid gap-3 border border-line p-5"
        onSubmit={(event) => {
          event.preventDefault();
          void apiFetch("/api/categories", {
            method: "POST",
            body: JSON.stringify({
              ...form,
              slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              order: Number(form.order),
            }),
          }).then(() => {
            setForm({ name: "", slug: "", image: "", order: "0" });
            return load();
          });
        }}
      >
        <input className="border border-line px-3 py-2 text-sm" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="border border-line px-3 py-2 text-sm" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
        <button className="btn-fill bg-ink py-3 text-[11px] tracking-[0.2em] text-ivory uppercase"><span>Add category</span></button>
      </form>
      <div className="mt-6 space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between border border-line px-4 py-3">
            <p className="font-serif text-lg">{category.name}</p>
            <button className="text-[11px] uppercase tracking-[0.16em] text-bronze" type="button" onClick={() => void apiFetch(`/api/categories/${category.id}`, { method: "DELETE" }).then(load)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
