"use client";

import React, { createContext, useContext, useState } from "react";
import { Product } from "@/data/catalog";
import { InventoryItem } from "@/types/multiLocation";

export interface CartItem {
  id: string;
  sku?: string;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
  stockByBranch?: Record<string, number>;
  tastingNotes?: string[];
  abv?: string;
  volume?: string;
}

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product | InventoryItem | CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product: Product | InventoryItem | CartItem) => {
    const id =
      "sku" in product && product.sku
        ? product.sku
        : "id" in product
        ? product.id
        : (product as unknown as CartItem).name;
    const name = product.name;
    const price = product.price;
    const image = product.image;
    const category = product.category;
    const stockByBranch = "stockByBranch" in product ? product.stockByBranch : undefined;
    const sku = "sku" in product ? product.sku : undefined;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id,
          sku,
          name,
          category,
          price,
          image,
          quantity: 1,
          stockByBranch,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
