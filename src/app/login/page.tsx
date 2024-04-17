"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase"; //パスは必要に応じて調節してください
import { useRouter } from "next/navigation"; // ←next/routerではない
import { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loginLoading, error] =
    useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, newUser, loading] =
    useCreateUserWithEmailAndPassword(auth);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  if (user) {
    router.push("/");
  }
  return (
    <>
      <h1 className="text-center text-3xl">ログイン</h1>
      <form className="flex flex-col p-2 border rounded gap-2 mx-auto max-w-3xl">
        <div>
          <Input
            type="text"
            placeholder="email"
            onChange={e => setEmail(e.target.value)}
            readOnly={isLoading}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
            readOnly={isLoading}
          />
        </div>
        <div>{error && <p>{error.message}</p>}</div>
        <Button
          type="submit"
          onClick={async e => {
            e.preventDefault();
            setIsLoading(true);
            await signInWithEmailAndPassword(email, password);
            setIsLoading(false);
          }}
          disabled={isLoading}
        >
          ログイン{loginLoading && "中"}
        </Button>
        <p className="text-center">or</p>
        <Button
          onClick={async e => {
            e.preventDefault();
            setIsLoading(true);
            const user = await createUserWithEmailAndPassword(email, password);
            if (!user) throw new Error("user is null");
            router.push("/");
            setIsLoading(false);
          }}
          disabled={isLoading}
        >
          登録{loading && "中"}
        </Button>
      </form>
    </>
  );
}
