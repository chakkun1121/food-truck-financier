"use client";
import { UserInfo } from "@/types/userInfo";
import { User } from "firebase/auth";

export function generateTickerId(
  prefix: string | undefined,
  userInfo: UserInfo | undefined,
  user: User | null | undefined
): string {
  // userNumberが存在しない場合、メールアドレスの@の前の1文字を使用する
  return `${prefix}-${userInfo?.userNumber ?? user?.email?.split("@")[0].slice(-1)}${("000" + ((userInfo?.lastTicket ?? 0) + 1)).slice(-3)}`;
}
