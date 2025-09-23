import * as fs from "fs";
import * as path from "path";
import { addStall } from "../lib/addStall";

async function main() {
  try {
    // コマンドライン引数の処理
    const args = process.argv.slice(2);

    // 引数が不足している場合はエラーメッセージを表示して終了
    if (args.length < 1) {
      console.error("Usage: ts-node addStalls.ts <path_to_tsv>");
      process.exit(1);
    }

    // TSVファイルのパスを取得
    const tsvPath = path.isAbsolute(args[0])
      ? args[0]
      : path.join(process.cwd(), args[0]);

    // TSVファイルが存在するかチェック
    if (!fs.existsSync(tsvPath)) {
      console.error("TSV file not found:", tsvPath);
      process.exit(1);
    }

    // TSVファイルを読み込み
    let tsvContent: string;
    try {
      tsvContent = fs.readFileSync(tsvPath, "utf-8");
    } catch (error) {
      console.error("Error reading TSV file:", tsvPath);
      console.error(error);
      process.exit(1);
    }

    // TSVファイルが空でないかチェック
    if (!tsvContent.trim()) {
      console.error("TSV file is empty");
      process.exit(1);
    }

    try {
      const result = await addStall(tsvContent);

      if (result.success) {
        console.log(`✓ ${result.results?.length} stalls added successfully:`);
        result.results?.forEach(
          ({
            stallId,
            name,
            prefix
          }: {
            stallId: string;
            name: string;
            prefix: string;
          }) => {
            console.log(` - ${stallId}: ${name} (prefix: ${prefix})`);
          }
        );
      } else {
        console.error(`✗ Failed to add stall:`, result.error);
      }
    } catch (error) {
      console.error(`✗ Failed to add stall:`, error);
    }

    console.log(`Stall import completed`);
    process.exit(0);
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    process.exit(1);
  }
}

// スクリプトが直接実行された場合にmain関数を呼び出し
if (require.main === module) {
  main();
}
