import { serverFirebase } from "@/firebase/server";

type AddStallResult = {
  success: boolean;
  error?: string;
  results?: { stallId: string; name: string; prefix: string }[];
};

export async function addStall(tsv: string): Promise<AddStallResult> {
  const db = serverFirebase.db;

  try {
    const lines = tsv.trim().split("\n");
    const results: { stallId: string; name: string; prefix: string }[] = [];

    for (const line of lines) {
      const columns = line.split("\t");
      if (columns.length < 3) {
        throw new Error(
          `行「${line}」：TSVのフォーマットが不正です。3つのカラムを含める必要があります。`
        );
      }
      const stallId = columns[0];
      const name = columns[1];
      const prefix = columns[2];

      const existingStalls =
        (await db
          .ref("stalls")
          .once("value")
          .then(snapshot => snapshot.val())) || {};

      // 入力値の基本的なバリデーション
      if (!stallId || !name || !prefix) {
        throw new Error(`行「${line}」：必須パラメータが不足しています。`);
      }

      // prefixの形式を確認（大文字アルファベット1文字）
      const prefixRegex = /^[A-Z]$/;
      if (!prefixRegex.test(prefix)) {
        throw new Error(
          `行「${line}」：prefixは大文字アルファベット1文字である必要があります。`
        );
      }
      // stallIdの形式チェック（英数字とハイフンのみ許可）
      const stallIdRegex = /^[a-zA-Z0-9-_]+$/;
      if (!stallIdRegex.test(stallId)) {
        throw new Error(
          `行「${line}」: stallIdは英数字、ハイフン、アンダースコアのみ使用できます。`
        );
      }
      // nameの長さチェック
      if (name.length > 50) {
        throw new Error(
          `行「${line}」: 店舗名は50文字以内で入力してください。`
        );
      }

      // すでに同じstallIdが存在するか確認
      if (existingStalls && existingStalls[stallId]) {
        throw new Error(
          `行「${line}」：同じstallId「${stallId}」の店舗がすでに存在します。`
        );
      }

      // prefixの一意性を確認
      if (existingStalls) {
        for (const key in existingStalls) {
          if (existingStalls[key]?.prefix === prefix) {
            throw new Error(
              `行「${line}」：同じprefix「${prefix}」の店舗がすでに存在します。`
            );
          }
        }
      }

      // 店舗情報をデータベースに追加
      await db.ref(`stalls/${stallId}`).set({
        name,
        prefix
      });

      results.push({ stallId, name, prefix });
    }

    return {
      success: true,
      results
    };
  } catch (error) {
    console.error("Error adding stall:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
