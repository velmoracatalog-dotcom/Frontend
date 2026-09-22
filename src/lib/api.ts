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
    const response = await fetch(`${API_URL}/api/catalog`, {
      cache: "no-store",
    });
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
