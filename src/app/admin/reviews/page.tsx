"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { Review } from "@/lib/types";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  async function load() {
    setReviews(await apiFetch<Review[]>("/api/reviews?all=1"));
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div>
      <h1 className="font-serif text-4xl">Reviews</h1>
      <div className="mt-8 space-y-4">
        {reviews.map((review) => (
          <article key={review.id} className="border border-line px-5 py-4">
            <p className="font-serif text-2xl">“{review.quote}”</p>
            <p className="mt-2 text-sm text-stone">{review.author} · {review.productName || "General"} · {review.rating}★</p>
            <div className="mt-4 flex gap-4 text-[11px] uppercase tracking-[0.16em]">
              <button type="button" onClick={() => void apiFetch(`/api/reviews/${review.id}`, { method: "PATCH", body: JSON.stringify({ visible: !review.visible }) }).then(load)}>
                {review.visible === false ? "Show" : "Hide"}
              </button>
              <button type="button" className="text-bronze" onClick={() => void apiFetch(`/api/reviews/${review.id}`, { method: "DELETE" }).then(load)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
