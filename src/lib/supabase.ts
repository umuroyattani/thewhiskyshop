import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://rpwmkudwlesujnpjwpjz.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_k5fRhH8N_V6LHBnpPgpmqQ_3NdF_fnP";

// Typed Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface StockInventory {
  id?: string;
  product_id: string;
  product_name: string;
  category: string;
  branch_name: string; // e.g. "Westlands", "CBD", "Karen", "Kilimani"
  stock_count: number;
  low_stock_threshold: number;
  price: number;
  currency: string;
  updated_at?: string;
}

export interface CustomerOrder {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_address: string;
  city_estate: string;
  coordinates?: { lat: number; lng: number };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  delivery_fee: number;
  total_amount: number;
  status: "pending" | "confirmed" | "preparing" | "in_transit" | "delivered" | "cancelled";
  payment_method: "mpesa_express" | "card" | "cash_on_delivery";
  assigned_rider_id?: string;
  assigned_rider_name?: string;
  rider_phone?: string;
  created_at: string;
  updated_at?: string;
}

export interface RiderLocationPing {
  id?: string;
  rider_id: string;
  rider_name: string;
  rider_phone?: string;
  order_id?: string;
  latitude: number;
  longitude: number;
  heading?: number;
  speed_kmh?: number;
  battery_level?: number;
  timestamp: string;
}

// Helpers for Order Creation & Stock Tracking
export async function createSupabaseOrder(order: CustomerOrder) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .insert([order])
      .select()
      .single();

    if (error) {
      console.warn("Supabase insert order warning (table may need schema creation):", error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.warn("Supabase order exception:", message);
    return { success: false, error: message };
  }
}

export async function logRiderLocation(ping: RiderLocationPing) {
  try {
    const { data, error } = await supabase
      .from("rider_locations")
      .insert([ping]);

    if (error) {
      console.warn("Supabase rider location log warning:", error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}

export async function getLiveRiderLocation(riderId: string) {
  try {
    const { data, error } = await supabase
      .from("rider_locations")
      .select("*")
      .eq("rider_id", riderId)
      .order("timestamp", { ascending: false })
      .limit(1)
      .single();

    if (error) return null;
    return data as RiderLocationPing;
  } catch {
    return null;
  }
}
