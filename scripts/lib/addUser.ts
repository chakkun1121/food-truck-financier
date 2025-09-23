import { serverFirebase } from "@/firebase/server";

type CreateUserResult = {
  success: boolean;
  error?: string;
  results?: { email: string; uid: string; stallId: string }[];
};

export async function addUser(tsv: string): Promise<CreateUserResult> {
  const auth = serverFirebase.auth;
  const db = serverFirebase.db;
  const stalls = await db
    .ref("stalls")
    .once("value")
    .then(snapshot => snapshot.val());

  try {
    const lines = tsv.trim().split("\n");
    const results: CreateUserResult["results"] = [];

    for (const line of lines) {
      const columns = line.split("\t");
      const email = columns[0];
      const password = columns[1];
      const stallId = columns[2];
      // 入力値の基本的なバリデーション
      if (!email || !password || !stallId) {
        throw new Error("必須パラメータが不足しています。");
      }

      if (!stalls || !stalls[stallId]) {
        throw new Error(
          "店舗が見つかりません。店舗の登録を行ってからアカウントの追加を行ってください。"
        );
      }

      const userRecord = await auth.createUser({
        email,
        password
      });

      await db.ref(`users/${userRecord.uid}`).set({ stallId });

      results.push({ email, uid: userRecord.uid, stallId });
    }

    return {
      success: true,
      results
    };
  } catch (error) {
    console.error("Error creating new user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
