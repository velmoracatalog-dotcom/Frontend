"use client";

import { useEffect, useState } from "react";
import { OrderTracker } from "@/components/orders/OrderTracker";
import { apiFetch } from "@/lib/api";
import { formatPKR } from "@/lib/format";
import type { Order } from "@/lib/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function load() {
    setOrders(await apiFetch<Order[]>("/api/orders"));
  }

  useEffect(() => {
    void load();
  }, []);

  async function setStatus(id: string, status: Order["status"]) {
    await apiFetch(`/api/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await load();
  }

  return (
    <div>
      <h1 className="font-serif text-4xl">Orders</h1>
      <p className="mt-2 text-sm text-stone">Tap a step to move the order. The guest sees the same progress.</p>
      <div className="mt-8 space-y-6">
        {orders.map((order) => (
          <article key={order.id} className="border border-line px-5 py-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-serif text-2xl">{order.customer?.name || "Customer"}</p>
                <p className="mt-1 text-sm text-stone">
                  {order.customer?.email} · {order.customer?.phone}
                </p>
                <p className="mt-1 text-sm text-stone">
                  {order.customer?.address}
                  {order.customer?.city ? `, ${order.customer.city}` : ""}
                </p>
              </div>
              <p className="font-serif text-2xl">{formatPKR(order.total)}</p>
            </div>
            <ul className="mt-4 text-sm text-stone">
              {order.items.map((item) => (
                <li key={`${order.id}-${item.productId}`}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <OrderTracker
                status={order.status}
                onSelect={(status) => void setStatus(order.id, status)}
              />
            </div>
            {order.status !== "cancelled" && (
              <button
                type="button"
                className="mt-5 cursor-pointer text-[11px] tracking-[0.16em] uppercase text-bronze"
                onClick={() => void setStatus(order.id, "cancelled")}
              >
                Cancel order
              </button>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
