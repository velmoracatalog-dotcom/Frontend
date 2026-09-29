import { Intro } from "@/components/home/Intro";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Navbar } from "@/components/layout/Navbar";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { CatalogProvider } from "@/context/CatalogContext";
import { getCatalog } from "@/lib/api";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const catalog = await getCatalog();

  return (
    <CatalogProvider catalog={catalog}>
      <Intro />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <MobileMenu />
    </CatalogProvider>
  );
}
