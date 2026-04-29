import { serverFirebase } from "@/firebase/server";
import { CommodityType } from "@/types/stallInfo";
import { uuidv7 } from "uuidv7";

export type AddCommodityParams = {
  stallId: string;
  name: string;
  price: number;
  stock?: number;
  category?: string;
};

export type AddCommodityResult = {
  success: boolean;
  error?: string;
  commodityId?: string;
};

export async function addCommodity({
  stallId,
  name,
  price,
  stock = 0,
  category
}: AddCommodityParams): Promise<AddCommodityResult> {
  if (!stallId || !name) {
    return {
      success: false,
      error: "stallId and name are required."
    };
  }
  if (typeof price !== "number" || price < 0) {
    return {
      success: false,
      error: "Price must be a valid non-negative number."
    };
  }

  const trimmedStallId = stallId.trim();
  const trimmedName = name.trim();
  const commodityId = uuidv7();

  if (trimmedName.length === 0) {
    return {
      success: false,
      error: "Name cannot be empty."
    };
  }

  const db = serverFirebase.db;

  try {
    // Check if stall exists
    const stallRef = db.ref(`stalls/${trimmedStallId}`);
    const stallSnapshot = await stallRef.once("value");
    if (!stallSnapshot.exists()) {
      return {
        success: false,
        error: `Stall with ID "${trimmedStallId}" does not exist.`
      };
    }

    // Add commodity
    const commodityRef = db.ref(
      `stalls/${trimmedStallId}/commodities/${commodityId}`
    );
    const commodityData: CommodityType = {
      name: trimmedName,
      price,
      stock,
      ...(category ? { category: category.trim() } : {})
    };

    await commodityRef.set(commodityData);

    return { success: true, commodityId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Failed to add commodity: ${errorMessage}`
    };
  }
}
