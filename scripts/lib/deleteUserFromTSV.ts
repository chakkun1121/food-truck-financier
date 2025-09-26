import { deleteUser } from "./deleteUser";

type DeleteUserResult = {
  success: boolean;
  error?: string;
  results?: { email: string }[];
};

export async function deleteUserFromTSV(
  tsv: string
): Promise<DeleteUserResult> {
  try {
    const lines = tsv.trim().split("\n");

    // 空のTSVファイルをチェック
    if (lines.length === 0 || (lines.length === 1 && !lines[0].trim())) {
      return {
        success: false,
        error: "TSV file is empty"
      };
    }

    const results: DeleteUserResult["results"] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // 空行をスキップ
      if (!line) {
        continue;
      }

      const columns = line.split("\t");

      // TSV形式の検証
      if (columns.length < 1 || !columns[0].trim()) {
        return {
          success: false,
          error: `Line ${i + 1} (${line}): Email is required and cannot be empty.`
        };
      }

      const email = columns[0].trim();

      if (!email) {
        return {
          success: false,
          error: `Line ${i + 1} (${line}): Email is required and cannot be empty.`
        };
      }

      const result = await deleteUser({ email });
      if (!result.success) {
        return {
          success: false,
          error: `Line ${i + 1} (${line}): ${result.error}`
        };
      } else {
        results.push({ email });
      }
    }
    return {
      success: true,
      results
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: errorMessage
    };
  }
}
