import type { Product } from "./types";

export function sellingPrice(product: Product) {
  if (product.isOnSale && product.salePrice && product.salePrice > 0) {
    return product.salePrice;
  }
  return product.price;
}

function newestFirst(products: Product[]) {
  return [...products].sort((left, right) => {
    const a = left.createdAt ? new Date(left.createdAt).getTime() : 0;
    const b = right.createdAt ? new Date(right.createdAt).getTime() : 0;
    return b - a;
  });
}

export function pickNewArrivals(products: Product[]) {
  const flagged = products.filter((product) => product.isNewArrival);
  if (flagged.length) return flagged.slice(0, 8);
  return newestFirst(products).slice(0, 4);
}

export function pickBestSellers(products: Product[]) {
  return products.filter((product) => product.isBestSeller).slice(0, 8);
}

export function pickFeatured(products: Product[]) {
  return products.filter((product) => product.isFeatured).slice(0, 8);
}

export function pickOnSale(products: Product[]) {
  return products.filter((product) => product.isOnSale).slice(0, 8);
}

export function pickTrending(products: Product[]) {
  return products.filter((product) => product.isTrending).slice(0, 8);
}

export function pickLimited(products: Product[]) {
  return products.filter((product) => product.isLimited).slice(0, 8);
}

export function pickOffers(products: Product[]) {
  return products.filter((product) => product.isOffer).slice(0, 8);
}

export function pickGender(products: Product[], gender: string) {
  return products.filter((product) => product.gender === gender);
}
