import * as z from "zod";
z.config({
  // zodのエラーメッセージを日本語化する
  customError: issue => {
    // zodエラーコードごとにメッセージをカスタマイズする
    switch (issue.code) {
      // 型に誤り
      case "invalid_type":
        // undefinedだった場合は未入力判定
        if (!issue.input) {
          return { message: "必須項目です" };
        }
        return { message: "値に誤りがあります" };

      case "too_big":
        if (issue.type == "number") {
          return {
            message: `${issue.maximum.toLocaleString(
              "ja-JP"
            )}以下の数値を入力してください`
          };
        }
        return { message: `${issue.maximum}文字以内で入力してください` };

      case "too_small":
        if (issue.type === "array") {
          return {
            message: `${issue.minimum}つ以上チェックしてください`
          };
        }
        if (issue.type === "number") {
          return { message: `${issue.minimum}以上の数値を入力してください` };
        }
        return { message: `${issue.minimum}文字以上で入力してください` };
    }

    // デフォルトのメッセージを返す
    return undefined;
  }
});
