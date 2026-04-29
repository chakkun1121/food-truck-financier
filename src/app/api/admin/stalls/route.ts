import { serverFirebase } from "@/firebase/server";
import { NextResponse } from "next/server";
import { addStall } from "../../../../../scripts/lib/addStall";
import { deleteStall } from "../../../../../scripts/lib/deleteStall";
import { editStall } from "../../../../../scripts/lib/editStall";

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { stallId, name, prefix } = body;

    const result = await addStall({ stallId, name, prefix });
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "店舗の追加に失敗しました" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { stallId, name, prefix } = body;

    const result = await editStall({ stallId, name, prefix });
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "店舗の更新に失敗しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const stallId = url.searchParams.get("stallId");

    if (!stallId) {
      return NextResponse.json(
        { success: false, error: "stallIdが必要です" },
        { status: 400 }
      );
    }

    const result = await deleteStall({ stallId });
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "店舗の削除に失敗しました" },
      { status: 500 }
    );
  }
}
