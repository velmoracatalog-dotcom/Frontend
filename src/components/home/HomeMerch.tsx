"use client";

import { useCatalog } from "@/context/CatalogContext";
import { ProductRail } from "@/components/home/ProductRail";
import { ShopByGender } from "@/components/home/ShopByGender";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import {
  pickBestSellers,
  pickFeatured,
  pickLimited,
  pickNewArrivals,
  pickOffers,
  pickOnSale,
  pickTrending,
} from "@/lib/merchandising";

export function HomeMerch() {
  const { products } = useCatalog();

  return (
    <>
      <ProductRail
        id="new-arrivals"
        eyebrow="Just arrived"
        title="New Arrivals"
        href="/shop?section=new"
        products={pickNewArrivals(products)}
      />
      <ProductRail
        id="best-sellers"
        eyebrow="The edit"
        title="Best Sellers"
        href="/shop?section=bestsellers"
        products={pickBestSellers(products)}
        muted
      />
      <ProductRail
        id="featured"
        eyebrow="Popular"
        title="Featured"
        href="/shop?section=featured"
        products={pickFeatured(products)}
      />
      <ProductRail
        id="on-sale"
        eyebrow="For a short time"
        title="On Sale"
        href="/shop?section=sale"
        products={pickOnSale(products)}
        muted
      />
      <ShopByGender />
      <FeaturedCategories />
      <ProductRail
        id="editors-pick"
        eyebrow="Trending"
        title="Editor's Pick"
        href="/shop?section=trending"
        products={pickTrending(products)}
      />
      <ProductRail
        id="limited"
        eyebrow="Seasonal"
        title="Limited Edition"
        href="/shop?section=limited"
        products={pickLimited(products)}
        muted
      />
      <ProductRail
        id="offers"
        eyebrow="The house"
        title="Special Offers"
        href="/shop?section=offers"
        products={pickOffers(products)}
      />
    </>
  );
}
