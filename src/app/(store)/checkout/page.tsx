"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CatalogImage } from "@/components/ui/CatalogImage";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { formatPKR } from "@/lib/format";
import type { Order } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setItems } from "@/store/slices/cartSlice";

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    if (!user) return;
    setForm({
      phone: user.phone ?? "",
      address: user.address ?? "",
      city: user.city ?? "",
    });
  }, [user]);

  if (!loading && !user) {
    router.replace("/login");
  }

  async function placeOrder(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await apiFetch<Order>("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
          })),
          customer: {
            name: user?.name,
            email: user?.email,
            ...form,
          },
        }),
      });
      dispatch(setItems([]));
      router.push("/orders");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not place order");
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="font-serif text-4xl md:text-5xl">Checkout</h1>
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <form onSubmit={placeOrder} className="space-y-4">
          <input
            required
            placeholder="Phone"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
          />
          <input
            required
            placeholder="City"
            value={form.city}
            onChange={(event) => setForm({ ...form, city: event.target.value })}
            className="w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
          />
          <textarea
            required
            placeholder="Delivery address"
            value={form.address}
            onChange={(event) => setForm({ ...form, address: event.target.value })}
            className="w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
            rows={4}
          />
          {error && <p className="text-sm text-bronze">{error}</p>}
          <button
            type="submit"
            disabled={items.length === 0}
            className="btn-fill w-full bg-ink py-3 text-[11px] tracking-[0.22em] text-ivory uppercase disabled:opacity-40"
          >
            <span>Place order · {formatPKR(total)}</span>
          </button>
        </form>
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 border-b border-line pb-4">
              <div className="relative h-20 w-16 bg-cream">
                <CatalogImage src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-serif text-lg">{item.name}</p>
                <p className="text-sm text-stone">
                  {item.quantity} × {formatPKR(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
