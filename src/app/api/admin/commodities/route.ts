import { serverFirebase } from "@/firebase/server";
import { CommodityType } from "@/types/stallInfo";
import { NextResponse } from "next/server";
import { addCommodity } from "../../../../../scripts/lib/addCommodity";
import { editCommodity } from "../../../../../scripts/lib/editCommodity";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const stallId = url.searchParams.get("stallId");

    const db = serverFirebase.db;

    if (stallId) {
      const snap = await db.ref(`stalls/${stallId}/commodities`).once("value");
      return NextResponse.json({
        success: true,
        commodities: snap.val() || {}
      });
    } else {
      // Get all commodities for all stalls
      const stallsSnap = await db.ref("stalls").once("value");
      const stalls = stallsSnap.val() || {};
      const allCommodities: Record<string, Record<string, CommodityType>> = {};

      for (const [id, data] of Object.entries(stalls) as any) {
        if (data.commodities) {
          allCommodities[id] = data.commodities;
        }
      }

      return NextResponse.json({ success: true, commodities: allCommodities });
    }
  } catch (error) {
    console.error("List commodities error:", error);
    return NextResponse.json(
      { success: false, error: "商品の取得に失敗しました" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { stallId, name, price, stock, category } = body;

    const result = await addCommodity({
      stallId,
      name,
      price,
      stock,
      category
    });
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      commodityId: result.commodityId
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "商品の追加に失敗しました" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { stallId, commodityId, name, stock, category } = body;

    const result = await editCommodity({
      stallId,
      commodityId,
      name,
      stock,
      category
    });
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "商品の更新に失敗しました" },
      { status: 500 }
    );
  }
}
