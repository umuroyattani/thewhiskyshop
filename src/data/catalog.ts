export interface Product {
  id: string;
  name: string;
  category: string;
  region: string;
  abv: string;
  price: number;
  image: string;
  tag?: string;
  tastingNotes: string[];
}

export const CATEGORIES = [
  { name: "Single Malt", count: "120+ Bottles", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=600&auto=format&fit=crop" },
  { name: "Bourbon", count: "45+ Bottles", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop" },
  { name: "Curated Blends", count: "60+ Bottles", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=600&auto=format&fit=crop" },
  { name: "Gin & Botanicals", count: "35+ Bottles", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600&auto=format&fit=crop" },
  { name: "Vodka", count: "25+ Bottles", image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=600&auto=format&fit=crop" },
  { name: "Cognac & Rum", count: "40+ Bottles", image: "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?q=80&w=600&auto=format&fit=crop" },
];

export const BEST_SELLERS: Product[] = [
  {
    id: "glenfiddich-12",
    name: "Glenfiddich 12 Year Old",
    category: "Single Malt Scotch",
    region: "Speyside",
    abv: "40%",
    price: 7350,
    tag: "Top Rated",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=800&auto=format&fit=crop",
    tastingNotes: ["Fresh Pear", "Subtle Oak", "Malty Sweetness"],
  },
  {
    id: "ardbeg-10",
    name: "Ardbeg 10 Year Old",
    category: "Islay Single Malt",
    region: "Islay",
    abv: "46%",
    price: 11200,
    tag: "Peated Classic",
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=800&auto=format&fit=crop",
    tastingNotes: ["Peat Smoke", "Lemon Zest", "Black Pepper"],
  },
  {
    id: "macallan-12-sherry",
    name: "The Macallan 12 Sherry Oak",
    category: "Single Malt Scotch",
    region: "Highlands",
    abv: "43%",
    price: 14500,
    tag: "Exclusive",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
    tastingNotes: ["Dried Fruit", "Ginger Spice", "Rich Wood Smoke"],
  },
];

export const SPOTLIGHT_FEATURE = {
  title: "Crafting Moments with Finest Spirits",
  description: "One sip, a process that last. Discover our best-selling spirits, the winest, and historic favorite recipes for a truly refined experience.",
  subtext: "The greatest of all year, finely harvested distillation and maturation process techniques combined to yield rare taste profiles that create memories to cherish for any occasion.",
  image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop",
};

export const ART_OF_WHISKY = {
  subtitle: "Celebrating the Art of Whisky",
  title: "Celebrating the Art of Whisky",
  description: "Step into our world of finely aged spirits and let us introducing vintage allocations curated for those mastering the art of savoring.",
  buttonText: "EXPLORE COLLECTION",
  image: "https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=1600&auto=format&fit=crop",
};

export const FEATURED_SELECTION = {
  id: "curated-selection-2026",
  title: "The Selection – Curated Premium Edition",
  description: "This unique edition brings together some of the world's most rare single malt reserve allocations, handpicked by our master sommelier.",
  price: 24500,
  image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=800&auto=format&fit=crop",
};

export const TESTIMONIALS = [
  {
    name: "Maina Kiai",
    role: "Whisky Collector & Club Member",
    text: "Phenomenal selection of hard-to-find single malts. The temperature-controlled delivery in Nairobi arrived in under 2 hours.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Amina Mohamed",
    role: "Corporate Executive",
    text: "The custom engraving and luxury wooden gift packaging made our end-of-year executive gifting completely seamless.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Ken Njoroge",
    role: "Verified Connoisseur",
    text: "Direct M-Pesa STK checkout on mobile makes re-stocking my home bar effortless. By far the finest whisky boutique in Kenya.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
];
