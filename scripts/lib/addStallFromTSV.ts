import { addStall } from "./addStall";

type AddStallResult = {
  success: boolean;
  error?: string;
  results?: { stallId: string; name: string; prefix: string }[];
};

export async function addStallFromTSV(tsv: string): Promise<AddStallResult> {
  try {
    const lines = tsv.trim().split("\n");
    const results: { stallId: string; name: string; prefix: string }[] = [];

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

      const stallId = columns[0].trim();
      const name = columns[1].trim();
      const prefix = columns[2].trim();

      const result = await addStall({ stallId, name, prefix });

      if (!result.success) {
        throw new Error(`Line ${i + 1} (${line}): ${result.error}`);
      }

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
