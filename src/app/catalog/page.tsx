"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/context/CartContext";
import { ALL_PRODUCTS, CATEGORIES, Product } from "@/data/catalog";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal,
  X,
  ShoppingCart,
  Check,
  Store,
  ArrowUpDown,
} from "lucide-react";

function CatalogContent() {
  const searchParams = useSearchParams();
  const { addToCart, openCart, itemCount } = useCart();

  // Category from query or default to GIN (matches reference mockup)
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string>("GIN");

  useEffect(() => {
    if (categoryParam) {
      const match = CATEGORIES.find(
        (c) =>
          c.name.toLowerCase() === categoryParam.toLowerCase() ||
          c.slug.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) {
        setSelectedCategory(match.name);
      }
    }
  }, [categoryParam]);

  // Search & filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [sortBy, setSortBy] = useState<"featured" | "low_high" | "high_low" | "name">("featured");

  // Accordion toggle states
  const [brandsOpen, setBrandsOpen] = useState(true);
  const [attributesOpen, setAttributesOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [brandSearch, setBrandSearch] = useState("");
  const [addedItem, setAddedItem] = useState<string | null>(null);

  // Available brands for selected category
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    ALL_PRODUCTS.filter(
      (p) => selectedCategory === "ALL" || p.category.toUpperCase() === selectedCategory.toUpperCase()
    ).forEach((p) => {
      if (p.brand && p.brand.trim()) brandsSet.add(p.brand.trim());
    });
    return Array.from(brandsSet).sort();
  }, [selectedCategory]);

  // Available sizes
  const availableSizes = useMemo(() => {
    const sizesSet = new Set<string>();
    ALL_PRODUCTS.filter(
      (p) => selectedCategory === "ALL" || p.category.toUpperCase() === selectedCategory.toUpperCase()
    ).forEach((p) => {
      if (p.size && p.size.trim()) sizesSet.add(p.size.trim());
    });
    return Array.from(sizesSet).sort();
  }, [selectedCategory]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // Category filter
      if (
        selectedCategory !== "ALL" &&
        product.category.toUpperCase() !== selectedCategory.toUpperCase()
      ) {
        return false;
      }

      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = (product.brand || "").toLowerCase().includes(q);
        if (!matchesName && !matchesBrand) return false;
      }

      // Brand filter
      if (selectedBrands.length > 0) {
        if (!product.brand || !selectedBrands.includes(product.brand)) return false;
      }

      // Size filter
      if (selectedSizes.length > 0) {
        if (!product.size || !selectedSizes.includes(product.size)) return false;
      }

      // Price range
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "low_high") return a.price - b.price;
      if (sortBy === "high_low") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [selectedCategory, searchQuery, selectedBrands, selectedSizes, minPrice, maxPrice, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedSizes([]);
    setMinPrice(0);
    setMaxPrice(200000);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900">
      <Navbar />

      {/* Top Banner & Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        {/* Breadcrumb & Floating Cart Button */}
        <div className="flex items-center justify-between mb-4">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <Link href="/catalog" className="hover:text-black transition-colors">
              Category
            </Link>
            <span>&gt;</span>
            <span className="text-neutral-900 font-semibold uppercase">{selectedCategory}</span>
          </nav>

          {/* Floating Cart Button matching mockup */}
          <button
            onClick={openCart}
            aria-label="View basket"
            className="w-11 h-11 rounded-full bg-[#c59e74] hover:bg-[#b58c5a] shadow-lg flex items-center justify-center text-white transition-all cursor-pointer relative"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Golden / Amber Champagne Banner matching screenshot */}
        <div className="w-full h-32 sm:h-44 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#ba9163] via-[#d4b084] to-[#f3dfbc] p-6 sm:p-10 flex items-center shadow-sm relative overflow-hidden mb-6">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-white blur-xl pointer-events-none" />
          <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-wide drop-shadow-sm">
            {selectedCategory}
          </h1>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          <button
            onClick={() => {
              setSelectedCategory("ALL");
              clearFilters();
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase whitespace-nowrap transition-all ${
              selectedCategory === "ALL"
                ? "bg-neutral-900 text-white shadow-sm"
                : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400"
            }`}
          >
            ALL DRINKS
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.name);
                clearFilters();
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase whitespace-nowrap transition-all ${
                selectedCategory.toUpperCase() === cat.name.toUpperCase()
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-sm mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${selectedCategory} drinks, brands...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-neutral-500 whitespace-nowrap">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-neutral-50 border border-neutral-200 rounded-xl px-2.5 py-2 text-xs font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="low_high">Price: Low to High</option>
                <option value="high_low">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
            <span className="text-xs text-neutral-400 font-medium whitespace-nowrap">
              {filteredProducts.length} items
            </span>
          </div>
        </div>

        {/* Main Content Area: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Filter (matching user's screenshot) */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Filter Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h2 className="text-base font-bold text-neutral-800">
                Filter: <span className="uppercase text-[#b58c5a]">{selectedCategory}</span>
              </h2>
              {(selectedBrands.length > 0 || selectedSizes.length > 0 || minPrice > 0 || maxPrice < 200000 || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Brands Accordion */}
            <div className="border-b border-neutral-200 pb-5">
              <button
                onClick={() => setBrandsOpen(!brandsOpen)}
                className="w-full flex items-center justify-between text-sm font-semibold text-neutral-700 py-1 cursor-pointer hover:text-black"
              >
                <span>Brands</span>
                {brandsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {brandsOpen && (
                <div className="mt-3 space-y-2">
                  {availableBrands.length > 6 && (
                    <input
                      type="text"
                      placeholder="Search brands..."
                      value={brandSearch}
                      onChange={(e) => setBrandSearch(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg mb-2 focus:outline-none"
                    />
                  )}
                  <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1 text-xs">
                    {availableBrands
                      .filter((b) => b.toLowerCase().includes(brandSearch.toLowerCase()))
                      .map((brand) => (
                        <label
                          key={brand}
                          className="flex items-center gap-2 cursor-pointer hover:text-black text-neutral-600"
                        >
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="rounded border-neutral-300 text-[#b58c5a] focus:ring-[#b58c5a]"
                          />
                          <span className="truncate">{brand}</span>
                        </label>
                      ))}
                    {availableBrands.length === 0 && (
                      <span className="text-neutral-400 italic">No specific brands</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Attributes (Size / Volume) Accordion */}
            <div className="border-b border-neutral-200 pb-5">
              <button
                onClick={() => setAttributesOpen(!attributesOpen)}
                className="w-full flex items-center justify-between text-sm font-semibold text-neutral-700 py-1 cursor-pointer hover:text-black"
              >
                <span>Attributes</span>
                {attributesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {attributesOpen && (
                <div className="mt-3 space-y-1.5 text-xs">
                  {availableSizes.map((size) => (
                    <label
                      key={size}
                      className="flex items-center gap-2 cursor-pointer hover:text-black text-neutral-600"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={() => toggleSize(size)}
                        className="rounded border-neutral-300 text-[#b58c5a] focus:ring-[#b58c5a]"
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Filter By Price Accordion */}
            <div className="border-b border-neutral-200 pb-5">
              <button
                onClick={() => setPriceOpen(!priceOpen)}
                className="w-full flex items-center justify-between text-sm font-semibold text-neutral-700 py-1 cursor-pointer hover:text-black"
              >
                <span>Filter By Price</span>
                {priceOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {priceOpen && (
                <div className="mt-4 space-y-4">
                  {/* Gold slider track matching screenshot */}
                  <div className="relative pt-1">
                    <input
                      type="range"
                      min={0}
                      max={200000}
                      step={500}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-[#b58c5a] cursor-pointer"
                    />
                  </div>

                  {/* Min / Max Input Boxes */}
                  <div className="flex items-center gap-2 text-xs">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-20 px-2.5 py-1.5 border border-neutral-200 rounded-lg bg-white text-center focus:outline-none"
                    />
                    <span className="text-neutral-400">to</span>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-24 px-2.5 py-1.5 border border-neutral-200 rounded-lg bg-white text-center focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200">
                <p className="text-base font-semibold text-neutral-700 mb-2">No drinks match this filter</p>
                <p className="text-xs text-neutral-400 mb-6">
                  Try adjusting the price slider or resetting brand selections.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-neutral-900 text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredProducts.map((product) => {
                  const isAdded = addedItem === product.id;

                  return (
                    <div
                      key={product.id}
                      className="bg-[#fffdfa] hover:bg-white rounded-2xl border border-neutral-200/90 p-3 sm:p-4 flex flex-col justify-between group hover:shadow-xl hover:border-[#dfbe95] transition-all duration-300 relative"
                    >
                      {/* Bottle Photo Container */}
                      <div className="relative w-full h-44 sm:h-52 bg-white rounded-xl p-3 flex items-center justify-center overflow-hidden mb-3">
                        <Image
                          src={product.image || "https://thewhiskyshop.co.ke/api/open/images/1_1760964123096_1112.jpg"}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-contain p-1 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                        />
                      </div>

                      {/* Product Name & Details */}
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-medium">
                          {product.brand || product.category}
                        </span>
                        <h3 className="text-xs sm:text-[13px] font-semibold text-neutral-800 line-clamp-2 leading-snug mt-0.5 mb-2">
                          {product.name}
                        </h3>

                        {/* Branch in-stock indicator */}
                        {product.availableBranches && product.availableBranches.length > 0 && (
                          <div className="flex items-center gap-1 text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 mb-2.5">
                            <Store className="w-2.5 h-2.5" />
                            <span className="truncate">In Stock: {product.availableBranches[0]}</span>
                          </div>
                        )}
                      </div>

                      {/* Price & Add to Cart button */}
                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[9px] text-neutral-400 block -mb-1">PRICE</span>
                          <span className="text-sm sm:text-base font-extrabold text-neutral-900">
                            Ksh {product.price.toLocaleString()}
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`p-2 sm:px-3 sm:py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            isAdded
                              ? "bg-emerald-600 text-white"
                              : "bg-[#c59e74] text-white hover:bg-[#b58c5a] shadow-sm active:scale-95"
                          }`}
                          title="Add to Basket"
                        >
                          {isAdded ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <span className="hidden sm:inline">Add</span>
                          )}
                          {!isAdded && <ShoppingCart className="w-3.5 h-3.5 sm:hidden" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading The Whisky Shop Catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
