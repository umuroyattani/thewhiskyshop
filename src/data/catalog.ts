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

// Consumer demand & popularity ordering (Whisky, Gin, Single Malt, Vodka, Tequila, etc.)
export const POPULAR_CATEGORY_ORDER = [
  "GIN",
  "WHISKY",
  "SINGLEMALT",
  "VODKA",
  "TEQUILA",
  "RUM",
  "COGNAC",
  "CHAMPAGNE",
  "WINE",
  "BEER",
  "BRANDY",
  "LIQUEUR",
  "JAPANESE WHISKY",
  "BITTERS & APERITIF",
  "NON ALCOHOLIC",
  "JAPANESE WINE",
  "CIGAR",
  "CIGAR KAFIE",
];

// High-definition, accurately cropped bottle images for category circles
const CATEGORY_FEATURED_IMAGE: Record<string, string> = {
  WHISKY: "/images/thewhiskyshop/categories/whisky.png",
  GIN: "https://thewhiskyshop.co.ke/api/open/images/1_1761648224302_7417.jpeg",
  SINGLEMALT: "https://thewhiskyshop.co.ke/api/open/images/1_1760964123096_1112.jpg",
  VODKA: "https://thewhiskyshop.co.ke/api/open/images/1_1761749965154_1329.jpg",
  TEQUILA: "https://thewhiskyshop.co.ke/api/open/images/1_1761412208191_4214.jpg",
  RUM: "https://thewhiskyshop.co.ke/api/open/images/1_1761753042629_6451.jpg",
  COGNAC: "https://thewhiskyshop.co.ke/api/open/images/1_1761491683359_7654.jpeg",
  CHAMPAGNE: "https://thewhiskyshop.co.ke/api/open/images/1_1761380732491_8370.jpg",
  WINE: "https://thewhiskyshop.co.ke/api/open/images/1_1761139114190_932.jpg",
  BEER: "https://thewhiskyshop.co.ke/api/open/images/1_1761204932849_4418.jpg",
  LIQUEUR: "https://thewhiskyshop.co.ke/api/open/images/1_1763098646818_1640.jpeg",
  BRANDY: "https://thewhiskyshop.co.ke/api/open/images/1_1761558782245_8217.jpg",
  "JAPANESE WHISKY": "https://thewhiskyshop.co.ke/api/open/images/1_1762851029324_1689.jpeg",
  "BITTERS & APERITIF": "https://thewhiskyshop.co.ke/api/open/images/1_1761557980759_6183.jpeg",
  "NON ALCOHOLIC": "https://thewhiskyshop.co.ke/api/open/images/1_1761648015973_6817.jpeg",
  "JAPANESE WINE": "https://thewhiskyshop.co.ke/api/open/images/1_1763036113970_4784.jpeg",
  CIGAR: "https://thewhiskyshop.co.ke/api/open/images/1_1761288024469_788.jpg",
  "CIGAR KAFIE": "https://thewhiskyshop.co.ke/api/open/images/1_1761288490947_4041.jpeg",
};

// 18 official categories directly from https://thewhiskyshop.co.ke/ ordered by customer preference
export const CATEGORIES: CategoryItem[] = (rawCatalog.categories as CategoryItem[])
  .map((cat) => ({
    ...cat,
    image: CATEGORY_FEATURED_IMAGE[cat.name] || cat.image || cat.remoteImage || "/images/thewhiskyshop/categories/whisky.png",
  }))
  .sort((a, b) => {
    const idxA = POPULAR_CATEGORY_ORDER.indexOf(a.name.toUpperCase());
    const idxB = POPULAR_CATEGORY_ORDER.indexOf(b.name.toUpperCase());
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

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

// Top rare, prestigious collector bottles (high age statements, luxury reserves)
export const COLLECTOR_BOTTLES: Product[] = [
  ALL_PRODUCTS.find((p) => p.name.includes("Glenfiddich 30YRS")) || ALL_PRODUCTS[0],
  ALL_PRODUCTS.find((p) => p.name.includes("Glenfiddich 26Yrs Grande Couronne")) || ALL_PRODUCTS[1],
  ALL_PRODUCTS.find((p) => p.name.includes("Armand De Brignac Brut")) || ALL_PRODUCTS[2],
  ALL_PRODUCTS.find((p) => p.name.includes("Martell XO 1000Ml")) || ALL_PRODUCTS[3],
  ALL_PRODUCTS.find((p) => p.name.includes("Chivas Regal 25Yrs")) || ALL_PRODUCTS[4],
  ALL_PRODUCTS.find((p) => p.name.includes("Dom Perignon Luminous")) || ALL_PRODUCTS[5],
].filter(Boolean) as Product[];

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
  image: "/images/hero/hero_whisky3.jpg",
};

export const ART_OF_WHISKY = {
  subtitle: "Celebrating the Art of Whisky",
  title: "Celebrating the Art of Whisky",
  description:
    "Step into our world of finely aged spirits and let us introduce you to rare vintage allocations curated for those mastering the art of savoring.",
  buttonText: "EXPLORE COLLECTION",
  image: "/images/hero/hero_whisky1.jpg",
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
