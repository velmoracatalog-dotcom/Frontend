"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { ContactMessage } from "@/lib/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  async function load() {
    setMessages(await apiFetch<ContactMessage[]>("/api/contact"));
  }

  useEffect(() => {
    void load();
  }, []);

  const unread = messages.filter((item) => !item.read).length;

  return (
    <div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-bronze">
        {unread} unread · {messages.length} total
      </p>
      <h1 className="mt-2 font-serif text-4xl">Messages</h1>
      <div className="mt-8 space-y-4">
        {messages.length === 0 && (
          <p className="text-sm text-stone">No contact notes yet.</p>
        )}
        {messages.map((item) => (
          <article
            key={item.id}
            className={`border px-5 py-5 ${item.read ? "border-line bg-ivory" : "border-bronze/40 bg-cream/40"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-serif text-2xl">{item.name}</p>
                <p className="mt-1 text-sm text-stone">
                  {item.email}
                  {item.phone ? ` · ${item.phone}` : ""}
                </p>
              </div>
              <p className="text-[11px] tracking-[0.16em] uppercase text-stone">
                {item.createdAt ? new Date(item.createdAt).toLocaleString() : "New"}
              </p>
            </div>
            {item.subject && (
              <p className="mt-4 text-[11px] tracking-[0.18em] uppercase text-bronze">
                {item.subject}
              </p>
            )}
            <p className="mt-3 text-sm leading-7 text-ink">{item.message}</p>
            <div className="mt-5 flex gap-4 text-[11px] tracking-[0.16em] uppercase">
              <button
                type="button"
                className="cursor-pointer hover:text-bronze"
                onClick={() =>
                  void apiFetch(`/api/contact/${item.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({ read: !item.read }),
                  }).then(load)
                }
              >
                {item.read ? "Mark unread" : "Mark read"}
              </button>
              <button
                type="button"
                className="cursor-pointer text-bronze"
                onClick={() =>
                  void apiFetch(`/api/contact/${item.id}`, { method: "DELETE" }).then(load)
                }
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
