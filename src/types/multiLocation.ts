export interface BranchLocation {
  id: string;
  name: string;
  code: string;
  city: string;
  neighborhood: string;
  address: string;
  phone: string;
  type: "flagship" | "store" | "express_hub" | "regional_depot";
  isFulfillmentCenter: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  deliveryRadiusKm: number;
  openingHours: string;
}

export interface InventoryItem {
  sku: string;
  name: string;
  category: string;
  subCategory?: string;
  region: string;
  abv: string;
  volume: string;
  price: number;
  barcode: string;
  image: string;
  tag?: string;
  tastingNotes: string[];
  stockByBranch: Record<string, number>; // locationId -> onHandQuantity
  lowStockThreshold: number;
}

export type OrderStatus =
  | "received"
  | "inventory_reserved"
  | "picked_packed"
  | "dispatched"
  | "in_transit"
  | "out_for_delivery"
  | "delivered";

export interface TrackingCheckpoint {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  locationName: string;
  completed: boolean;
}

export interface LiveCourierTelemetry {
  driverName: string;
  vehicle: string;
  plateNumber: string;
  phone: string;
  currentLat: number;
  currentLng: number;
  speedKmH: number;
  packageTempC: number;
  batteryPct: number;
  etaMinutes: number;
}

export interface TrackedOrder {
  orderId: string;
  trackingNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryNeighborhood: string;
  originBranchId: string;
  destinationCoordinates: {
    lat: number;
    lng: number;
  };
  items: {
    sku: string;
    name: string;
    quantity: number;
    unitPrice: number;
    image: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  fulfillmentType: "express_delivery" | "standard_delivery" | "store_pickup";
  currentStatus: OrderStatus;
  courier: LiveCourierTelemetry;
  timeline: TrackingCheckpoint[];
}

export interface StockTransferRequest {
  id: string;
  transferNumber: string;
  sku: string;
  productName: string;
  sourceBranchId: string;
  destinationBranchId: string;
  quantity: number;
  status: "pending_dispatch" | "in_transit" | "received";
  initiatedAt: string;
  eta: string;
}
