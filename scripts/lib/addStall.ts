import { serverFirebase } from "@/firebase/server";

type AddStallParams = {
  stallId: string;
  name: string;
  prefix: string;
};
type AddStallResult = {
  success: boolean;
  error?: string;
};

export async function addStall({
  stallId,
  name,
  prefix
}: AddStallParams): Promise<AddStallResult> {
  // 入力値の空チェックを追加
  if (!stallId || !name || !prefix) {
    return {
      success: false,
      error: "stallId, name, and prefix are required."
    };
  }

  // stallIdとnameの前後の空白を除去
  const trimmedStallId = stallId.trim();
  const trimmedName = name.trim();
  const trimmedPrefix = prefix.trim();

  // prefixの形式を確認（大文字アルファベット1文字）
  const prefixRegex = /^[A-Z]$/;
  if (!prefixRegex.test(trimmedPrefix)) {
    return {
      success: false,
      error: "Prefix should be a single uppercase letter (A-Z)."
    };
  }
  // stallIdの形式チェック（英数字とハイフンのみ許可）
  const stallIdRegex = /^[a-zA-Z0-9-_]+$/;
  if (!stallIdRegex.test(trimmedStallId)) {
    return {
      success: false,
      error:
        "Stall ID should only contain alphanumeric characters, hyphens, or underscores."
    };
  }
  // nameの長さチェック
  if (trimmedName.length === 0) {
    return {
      success: false,
      error: "Name cannot be empty."
    };
  }
  if (trimmedName.length > 50) {
    return {
      success: false,
      error: "Name must be 50 characters or less."
    };
  }

  const db = serverFirebase.db;

  const existingStalls =
    (await db
      .ref("stalls")
      .once("value")
      .then(snapshot => snapshot.val())) || {};

  // すでに同じstallIdが存在するか確認
  if (existingStalls && existingStalls[trimmedStallId]) {
    return {
      success: false,
      error: `Stall with ID "${trimmedStallId}" already exists.`
    };
  }

  // prefixの一意性を確認
  if (existingStalls) {
    for (const key in existingStalls) {
      if (existingStalls[key]?.prefix === trimmedPrefix) {
        return {
          success: false,
          error: `Stall with prefix "${trimmedPrefix}" already exists.`
        };
      }
    }
  }
  
  try {
    // 店舗情報をデータベースに追加
    await db.ref(`stalls/${trimmedStallId}`).set({
      name: trimmedName,
      prefix: trimmedPrefix
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Failed to add stall (${trimmedStallId}): ${errorMessage}`
    };
  }

  return {
    success: true
  };
}
