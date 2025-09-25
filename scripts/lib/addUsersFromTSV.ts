import { addUser } from "./addUser";

type CreateUserResult = {
  success: boolean;
  error?: string;
  results?: { email: string; uid: string; stallId: string }[];
};

export async function addUsersFromTSV(tsv: string): Promise<CreateUserResult> {
  try {
    const lines = tsv.trim().split("\n");

    // 空のTSVファイルをチェック
    if (lines.length === 0 || (lines.length === 1 && !lines[0].trim())) {
      return {
        success: false,
        error: "TSV file is empty."
      };
    }

    const results: CreateUserResult["results"] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // 空行をスキップ
      if (!line) {
        continue;
      }

      const columns = line.split("\t");
      if (columns.length < 3) {
        throw new Error(
          `Line ${i + 1} (${line}): TSV format is invalid. It must contain 3 columns.`
        );
      }

      const email = columns[0].trim();
      const password = columns[1].trim();
      const stallId = columns[2].trim();

      if (!email || !password || !stallId) {
        throw new Error(
          `Line ${i + 1} (${line}): email, password, and stallId are required.`
        );
      }

      const result = await addUser({ email, password, stallId });
      if (result.success && result.uid) {
        results.push({ email, uid: result.uid, stallId });
      } else {
        return {
          success: false,
          error: `Line ${i + 1} (${line}): ${result.error}`
        };
      }
    }

    return {
      success: true,
      results
    };
  } catch (error) {
    console.error("Error adding user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
