import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * API、静的ファイル、画像等、PWA関連ファイル以外のすべてのリクエストを対象にする
     */
    "/((?!api|_next/static|_next/image|favicon.ico|manifest\\.webmanifest|sw\\.js|workbox-.*|icon-.*).*)"
  ]
};

export default function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // 1. Basic 認証をすべての環境（開発以外）で最初に検証する
  if (process.env.NODE_ENV !== "development") {
    const basicAuth = req.headers.get("authorization");
    let isAuthorized = false;

    if (basicAuth) {
      try {
        const authValue = basicAuth.split(" ")[1];
        const [user, password] = atob(authValue).split(":");
        if (
          user === process.env.USERNAME &&
          password === process.env.PASSWORD
        ) {
          isAuthorized = true;
        }
      } catch (e) {
        // パースエラーの場合は不正な形式として弾く
      }
    }

    if (!isAuthorized) {
      return new NextResponse("Unauthorized.", {
        status: 401,
        headers: {
          "WWW-authenticate": 'Basic realm="Food Truck Pos"'
        }
      });
    }
  }

  // Firebaseの管理者セッションCookieを取得
  const adminSession = req.cookies.get("admin_session")?.value;

  // 2. 管理者セッションのルーティング
  if (adminSession) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.next(); // 管理者画面のアクセスを許可
    }

    if (pathname === "/login") {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }

    // 一般向けページにアクセスした場合（/user等以外）は /admin に誘導
    if (pathname !== "/user" && pathname !== "/logout") {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } else {
    // 3. 管理者セッションが無い場合、/adminへのアクセスはログインへ
    if (pathname.startsWith("/admin")) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
