import { serverFirebase } from "@/firebase/server";
import { CommodityType } from "@/types/stallInfo";

export type EditCommodityParams = {
  stallId: string;
  commodityId: string;
  name?: string;
  stock?: number;
  category?: string;
};

export type EditCommodityResult = {
  success: boolean;
  error?: string;
};

export async function editCommodity({
  stallId,
  commodityId,
  name,
  stock,
  category
}: EditCommodityParams): Promise<EditCommodityResult> {
  if (!stallId || !commodityId) {
    return {
      success: false,
      error: "stallId and commodityId are required."
    };
  }

  const trimmedStallId = stallId.trim();
  const trimmedCommodityId = commodityId.trim();

  // Validate inputs if provided
  if (name !== undefined && name.trim().length === 0) {
    return {
      success: false,
      error: "Name cannot be empty."
    };
  }
  if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
    return {
      success: false,
      error: "Stock must be a valid non-negative number."
    };
  }

  const db = serverFirebase.db;

  try {
    const commodityRef = db.ref(
      `stalls/${trimmedStallId}/commodities/${trimmedCommodityId}`
    );
    const commoditySnapshot = await commodityRef.once("value");

    if (!commoditySnapshot.exists()) {
      return {
        success: false,
        error: `Commodity with ID "${trimmedCommodityId}" does not exist.`
      };
    }

    const currentData = commoditySnapshot.val() as CommodityType;

    const updateData: Partial<CommodityType> = {};
    if (name !== undefined) updateData.name = name.trim();
    if (stock !== undefined) updateData.stock = stock;
    if (category !== undefined) {
      if (category.trim() === "") {
        // We'll treat empty string as removing the category
        updateData.category = null as any;
      } else {
        updateData.category = category.trim();
      }
    }

    // Amount/price and deletion are restricted
    if (Object.keys(updateData).length > 0) {
      await commodityRef.update(updateData);
    }

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Failed to edit commodity (${trimmedCommodityId}): ${errorMessage}`
    };
  }
}
