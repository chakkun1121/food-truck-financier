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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
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
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await signInWithEmailAndPassword(values.email, values.password);
    router.push("/");
    setIsLoading(false);
  }
  return (
    <>
      <h1 className="text-center text-3xl">ログイン</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col p-2 border rounded gap-2 mx-auto max-w-3xl"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
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
