"use client";

import { createContext, useContext } from "react";
import type { Catalog } from "@/lib/types";
import { fallbackCatalog } from "@/lib/fallback";

const CatalogContext = createContext<Catalog>(fallbackCatalog);

export function CatalogProvider({
  catalog,
  children,
}: {
  catalog: Catalog;
  children: React.ReactNode;
}) {
  return (
    <CatalogContext.Provider value={catalog}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  return useContext(CatalogContext);
}
