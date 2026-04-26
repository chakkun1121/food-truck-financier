import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Bun環境下であれば .env の環境変数は自動的に読み込まれます

function initFirebase() {
  if (!getApps() || getApps().length === 0) {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      console.error(
        "エラー: FIREBASE_SERVICE_ACCOUNT_KEY が環境変数に設定されていません。"
      );
      process.exit(1);
    }

    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

    initializeApp({
      credential: cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    });
  }
}

async function main() {
  // コマンド引数からメールアドレスを取得
  const args = process.argv.slice(2);
  const email = args[0];

  if (!email) {
    console.error(
      "使用方法: bun run scripts/commands/setAdmin.ts <管理者にするユーザーのメールアドレス>"
    );
    console.error("例: bun run scripts/commands/setAdmin.ts admin@example.com");
    process.exit(1);
  }

  // Firebase Adminの初期化
  initFirebase();
  const auth = getAuth();

  try {
    // メールアドレスからユーザーを検索
    console.log(`ユーザー (${email}) を検索しています...`);
    const user = await auth.getUserByEmail(email);

    // Custom Claim (admin: true) を付与
    await auth.setCustomUserClaims(user.uid, { admin: true });

    console.log(
      `✅ 成功: ${email} (UID: ${user.uid}) に管理者権限(admin: true)を付与しました！`
    );

    // セッションを強制リフレッシュさせる（既にログイン中だった場合のため）
    await auth.revokeRefreshTokens(user.uid);
    console.log(
      "※設定を反映させるため、このユーザーの既存のログインセッションをリセットしました。再度管理コンソールからログインしてください。"
    );
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      console.error(
        `エラー: ${email} に一致するFirebaseユーザーが見つかりません。先にFirebase Consoleやアプリ側でユーザーを作成してください。`
      );
    } else {
      console.error("エラー: 管理者権限の付与に失敗しました", error);
    }
    process.exit(1);
  }
}

main();
