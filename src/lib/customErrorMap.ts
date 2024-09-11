"use client";
import * as zod from "zod";

/**
 * zodエラーメッセージ（日本語）
 */
const customErrorMap: zod.ZodErrorMap = (issue, ctx) => {
  // zodエラーコードごとにメッセージをカスタマイズする
  switch (issue.code) {
    // 型に誤り
    case zod.ZodIssueCode.invalid_type:
      // undefinedだった場合は未入力判定
      if (issue.received === zod.ZodParsedType.undefined) {
        return { message: "必須項目です" };
      } else {
        return { message: "値に誤りがあります" };
      }

    case zod.ZodIssueCode.too_big:
      if (issue.type == "number") {
        return {
          message: `${issue.maximum.toLocaleString(
            "ja-JP"
          )}以下の数値を入力してください`,
        };
      }
      return { message: `${issue.maximum}文字以内で入力してください` };

    case zod.ZodIssueCode.too_small:
      if (issue.type === "array") {
        return {
          message: `${issue.minimum}つ以上チェックしてください`,
        };
      }
      if (issue.type === "number") {
        return { message: `${issue.minimum}以上の数値を入力してください` };
      }
      return { message: `${issue.minimum}文字以上で入力してください` };
  }

  // デフォルトのメッセージを返す
  return { message: ctx.defaultError };
};
zod.setErrorMap(customErrorMap);
