"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { formatPKR } from "@/lib/format";
import type { Order } from "@/lib/types";

const statuses: Order["status"][] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function load() {
    setOrders(await apiFetch<Order[]>("/api/orders"));
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div>
      <h1 className="font-serif text-4xl">Orders</h1>
      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <article key={order.id} className="border border-line px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-serif text-xl">{order.customer?.name || "Customer"}</p>
                <p className="text-sm text-stone">{order.customer?.phone} · {order.customer?.city}</p>
              </div>
              <p className="font-medium">{formatPKR(order.total)}</p>
            </div>
            <ul className="mt-3 text-sm text-stone">
              {order.items.map((item) => (
                <li key={`${order.id}-${item.productId}`}>{item.name} × {item.quantity}</li>
              ))}
            </ul>
            <select
              className="mt-4 border border-line px-3 py-2 text-sm"
              value={order.status}
              onChange={(event) =>
                void apiFetch(`/api/orders/${order.id}`, {
                  method: "PATCH",
                  body: JSON.stringify({ status: event.target.value }),
                }).then(load)
              }
            >
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </article>
        ))}
      </div>
    </div>
  );
}
