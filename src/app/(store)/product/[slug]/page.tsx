"use client";

import { use, useState } from "react";
import Link from "next/link";
import { CatalogImage } from "@/components/ui/CatalogImage";
import { StarRating } from "@/components/ui/StarRating";
import { useAuth } from "@/context/AuthContext";
import { useCatalog } from "@/context/CatalogContext";
import { apiFetch } from "@/lib/api";
import { formatPKR } from "@/lib/format";
import { sellingPrice } from "@/lib/merchandising";
import type { Review } from "@/lib/types";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { products, reviews } = useCatalog();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const product = products.find((item) => item.slug === slug || item.id === slug);
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [localReviews, setLocalReviews] = useState<Review[]>(
    reviews.filter((review) => review.productId === product?.id || review.productName === product?.name),
  );
  const [message, setMessage] = useState("");

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-serif text-4xl">Piece not found</h1>
        <Link href="/shop" className="mt-6 inline-block text-[11px] tracking-[0.2em] uppercase text-bronze">
          Back to shop
        </Link>
      </div>
    );
  }

  async function submitReview(event: React.FormEvent) {
    event.preventDefault();
    if (!user) {
      setMessage("Please sign in to leave a review.");
      return;
    }
    try {
      const review = await apiFetch<Review>("/api/reviews", {
        method: "POST",
        body: JSON.stringify({ quote, rating, productId: product!.id }),
      });
      setLocalReviews((current) => [review, ...current]);
      setQuote("");
      setMessage("Thank you — your review is live.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save review");
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative aspect-[3/4] bg-cream">
          <CatalogImage src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div>
          <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">{product.category}</p>
          <h1 className="mt-3 font-serif text-5xl">{product.name}</h1>
          <div className="mt-4">
            <StarRating rating={product.rating} />
          </div>
          <p className="mt-4 text-xl text-stone">
            {product.isOnSale && product.salePrice ? (
              <>
                <span className="text-bronze">{formatPKR(product.salePrice)}</span>
                <span className="ml-3 text-base text-stone line-through">{formatPKR(product.price)}</span>
              </>
            ) : (
              formatPKR(product.price)
            )}
          </p>
          <p className="mt-6 max-w-md text-sm leading-7 text-stone">
            {product.description || "A considered piece for everyday elegance."}
          </p>
          <button
            type="button"
            onClick={() =>
              dispatch(
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: sellingPrice(product),
                  image: product.image,
                }),
              )
            }
            className="btn-fill mt-8 bg-ink px-8 py-3.5 text-[11px] tracking-[0.22em] text-ivory uppercase"
          >
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      <div className="mt-20 border-t border-line pt-12">
        <h2 className="font-serif text-3xl">Reviews</h2>
        <form onSubmit={submitReview} className="mt-6 max-w-xl space-y-4">
          <textarea
            value={quote}
            onChange={(event) => setQuote(event.target.value)}
            placeholder="Share how this piece lives with you..."
            className="w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
            rows={4}
            required
          />
          <div className="flex items-center gap-3">
            <label className="text-[11px] tracking-[0.18em] uppercase text-stone">Rating</label>
            <select
              value={rating}
              onChange={(event) => setRating(Number(event.target.value))}
              className="border border-line bg-ivory px-3 py-2 text-sm"
            >
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} stars
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-fill bg-ink px-6 py-3 text-[11px] tracking-[0.2em] text-ivory uppercase">
            <span>{user ? "Post review" : "Sign in to review"}</span>
          </button>
          {message && <p className="text-sm text-bronze">{message}</p>}
        </form>
        <div className="mt-10 space-y-6">
          {localReviews.length === 0 && (
            <p className="text-sm text-stone">No reviews yet. Be the first voice.</p>
          )}
          {localReviews.map((review) => (
            <blockquote key={review.id} className="border-t border-line pt-5">
              <StarRating rating={review.rating} />
              <p className="mt-3 font-serif text-2xl">“{review.quote}”</p>
              <p className="mt-2 text-[11px] tracking-[0.16em] uppercase text-stone">— {review.author}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
