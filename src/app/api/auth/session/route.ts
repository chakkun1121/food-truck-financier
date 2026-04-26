import { serverFirebase } from "@/firebase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
    }

    // トークンを検証し、権限をチェック
    const decodedToken = await serverFirebase.auth.verifyIdToken(idToken);

    // Custom Claim で "admin" が付与されているか確認する
    if (decodedToken.admin !== true) {
      console.log(
        `[Admin Login Denied] UID: ${decodedToken.uid} does not have admin claim.`
      );
      return NextResponse.json(
        { error: "管理コンソールにログインする権限がありません。" },
        { status: 403 }
      );
    }

    // 14日間のセッションCookieを作成 (最大値は14日間) でログイン維持
    const expiresIn = 60 * 60 * 24 * 14 * 1000;
    const sessionCookie = await serverFirebase.auth.createSessionCookie(
      idToken,
      {
        expiresIn
      }
    );

    const cookieStore = await cookies();
    cookieStore.set("admin_session", sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax"
    });

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }
}
