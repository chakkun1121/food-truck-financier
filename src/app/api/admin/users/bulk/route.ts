import { NextResponse } from "next/server";
import { addUsersFromTSV } from "../../../../../../scripts/lib/addUsersFromTSV";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "ファイルがありません" },
        { status: 400 }
      );
    }

    const text = await file.text();
    let tsvContent = text;

    // ".csv" ファイルの場合はカンマをタブに変換 (念のための簡易処理)
    // 注意: パスワードやEmailにカンマが含まれる場合は誤動作するため、TSV利用を推奨します
    if (file.name.endsWith(".csv")) {
      tsvContent = text
        .split("\n")
        .map(line => line.split(",").join("\t"))
        .join("\n");
    }

    const result = await addUsersFromTSV(tsvContent);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, results: result.results });
  } catch (error) {
    console.error("Bulk upload error:", error);
    return NextResponse.json(
      { success: false, error: "ファイルの処理中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
