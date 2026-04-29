import { serverFirebase } from "@/firebase/server";

type EditUserParams = {
  uid: string;
  email?: string;
  password?: string;
  roleType: "admin" | "stall" | "none";
  stallId?: string;
};

type EditUserResult = {
  success: boolean;
  error?: string;
};

export async function editUser({
  uid,
  email,
  password,
  roleType,
  stallId
}: EditUserParams): Promise<EditUserResult> {
  const auth = serverFirebase.auth;
  const db = serverFirebase.db;

  if (!uid) {
    return {
      success: false,
      error: "UID is required"
    };
  }

  try {
    const updateData: any = {};

    if (email) {
      let trimmedEmail = email.trim();
      if (trimmedEmail && !trimmedEmail.includes("@")) {
        const emailDomain =
          process.env.NEXT_PUBLIC_EMAIL_DOMAIN || "food-truck.local";
        trimmedEmail = `${trimmedEmail}@${emailDomain}`;
      }
      updateData.email = trimmedEmail;
    }

    if (password) {
      const trimmedPassword = password.trim();
      if (trimmedPassword.length > 0 && trimmedPassword.length < 6) {
        return {
          success: false,
          error: "Password must be at least 6 characters long."
        };
      } else if (trimmedPassword.length >= 6) {
        updateData.password = trimmedPassword;
      }
    }

    // ユーザー情報の更新 (Email or Password)
    if (Object.keys(updateData).length > 0) {
      await auth.updateUser(uid, updateData);
    }

    // 権限と所属の更新
    if (roleType === "admin") {
      await auth.setCustomUserClaims(uid, { admin: true });
      await db.ref(`users/${uid}/stallId`).set("admin");
    } else {
      await auth.setCustomUserClaims(uid, { admin: false });

      if (roleType === "stall" && stallId) {
        const stalls = await db
          .ref("stalls")
          .once("value")
          .then(snapshot => snapshot.val());

        if (!stalls || !stalls[stallId]) {
          return {
            success: false,
            error: `Stall with ID "${stallId}" does not exist.`
          };
        }
        await db.ref(`users/${uid}/stallId`).set(stallId);
      } else {
        // none (未設定)
        await db.ref(`users/${uid}/stallId`).remove();
      }
    }

    // 変更即座に反映させるためセッションのリセット
    await auth.revokeRefreshTokens(uid);

    return {
      success: true
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Failed to update user: ${errorMessage}`
    };
  }
}
