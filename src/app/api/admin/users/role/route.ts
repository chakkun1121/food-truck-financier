import { NextResponse } from "next/server";
import { setAdminRole } from "../../../../../../scripts/lib/setAdminUser";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { uid, isAdmin } = body;

    if (!uid) {
      return NextResponse.json(
        { success: false, error: "UIDが必要です" },
        { status: 400 }
      );
    }

    const result = await setAdminRole({ uid, isAdmin: !!isAdmin });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Set admin role error:", error);
    return NextResponse.json(
      { success: false, error: "管理者権限の変更に失敗しました" },
      { status: 500 }
    );
  }
}
