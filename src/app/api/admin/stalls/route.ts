import { NextResponse } from "next/server";
import { serverFirebase } from "@/firebase/server";

export async function GET() {
  try {
    const db = serverFirebase.db;
    const stallsSnapshot = await db.ref("stalls").once("value");
    const stalls = stallsSnapshot.val() || {};

    return NextResponse.json({ success: true, stalls });
  } catch (error) {
    console.error("List stalls error:", error);
    return NextResponse.json(
      { success: false, error: "店舗一覧の取得に失敗しました" },
      { status: 500 }
    );
  }
}
