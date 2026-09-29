import { fallbackCatalog } from "./fallback";
import type { Catalog, Settings } from "./types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

function mergeSettings(settings: Settings | null | undefined): Settings {
  if (!settings) return fallbackCatalog.settings;
  return {
    ...fallbackCatalog.settings,
    ...settings,
    hero: { ...fallbackCatalog.settings.hero, ...settings.hero },
    newCollection: { ...fallbackCatalog.settings.newCollection, ...settings.newCollection },
    instagram: {
      ...fallbackCatalog.settings.instagram,
      ...settings.instagram,
      posts: settings.instagram?.posts?.length
        ? settings.instagram.posts
        : fallbackCatalog.settings.instagram.posts,
    },
    marqueeItems: settings.marqueeItems?.length
      ? settings.marqueeItems
      : fallbackCatalog.settings.marqueeItems,
    tickerItems: settings.tickerItems?.length
      ? settings.tickerItems
      : fallbackCatalog.settings.tickerItems,
    whyPoints: settings.whyPoints?.length
      ? settings.whyPoints
      : fallbackCatalog.settings.whyPoints,
    policies: settings.policies?.length
      ? settings.policies
      : fallbackCatalog.settings.policies,
  };
}

export async function getCatalog(): Promise<Catalog> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(`${API_URL}/api/catalog`, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!response.ok) throw new Error("Catalog request failed");
    const data = (await response.json()) as Partial<Catalog>;
    return {
      products: data.products?.length ? data.products : fallbackCatalog.products,
      categories: data.categories?.length
        ? data.categories
        : fallbackCatalog.categories,
      reviews: data.reviews?.length ? data.reviews : fallbackCatalog.reviews,
      settings: mergeSettings(data.settings),
    };
  } catch {
    return fallbackCatalog;
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as { message?: string }).message || "Request failed");
  }
  return data as T;
}
