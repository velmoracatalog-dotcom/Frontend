import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
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

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}
    >
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
