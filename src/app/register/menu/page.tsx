"use client";
import Loading from "@/components/ui-element/loading";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/firebase";
import { UUID } from "crypto";
import { ref } from "firebase/database";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
export default function RegisterPage() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [stallInfo, stallInfoLoading, stallInfoError] = useObjectVal<{
    name: string;
    commodities?: {
      [key: UUID]: {
        name: string;
        price: number;
      };
    };
  }>(ref(db, `stalls/${userInfo?.stallId}`));
  console.log(stallInfo?.["commodities"]);
  if (loading || userInfoLoading || stallInfoLoading) return <Loading />;
  if (!user || !stallInfo)
    return (
      <div className="text-center">
        <h2>正しいユーザーでログインするか管理者へお問い合わせください。</h2>
        <Button asChild>
          <Link href="/logout">ログアウト</Link>
        </Button>
      </div>
    );
  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl">メニュー</h2>
        <div className="flex flex-wrap gap-4">
          {stallInfo?.commodities &&
            Object.entries(stallInfo?.commodities).map(([key, value]) => (
              <Card key={key} className="max-w-xs w-full">
                <CardContent className="p-6 flex justify-between">
                  <div>
                    <h3 className="text-xl">{value.name}</h3>
                    <p className="ml-1">¥{value.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      className="rounded-full"
                      variant="outline"
                      size="icon"
                    >
                      <MinusIcon />
                    </Button>
                    <p className="text-lg">0</p>
                    <Button
                      className="rounded-full"
                      variant="outline"
                      size="icon"
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
