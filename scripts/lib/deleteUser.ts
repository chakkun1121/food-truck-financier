import { serverFirebase } from "@/firebase/server";

type DeleteUserParams = {
  email: string;
};
type DeleteUserResult = {
  success: boolean;
  error?: string;
};

export async function deleteUser({
  email
}: DeleteUserParams): Promise<DeleteUserResult> {
  const auth = serverFirebase.auth;
  const db = serverFirebase.db;

  // 入力値の基本的なバリデーション
  if (!email) {
    return {
      success: false,
      error: "Email is required"
    };
  }

  // emailの形式チェック
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: "Invalid email format"
    };
  }

  // メールアドレスからユーザーを取得
  let userRecord;
  try {
    userRecord = await auth.getUserByEmail(email);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "auth/user-not-found"
    ) {
      return {
        success: false,
        error: `User with email ${email} not found`
      };
    }
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Failed to get user ${email}: ${errorMessage}`
    };
  }
  const uid = userRecord.uid;

  try {
    // ユーザーを削除
    await auth.deleteUser(uid);

    // ユーザーデータをデータベースから削除
    await db.ref(`users/${uid}`).remove();

    return {
      success: true
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Failed to delete user ${email}: ${errorMessage}`
    };
  }
}
