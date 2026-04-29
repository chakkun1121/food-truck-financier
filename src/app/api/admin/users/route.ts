import { serverFirebase } from "@/firebase/server";
import { NextResponse } from "next/server";
import { addUser } from "../../../../../scripts/lib/addUser";
import { deleteUser } from "../../../../../scripts/lib/deleteUser";
import { editUser } from "../../../../../scripts/lib/editUser";

export async function GET() {
  try {
    const auth = serverFirebase.auth;
    const db = serverFirebase.db;

    const listUsersResult = await auth.listUsers();

    // ユーザー設定情報の取得
    const usersSnapshot = await db.ref("users").once("value");
    const usersData = usersSnapshot.val() || {};

    // 店舗情報の取得
    const stallsSnapshot = await db.ref("stalls").once("value");
    const stallsData = stallsSnapshot.val() || {};

    const users = listUsersResult.users.map(user => {
      const dbUser = usersData[user.uid] || {};
      const stallId = dbUser.stallId || null;
      let stallName = stallId
        ? stallsData[stallId]?.name || "不明な店舗"
        : null;
      if (stallId === "admin") stallName = "管理者";

      return {
        uid: user.uid,
        email: user.email,
        stallId,
        stallName,
        isAdmin: !!user.customClaims?.admin
      };
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("List users error:", error);
    return NextResponse.json(
      { success: false, error: "ユーザー一覧の取得に失敗しました" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, stallId } = body;

    const result = await addUser({ email, password, stallId });
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, uid: result.uid });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "ユーザー追加に失敗しました" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { uid, email, password, roleType, stallId } = body;

    if (!uid) {
      return NextResponse.json(
        { success: false, error: "UIDが必要です" },
        { status: 400 }
      );
    }

    const result = await editUser({ uid, email, password, roleType, stallId });
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "ユーザーの更新に失敗しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Emailが必要です" },
        { status: 400 }
      );
    }

    // 接続状態の確認
    const auth = serverFirebase.auth;
    const db = serverFirebase.db;
    const userRecord = await auth.getUserByEmail(email);
    const userSnapshot = await db.ref(`users/${userRecord.uid}`).once("value");
    const userData = userSnapshot.val();

    if (userData && userData.stallId) {
      return NextResponse.json(
        {
          success: false,
          error: "誤操作防止のため、先に店舗から接続を切ってください"
        },
        { status: 400 }
      );
    }

    const result = await deleteUser({ email });
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { success: false, error: "ユーザーの削除に失敗しました" },
      { status: 500 }
    );
  }
}
