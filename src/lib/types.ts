export type AuthUser = {
  id: string;
  email: string;
  name: string;
  picture?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  role: "user" | "admin";
  createdAt?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description?: string;
  gender?: "" | "women" | "men" | "kids";
  salePrice?: number;
  inStock?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  isTrending?: boolean;
  isLimited?: boolean;
  isOffer?: boolean;
  createdAt?: string;
};

export type Order = {
  id: string;
  items: Array<{
    productId: string;
    slug?: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: "pending" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";
  customer: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
  };
  createdAt?: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  image: string;
};

export type AdminNotification = {
  id: string;
  type: "order" | "message" | "review" | "user";
  title: string;
  body: string;
  link: string;
  read?: boolean;
  createdAt?: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  read?: boolean;
  createdAt?: string;
};

export type Review = {
  id: string;
  quote: string;
  author: string;
  rating: number;
  productId?: string;
  productName?: string;
  visible?: boolean;
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
