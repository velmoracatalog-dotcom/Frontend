export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description?: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  image: string;
};

export type Review = {
  id: string;
  quote: string;
  author: string;
  rating: number;
};

export type WhyPoint = {
  title: string;
  copy: string;
  icon: string;
};

export type Policy = {
  id: string;
  title: string;
  copy: string;
};

export type Settings = {
  email: string;
  phone: string;
  phoneDisplay: string;
  tel: string;
  whatsapp: string;
  footerTagline: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: string;
    cta: string;
  };
  newCollection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: string;
  };
  instagram: {
    handle: string;
    subtitle: string;
    posts: string[];
  };
  marqueeItems: string[];
  tickerItems: string[];
  whyPoints: WhyPoint[];
  policies: Policy[];
};

export type Catalog = {
  products: Product[];
  categories: Category[];
  reviews: Review[];
  settings: Settings;
};
