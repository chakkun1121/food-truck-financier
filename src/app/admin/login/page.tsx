"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { clientFirebase } from "@/firebase/client";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        clientFirebase.auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      });

      if (!response.ok) {
        const data = await response.json();
        // 拒否された場合はクライアントからもサインアウト
        await clientFirebase.auth.signOut();
        throw new Error(
          data.error ||
            "管理者権限がありません、またはセッションの作成に失敗しました"
        );
      }

      toast.success("ログインしました");
      router.push("/admin");
    } catch (error: any) {
      console.error(error);
      const { logger } = await import("@/lib/logger");
      const errorId = logger.error(
        "ログインエラー",
        error instanceof Error ? error : new Error(String(error))
      );
      toast.error("ログインに失敗しました", {
        description: `メールアドレスやパスワード、権限の有無を確認してください。\nエラーID: ${errorId}`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.warning("メールアドレスを入力してください", {
        description:
          "上の入力欄にメールアドレスを入れてからクリックしてください"
      });
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(clientFirebase.auth, email);
      toast.success("リセットメールを送信しました", {
        description:
          "届いたメールのリンクから新しいパスワードを設定してください。"
      });
    } catch (error: any) {
      console.error(error);
      toast.error("送信に失敗しました", {
        description: "メールアドレスが正しいか確認してください。"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted/40 flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>管理コンソール ログイン</CardTitle>
          <CardDescription>
            管理者のメールアドレスとパスワードを入力してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "ログイン中..." : "ログイン"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            onClick={handleResetPassword}
            disabled={loading}
            className="text-muted-foreground text-sm"
          >
            パスワードを忘れた場合
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
