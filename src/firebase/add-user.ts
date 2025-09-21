import { serverFirebase } from "@/firebase/server";

interface CreateUserParams {
  email: string;
  password: string;
  stallId: string;
}

interface CreateUserResult {
  success: boolean;
  uid?: string;
  error?: string;
}

async function addUser({
  email,
  password,
  stallId
}: CreateUserParams): Promise<CreateUserResult> {
  const auth = serverFirebase.auth;
  const db = serverFirebase.db;

  const stalls = await db
    .ref("stalls")
    .once("value")
    .then(snapshot => snapshot.val());

  try {
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

    return {
      success: true,
      uid: userRecord.uid
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating new user:", errorMessage);
    return {
      success: false,
      error: errorMessage
    };
  }
}

// メイン実行部分
async function main(): Promise<void> {
  try {
    const result = await addUser({
      email: "user@example.com",
      password: "ThisIsMyPassword",
      stallId: "stall3"
    });

    if (!result.success) {
      throw new Error(result.error);
    }

    console.log("User created successfully with UID:", result.uid);
  } catch (error) {
    console.error("Failed to create user:", error);
    process.exit(1);
  }
}

// スクリプトとして直接実行された場合のみmainを実行
if (require.main === module) {
  main();
}
