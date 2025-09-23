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
    const tsvPath = path.join(__dirname, args[0]);

    // TSVファイルが存在するかチェック
    if (!fs.existsSync(tsvPath)) {
      console.error("userData.tsv file not found");
      process.exit(1);
    }

    // TSVファイルを読み込み
    const tsvContent = fs.readFileSync(tsvPath, "utf-8");

    try {
      const result = await deleteUser(tsvContent);
      
      if (result.success) {
        result.results?.forEach(({ email }: { email: string }) => {
          console.log(`✓ Deleted user: ${email}`);
        });
      }
    } catch (error) {
      console.error(`✗ Failed to delete user: `, error);
    }

    console.log("User deletion completed");
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
