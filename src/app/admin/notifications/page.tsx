"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { AdminNotification } from "@/lib/types";

export default function AdminNotificationsPage() {
  const [items, setItems] = useState<AdminNotification[]>([]);
  const [unread, setUnread] = useState(0);

  async function load() {
    const data = await apiFetch<{ items: AdminNotification[]; unread: number }>(
      "/api/notifications",
    );
    setItems(data.items);
    setUnread(data.unread);
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-bronze">
            {unread} unread
          </p>
          <h1 className="mt-2 font-serif text-4xl">Notifications</h1>
        </div>
        {unread > 0 && (
          <button
            type="button"
            className="cursor-pointer text-[11px] tracking-[0.18em] uppercase text-bronze"
            onClick={() => void apiFetch("/api/notifications/read-all", { method: "PATCH" }).then(load)}
          >
            Mark all read
          </button>
        )}
      </div>
      <div className="mt-8 space-y-3">
        {items.length === 0 && <p className="text-sm text-stone">No notifications yet.</p>}
        {items.map((item) => (
          <article
            key={item.id}
            className={`border px-5 py-4 ${item.read ? "border-line bg-ivory" : "border-bronze/40 bg-cream/40"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] tracking-[0.16em] uppercase text-bronze">{item.type}</p>
                <p className="mt-1 font-serif text-2xl">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-stone">{item.body}</p>
              </div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-stone">
                {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
              </p>
            </div>
            <div className="mt-4 flex gap-5 text-[11px] tracking-[0.16em] uppercase">
              <Link href={item.link} className="text-bronze hover:text-ink">
                Open
              </Link>
              {!item.read && (
                <button
                  type="button"
                  className="cursor-pointer hover:text-bronze"
                  onClick={() =>
                    void apiFetch(`/api/notifications/${item.id}`, {
                      method: "PATCH",
                      body: JSON.stringify({ read: true }),
                    }).then(load)
                  }
                >
                  Mark read
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
