import * as fs from "fs";
import * as path from "path";
import { addUser } from "../lib/addUser";

async function main() {
  try {
    // コマンドライン引数の処理
    const args = process.argv.slice(2);

    // 引数が不足している場合はエラーメッセージを表示して終了
    if (args.length < 1) {
      console.error("Usage: ts-node addUsers.ts <path_to_tsv>");
      process.exit(1);
    }

    // TSVファイルのパスを取得
    const tsvPath = path.join(__dirname, args[0]);

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
      const result = await addUser(tsvContent);

      if (result.success) {
        console.log(`✓ ${result.results?.length} users added successfully:`);
        result.results?.forEach(
          ({
            email,
            uid,
            stallId
          }: {
            email: string;
            uid: string;
            stallId: string;
          }) => {
            console.log(`  -  ${email}: ${uid}(stallId: ${stallId})`);
          }
        );
      } else {
        console.error(`✗ Failed to add user:`, result.error);
      }
    } catch (error) {
      console.error(`✗ Failed to add user:`, error);
    }

    console.log("User import completed");
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
