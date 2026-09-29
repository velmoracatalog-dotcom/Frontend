import type { Catalog } from "./types";

export const fallbackCatalog: Catalog = {
  products: [
    {
      id: "linen-shirt",
      slug: "linen-shirt",
      name: "Linen Oversized Shirt",
      price: 2499,
      rating: 5,
      image: "/images/products/linen-shirt.png",
      category: "Fashion",
    },
    {
      id: "leather-tote",
      slug: "leather-tote",
      name: "Structured Leather Tote",
      price: 6490,
      rating: 5,
      image: "/images/products/leather-tote.png",
      category: "Accessories",
    },
    {
      id: "ceramic-lamp",
      slug: "ceramic-lamp",
      name: "Matte Ceramic Lamp",
      price: 4290,
      rating: 4,
      image: "/images/products/ceramic-lamp.png",
      category: "Lifestyle",
    },
    {
      id: "bronze-hoops",
      slug: "bronze-hoops",
      name: "Bronze Hoop Earrings",
      price: 1890,
      rating: 5,
      image: "/images/products/bronze-hoops.png",
      category: "Accessories",
    },
  ],
  categories: [
    { id: "fashion", slug: "fashion", name: "Fashion", image: "/images/categories/fashion.png" },
    { id: "accessories", slug: "accessories", name: "Accessories", image: "/images/categories/accessories.png" },
    { id: "lifestyle", slug: "lifestyle", name: "Lifestyle", image: "/images/categories/lifestyle.png" },
    { id: "new-arrivals", slug: "new-arrivals", name: "New Arrivals", image: "/images/categories/new-arrivals.png" },
  ],
  reviews: [
    { id: "1", quote: "Great quality and beautiful packaging.", author: "Verified Customer", rating: 5 },
    { id: "2", quote: "Timeless pieces that feel considered, not trendy.", author: "Ayesha M.", rating: 5 },
    { id: "3", quote: "The linen shirt is my everyday uniform now.", author: "Verified Customer", rating: 5 },
  ],
  settings: {
    email: "Velmoracatalog@gmail.com",
    phone: "03706058231",
    phoneDisplay: "0370 6058231",
    tel: "+923706058231",
    whatsapp: "https://wa.me/923706058231",
    footerTagline:
      "The house of curated fashion, accessories, and lifestyle. Classic pieces, modern living — made for everyday elegance.",
    hero: {
      eyebrow: "The House of Velmora",
      title: "Discover Your Style",
      subtitle: "Curated products. Timeless choices.",
      image: "/images/hero.png",
      cta: "Shop Now",
    },
    newCollection: {
      eyebrow: "Just Arrived",
      title: "The New Collection",
      subtitle: "Made for your everyday.",
      image: "/images/collection.png",
    },
    instagram: {
      handle: "@Velmora",
      subtitle: "See what's new",
      posts: [
        "/images/instagram/ig-1.png",
        "/images/instagram/ig-2.png",
        "/images/instagram/ig-3.png",
        "/images/instagram/ig-4.png",
      ],
    },
    marqueeItems: [
      "Fashion",
      "Accessories",
      "Lifestyle",
      "New Arrivals",
      "Fast Delivery",
      "Secure Payments",
      "Easy Returns",
      "Quiet Luxury",
    ],
    tickerItems: [
      "Complimentary shipping over Rs. 5,000",
      "Velmoracatalog@gmail.com",
      "0370 6058231",
      "The House of Velmora",
    ],
    whyPoints: [
      {
        title: "Fast Delivery",
        copy: "Thoughtfully packed and sent with care, so your order arrives ready to wear or gift.",
        icon: "truck",
      },
      {
        title: "Secure Payments",
        copy: "Every checkout is protected, so you can shop with the same ease you dress.",
        icon: "card",
      },
      {
        title: "Easy Returns",
        copy: "Changed your mind? Send it back within 14 days — no fuss, no fine print.",
        icon: "return",
      },
    ],
    policies: [
      { id: "shipping", title: "Shipping", copy: "Complimentary delivery on orders over Rs. 5,000, packed with care." },
      { id: "returns", title: "Returns", copy: "Changed your mind? Easy returns within 14 days of delivery." },
      { id: "privacy", title: "Privacy", copy: "Your details stay with the house. We never sell your information." },
    ],
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/#collections", label: "Collections" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export const footerLinks = [
  { href: "/shop", label: "Shop" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
  { href: "#shipping", label: "Shipping" },
  { href: "#returns", label: "Returns" },
  { href: "#privacy", label: "Privacy" },
] as const;
