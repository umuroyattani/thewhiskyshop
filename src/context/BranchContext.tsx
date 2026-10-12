"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BranchLocation } from "@/types/multiLocation";
import { BRANCH_LOCATIONS } from "@/data/multiLocationData";

interface BranchContextType {
  selectedBranch: BranchLocation;
  setSelectedBranchId: (id: string) => void;
  allBranches: BranchLocation[];
  customerLocation: string;
  setCustomerLocation: (loc: string) => void;
  fulfillmentMode: "delivery" | "pickup";
  setFulfillmentMode: (mode: "delivery" | "pickup") => void;
  getBranchStock: (stockByBranch: Record<string, number>, branchId?: string) => number;
  getTotalStock: (stockByBranch: Record<string, number>) => number;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export function BranchProvider({ children }: { children: React.ReactNode }) {
  const [selectedBranchId, setSelectedBranchIdState] = useState<string>("loc-nbo-westlands");
  const [customerLocation, setCustomerLocation] = useState<string>("Westlands, Nairobi");
  const [fulfillmentMode, setFulfillmentMode] = useState<"delivery" | "pickup">("delivery");

  const selectedBranch =
    BRANCH_LOCATIONS.find((b) => b.id === selectedBranchId) || BRANCH_LOCATIONS[0];

  const setSelectedBranchId = (id: string) => {
    setSelectedBranchIdState(id);
  };

  const getBranchStock = (stockByBranch: Record<string, number>, branchId?: string): number => {
    const targetBranch = branchId || selectedBranch.id;
    return stockByBranch[targetBranch] || 0;
  };

  const getTotalStock = (stockByBranch: Record<string, number>): number => {
    return Object.values(stockByBranch).reduce((acc, curr) => acc + curr, 0);
  };

  return (
    <BranchContext.Provider
      value={{
        selectedBranch,
        setSelectedBranchId,
        allBranches: BRANCH_LOCATIONS,
        customerLocation,
        setCustomerLocation,
        fulfillmentMode,
        setFulfillmentMode,
        getBranchStock,
        getTotalStock,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export const useBranch = () => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error("useBranch must be used within a BranchProvider");
  }
  return context;
};
