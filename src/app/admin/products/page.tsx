"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { formatPKR } from "@/lib/format";
import type { Category, Product } from "@/lib/types";

const empty = {
  name: "",
  slug: "",
  price: "",
  salePrice: "",
  category: "",
  gender: "",
  description: "",
  image: "",
  inStock: true,
  isNewArrival: false,
  isBestSeller: false,
  isFeatured: false,
  isOnSale: false,
  isTrending: false,
  isLimited: false,
  isOffer: false,
};

function fromProduct(product: Product) {
  return {
    name: product.name,
    slug: product.slug,
    price: String(product.price),
    salePrice: product.salePrice ? String(product.salePrice) : "",
    category: product.category,
    gender: product.gender ?? "",
    description: product.description ?? "",
    image: product.image,
    inStock: product.inStock ?? true,
    isNewArrival: product.isNewArrival ?? false,
    isBestSeller: product.isBestSeller ?? false,
    isFeatured: product.isFeatured ?? false,
    isOnSale: product.isOnSale ?? false,
    isTrending: product.isTrending ?? false,
    isLimited: product.isLimited ?? false,
    isOffer: product.isOffer ?? false,
  };
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function load() {
    const [nextProducts, nextCategories] = await Promise.all([
      apiFetch<Product[]>("/api/products"),
      apiFetch<Category[]>("/api/categories"),
    ]);
    setProducts(nextProducts);
    setCategories(nextCategories);
  }

  useEffect(() => {
    void load();
  }, []);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const payload = {
      ...form,
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : 0,
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };
    try {
      if (editing) {
        await apiFetch(`/api/products/${editing}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch("/api/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      setForm(empty);
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save product");
    }
  }

  async function upload(file: File) {
    const body = new FormData();
    body.append("file", file);
    const result = await apiFetch<{ url: string }>("/api/upload", { method: "POST", body });
    setForm((current) => ({ ...current, image: result.url }));
  }

  const flags = [
    ["isNewArrival", "New arrival"],
    ["isBestSeller", "Best seller"],
    ["isFeatured", "Featured"],
    ["isOnSale", "On sale"],
    ["isTrending", "Editor's pick"],
    ["isLimited", "Limited edition"],
    ["isOffer", "Special offer"],
  ] as const;

  return (
    <div>
      <h1 className="font-serif text-4xl">Products</h1>
      <form onSubmit={save} className="mt-8 grid grid-cols-1 gap-4 border border-line p-5 md:grid-cols-2">
        <input className="border border-line px-3 py-2 text-sm" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="border border-line px-3 py-2 text-sm" placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <input className="border border-line px-3 py-2 text-sm" placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input className="border border-line px-3 py-2 text-sm" placeholder="Sale price" type="number" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} />
        <select className="border border-line px-3 py-2 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
          <option value="">Category / type</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
        <select className="border border-line px-3 py-2 text-sm" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
          <option value="">Gender collection</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
        <input className="border border-line px-3 py-2 text-sm md:col-span-2" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
        <input className="text-sm md:col-span-2" type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && void upload(e.target.files[0])} />
        <textarea className="border border-line px-3 py-2 text-sm md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <label className="text-sm"><input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} /> In stock</label>
        <div className="grid grid-cols-2 gap-2 text-sm md:col-span-2">
          {flags.map(([key, label]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
              />
              {label}
            </label>
          ))}
        </div>
        {error && <p className="text-sm text-bronze md:col-span-2">{error}</p>}
        <button className="btn-fill bg-ink py-3 text-[11px] tracking-[0.2em] text-ivory uppercase md:col-span-2">
          <span>{editing ? "Update product" : "Add product"}</span>
        </button>
      </form>
      <div className="mt-8 space-y-3">
        {products.map((product) => (
          <div key={product.id} className="flex flex-wrap items-center justify-between gap-3 border border-line px-4 py-3">
            <div>
              <p className="font-serif text-lg">{product.name}</p>
              <p className="text-sm text-stone">{product.category} · {formatPKR(product.price)}</p>
            </div>
            <div className="flex gap-4 text-[11px] uppercase tracking-[0.16em]">
              <button type="button" onClick={() => { setEditing(product.id); setForm(fromProduct(product)); }}>Edit</button>
              <button type="button" className="text-bronze" onClick={() => void apiFetch(`/api/products/${product.id}`, { method: "DELETE" }).then(load)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
