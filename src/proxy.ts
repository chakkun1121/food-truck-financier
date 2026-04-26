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

  // Firebaseの管理者セッションCookieを取得
  const adminSession = req.cookies.get("admin_session");

  // 1. 管理者セッションのルーティング
  if (adminSession) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.next(); // 管理者画面のアクセスを許可
    }

    // 一般向けページにアクセスした場合（/user等以外）は /admin に誘導
    if (
      pathname !== "/user" &&
      pathname !== "/login" &&
      pathname !== "/logout"
    ) {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } else {
    // 管理者セッションが無い場合、/adminへのアクセスはログインへ
    if (pathname.startsWith("/admin")) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // 2. 開発環境の Basic 認証 スキップ
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  // 3. Basic 認証 (通常ユーザーが初回到達時にブラウザから送信する)
  const basicAuth = req.headers.get("authorization");
  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, password] = atob(authValue).split(":");

    if (user === process.env.USERNAME && password === process.env.PASSWORD) {
      return NextResponse.next();
    }
  }

  // 認証情報がないか間違っている場合はBasic認証のプロンプトを出す
  return new NextResponse("Unauthorized.", {
    status: 401,
    headers: {
      "WWW-authenticate": 'Basic realm="Food Truck Pos"'
    }
  });
}
