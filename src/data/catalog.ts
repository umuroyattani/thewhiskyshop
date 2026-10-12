import rawCatalog from "./thewhiskyshop_catalog.json";

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryId?: number;
  region?: string;
  brand?: string;
  origin?: string;
  size?: string;
  abv?: string;
  price: number;
  originalPrice?: number;
  image: string;
  tag?: string;
  tastingNotes?: string[];
  description?: string;
  availableBranches?: string[];
}

export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  brandsCount: number;
  brands: string[];
  image: string;
  remoteImage?: string;
}

// 18 official categories directly from https://thewhiskyshop.co.ke/
export const CATEGORIES: CategoryItem[] = rawCatalog.categories as CategoryItem[];

// All real drinks and goods fetched from https://thewhiskyshop.co.ke/
export const ALL_PRODUCTS: Product[] = (rawCatalog.products as any[]).map((p) => ({
  id: String(p.id),
  name: p.name,
  category: p.category,
  categoryId: p.categoryId,
  brand: p.brand || "",
  origin: p.origin || "",
  size: p.size || "750 ml",
  price: Number(p.price),
  originalPrice: Number(p.originalPrice || p.price),
  image: p.image || p.remoteImage,
  tag: p.category,
  description: p.description || "",
  availableBranches: p.availableBranches || [],
  tastingNotes: ["Rich Oak", "Velvety Finish", "Refined Aroma"],
}));

// Top signature best-selling drinks from thewhiskyshop.co.ke
export const BEST_SELLERS: Product[] = [
  ALL_PRODUCTS.find((p) => p.name.includes("Glenmorangie Quinta Ruban")) || ALL_PRODUCTS[0],
  ALL_PRODUCTS.find((p) => p.name.includes("Aberlour 14yrs")) || ALL_PRODUCTS[1],
  ALL_PRODUCTS.find((p) => p.name.includes("Nikka Yoichi")) || ALL_PRODUCTS[2],
  ALL_PRODUCTS.find((p) => p.name.includes("Bowmore black & rock")) || ALL_PRODUCTS[3],
  ALL_PRODUCTS.find((p) => p.name.includes("Martell XO")) || ALL_PRODUCTS[4],
  ALL_PRODUCTS.find((p) => p.name.includes("Jack Daniel's Mclaren")) || ALL_PRODUCTS[5],
].filter(Boolean) as Product[];

export const FEATURED_SELECTION = {
  id: "glenmorangie-quinta-ruban",
  watermark: "THE SELECTION",
  tagline: "Discover our rare single malt collection curated for those who appreciate every refined savor",
  title: "Glenmorangie Quinta Ruban 14Yrs 700ML",
  subtitle: "Single Malt Scotch Whisky • Port Cask Finish",
  description:
    "A velvety and intensely complex 14-year-old single malt scotch whisky from the Scottish Highlands, matured first in ex-bourbon casks then finished in port pipes from Portugal.",
  price: 10600,
  buttonText: "ADD TO BAG",
  image: "https://thewhiskyshop.co.ke/api/open/images/1_1760964123096_1112.jpg",
};

export const SPOTLIGHT_FEATURE = {
  title: "Crafting Moments with Finest Spirits.",
  description:
    "One sip, an experience that lasts. Discover the finest single malts, aged rums, rare Japanese whiskies, and historic cognac expressions from The Whisky Shop Kenya.",
  subtext:
    "Finely harvested distillation and maturation process techniques combined to yield rare taste profiles that create memories to cherish for any celebration.",
  image: "/images/hero/spotlight_party.jpg",
};

export const ART_OF_WHISKY = {
  subtitle: "Celebrating the Art of Whisky",
  title: "Celebrating the Art of Whisky",
  description:
    "Step into our world of finely aged spirits and let us introduce you to rare vintage allocations curated for those mastering the art of savoring.",
  buttonText: "EXPLORE COLLECTION",
  image: "/images/hero/art_bar.jpg",
};

export const NEWSLETTER = {
  title: "Stay in the Spirit",
  description:
    "Subscribe to receive invitations to private tastings, new arrivals from The Whisky Shop Kenya, and exclusive cask allocations.",
  buttonText: "JOIN THE CLUB",
};

export const TESTIMONIALS = [
  {
    name: "James Kariuki",
    role: "Single Malt Collector",
    text: "The curated Scotch selection and same-day delivery in Nairobi are simply unmatched.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Sarah Mwangi",
    role: "Sommelier",
    text: "Authentic bottles, transparent stock availability across branches, and pristine packaging.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "David Ochieng",
    role: "Whisky Enthusiast",
    text: "Discovered rare Japanese expressions and single barrel bourbons I could not find anywhere else.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];
