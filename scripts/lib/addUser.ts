import { serverFirebase } from "@/firebase/server";

type AddUserParams = {
  email: string;
  password: string;
  stallId: string;
};
type AddUserResult = {
  success: boolean;
  error?: string;
  uid?: string;
};

export async function addUser({
  email,
  password,
  stallId
}: AddUserParams): Promise<AddUserResult> {
  // emailとpasswordとstallIdの前後の空白を除去
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();
  const trimmedStallId = stallId.trim();

  // 入力値の空チェックを追加
  if (!trimmedEmail || !trimmedPassword || !trimmedStallId) {
    return {
      success: false,
      error: "email, password, and stallId are required."
    };
  }

  // emailの形式チェック
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return {
      success: false,
      error: "Email format is invalid."
    };
  }

  // passwordの長さチェック
  if (trimmedPassword.length < 6) {
    return {
      success: false,
      error: "Password must be at least 6 characters long."
    };
  }

  const auth = serverFirebase.auth;
  const db = serverFirebase.db;
  const stalls = await db
    .ref("stalls")
    .once("value")
    .then(snapshot => snapshot.val());

  if (!stalls || !stalls[trimmedStallId]) {
    return {
      success: false,
      error: `Stall with ID "${trimmedStallId}" does not exist.`
    };
  }

  // すでに同じemailが存在するか確認
  try {
    await auth.getUserByEmail(trimmedEmail);
    return {
      success: false,
      error: `User with email "${trimmedEmail}" already exists.`
    };
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code !== "auth/user-not-found"
    ) {
      return {
        success: false,
        error: `Error checking user existence: ${"message" in error ? error.message : String(error)}`
      };
    }
  }

  try {
    const userRecord = await auth.createUser({
      email: trimmedEmail,
      password: trimmedPassword
    });
    await db.ref(`users/${userRecord.uid}`).set({ stallId: trimmedStallId });
    return {
      success: true,
      uid: userRecord.uid
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Failed to create user (${trimmedEmail}): ${errorMessage}`
    };
  }
}
