import { serverFirebase } from "@/firebase/server";

type SetAdminParams = {
  uid: string;
  isAdmin: boolean;
};

type SetAdminResult = {
  success: boolean;
  error?: string;
};

export async function setAdminRole({
  uid,
  isAdmin
}: SetAdminParams): Promise<SetAdminResult> {
  if (!uid) {
    return { success: false, error: "UID is required" };
  }

  const auth = serverFirebase.auth;
  const db = serverFirebase.db;

  try {
    // Custom Claim を付与・削除
    if (isAdmin) {
      await auth.setCustomUserClaims(uid, { admin: true });
    } else {
      await auth.setCustomUserClaims(uid, { admin: false });
    }

    // セッションを強制リフレッシュさせる（既にログイン中だった場合のため）
    await auth.revokeRefreshTokens(uid);

    // `stallId` を「admin」として登録（所属先を管理者とするため）
    if (isAdmin) {
      await db.ref(`users/${uid}/stallId`).set("admin");
    } else {
      // 管理者から外した場合は所属を未設定にするなど（今回は一旦消す）
      await db.ref(`users/${uid}/stallId`).remove();
    }

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Failed to set admin role: ${errorMessage}`
    };
  }
}
