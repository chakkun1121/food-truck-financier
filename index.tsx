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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { clientFirebase } from "@/firebase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  id: z.string(),
  password: z.string()
});
const emailDomain = process.env.NEXT_PUBLIC_EMAIL_DOMAIN;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [signInWithEmailAndPassword, user, , error] =
    useSignInWithEmailAndPassword(clientFirebase.auth);

  const router = useRouter();

  // Custom onSubmit 内でリダイレクトを制御するため useEffect での推移は削除
  /* 
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);
  */

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    disabled: isLoading,
    defaultValues: {
      id: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    // 入力値に @ が含まれている場合はそのままメアドとして扱い、そうでない場合はドメインを付与
    const loginId = values.id.includes("@")
      ? values.id
      : `${values.id}@${emailDomain}`;

    const userCredential = await signInWithEmailAndPassword(
      loginId,
      values.password
    );
    if (!userCredential) {
      setIsLoading(false);
      toast("ログインに失敗しました", {
        description: "ID と パスワードを確認してください"
      });
      return;
    }

    // 管理者かどうか確認
    const idTokenResult = await userCredential.user.getIdTokenResult();
    if (idTokenResult.claims.admin) {
      // 管理者セッションCookieを要求
      const idToken = await userCredential.user.getIdToken();
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      });

      if (response.ok) {
        toast.success("管理者としてログインしました");
        router.push("/admin");
        setIsLoading(false);
        return;
      }
    }

    // 一般ユーザーの場合はトップ（レジアプリ）へ
    router.push("/");
    setIsLoading(false);
  };

  const handleResetPassword = async () => {
    const id = form.getValues("id");
    if (!id) {
      toast.warning("IDを入力してください", {
        description: "パスワードをリセットしたいIDを入力してください。"
      });
      return;
    }

    const isGeneralAccount =
      !id.includes("@") || id.endsWith(`@${emailDomain}`);

    if (isGeneralAccount) {
      setIsResetDialogOpen(true);
      return;
    }

    // 管理者アカウントとして処理
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(clientFirebase.auth, id);
      toast.success("パスワードリセットメールを送信しました", {
        description:
          "届いたメールのリンクから新しいパスワードを設定してください。"
      });
    } catch (error: any) {
      console.error(error);
      toast.error("送信に失敗しました", {
        description: "メールアドレスが正しいか確認してください。"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <Card className="mx-auto w-96">
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              IDとパスワードでログインしてください
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input placeholder="yatai-1" {...field} />
                    </FormControl>
                    <FormDescription>
                      屋台に振り分けられたIDを入力してください
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="パスワードを入力"
                        type="password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      IDに対応するパスワードを入力してください
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && <p className="text-red-500">{error.message}</p>}
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button.Loading
              className="w-full"
              type="submit"
              loading={isLoading}
            >
              ログイン
            </Button.Loading>
            <Button
              variant="link"
              type="button"
              onClick={handleResetPassword}
              disabled={isLoading}
              className="text-muted-foreground text-sm"
            >
              パスワードを忘れた場合
            </Button>
          </CardFooter>
        </Card>
      </form>

      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>パスワードリセットについて</DialogTitle>
            <DialogDescription>
              屋台用（一般）アカウントのパスワードリセットは、こちらからは行えません。
              システム管理者にお問い合わせいただき、パスワードの変更を依頼してください。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsResetDialogOpen(false)}>閉じる</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
