import type { Metadata } from "next";
import { Intro } from "@/components/home/Intro";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Navbar } from "@/components/layout/Navbar";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { CatalogProvider } from "@/context/CatalogContext";
import { getCatalog } from "@/lib/api";
import { Providers } from "./providers";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Velmora — Discover Your Style",
    template: "%s · Velmora",
  },
  description:
    "Curated products. Timeless choices. Shop fashion, accessories, and lifestyle at Velmora. Email Velmoracatalog@gmail.com · 0370 6058231.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const catalog = await getCatalog();

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col bg-ivory text-ink">
        <Providers>
          <CatalogProvider catalog={catalog}>
            <Intro />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <SearchOverlay />
            <MobileMenu />
          </CatalogProvider>
        </Providers>
      </body>
    </html>
  );
}
