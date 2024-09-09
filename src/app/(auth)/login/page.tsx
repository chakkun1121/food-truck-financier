"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});
const emailDomain = process.env.NEXT_PUBLIC_EMAIL_DOMAIN;
export default function LoginPage() {
  const [signInWithEmailAndPassword, user, loginLoading, error] =
    useSignInWithEmailAndPassword(auth);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  if (user) {
    router.push("/");
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    disabled: isLoading,
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const user = await signInWithEmailAndPassword(
      values.email.includes("@")
        ? values.email
        : `${values.email}@${emailDomain}`,
      values.password
    );
    if (!user) {
      setIsLoading(false);
      toast.error("ログインに失敗しました");
      return;
    }
    router.push("/");
    setIsLoading(false);
  }

  return (
    <>
      <h1 className="text-center text-3xl">ログイン</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col p-2 border rounded gap-2 mx-auto max-w-3xl">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              const includeDomain = field.value?.includes("@");
              return (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input
                        className="flex-1"
                        placeholder="username"
                        type="text"
                        autoComplete="username"
                        {...field}
                      />
                      {emailDomain && !includeDomain && (
                        <div className="flex-none">@{emailDomain}</div>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {error && <p className="text-red-500">{error.message}</p>}
          <Button type="submit" disabled={isLoading}>
            ログイン{loginLoading && "中"}
          </Button>
        </form>
      </Form>
    </>
  );
}
