import * as fs from "fs";
import * as path from "path";
import { deleteUser } from "../lib/deleteUser";

async function main() {
  try {
    // コマンドライン引数の処理
    const args = process.argv.slice(2);

    // 引数が不足している場合はエラーメッセージを表示して終了
    if (args.length < 1) {
      console.error("Usage: ts-node deleteUsers.ts <path_to_tsv>");
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

    // ファイルの拡張子チェック（警告のみ）
    if (!tsvPath.endsWith(".tsv")) {
      console.warn("Warning: File does not have .tsv extension");
    }

    console.log(`Reading TSV file: ${tsvPath}`);

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

    console.log("Starting user deletion process...");

    try {
      const result = await deleteUser(tsvContent);

      if (result.success) {
        console.log(`✓ ${result.results?.length} users deleted successfully:`);
        result.results?.forEach(({ email }: { email: string }) => {
          console.log(`  - ${email}`);
        });
      } else {
        console.error(`✗ User to delete users: ${result.error}`);
        process.exit(1);
      }
    } catch (error) {
      console.error(`✗ Failed to delete user:`, error);
      process.exit(1);
    }

    console.log("User deletion completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error processing TSV file:", error);
    process.exit(1);
  }
}

// スクリプトが直接実行された場合にmain関数を呼び出し
if (require.main === module) {
  main();
}
