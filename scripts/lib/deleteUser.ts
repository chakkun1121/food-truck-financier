import { serverFirebase } from "@/firebase/server";

type DeleteUserResult = {
  success: boolean;
  error?: string;
  results?: { email: string }[];
};

export async function deleteUser(tsv: string): Promise<DeleteUserResult> {
  const auth = serverFirebase.auth;
  const db = serverFirebase.db;

  try {
    const lines = tsv.trim().split("\n");
    const results: DeleteUserResult["results"] = [];

    for (const line of lines) {
      const columns = line.split("\t");
      const email = columns[0];
      // 入力値の基本的なバリデーション
      if (!email) {
        throw new Error("必須パラメータが不足しています。");
      }

      // メールアドレスからユーザーを取得
      const userRecord = await auth.getUserByEmail(email);
      const uid = userRecord.uid;

      // ユーザーを削除
      await auth.deleteUser(uid);

      // ユーザーデータをデータベースから削除
      await db.ref(`users/${uid}`).remove();
      results.push({ email });
    }
    return {
      success: true,
      results
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
