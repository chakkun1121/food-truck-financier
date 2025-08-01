"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { auth, db } from "@/firebase";
import { ref } from "firebase/database";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import Loading from "./loading";

export default function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [stallName, stallInfoLoading, stallInfoError] = useObjectVal<string>(
    ref(db, `stalls/${userInfo?.stallId}/name`)
  );
  const router = useRouter();
  const [magnification, setMagnification] = useState<number>(0);
  const [enableSound, setEnableSound] = useState(false);

  useEffect(() => {
    const stored = Number(localStorage.getItem("magnification")) || 0;
    setMagnification(stored);
  }, []);
  useEffect(() => {
    const stored = localStorage.getItem("enableSound");
    setEnableSound(stored === "true");
  }, []);

  if (error || userInfoError || stallInfoError) {
    console.error("Error fetching data:", error, userInfoError, stallInfoError);
    return <p className="text-red-500">データの取得に失敗しました</p>;
  }

  return (
    <header className="bg-background bg-opacity-50 fixed inset-x-0 top-0 z-50 flex h-12 w-full items-center justify-between p-2">
      <h1
        className="text-2xl"
        onDoubleClick={() => router.push("/")}
        title="ダブルクリックでトップへ移動"
      >
        FoodTruck Financier
      </h1>
      <div className="flex items-center gap-2">
        {loading || userInfoLoading || stallInfoLoading ? (
          <Loading className="text-start" />
        ) : stallName ? (
          <p>{stallName}</p>
        ) : (
          <p>未所属</p>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Settings />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>設定</DialogTitle>
              <DialogDescription>ここで設定を変更できます</DialogDescription>
            </DialogHeader>
            <Separator />
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p>拡大率</p>
                <Slider
                  value={[magnification]}
                  min={-5}
                  max={5}
                  step={1}
                  onValueChange={value => {
                    const v = value[0];
                    setMagnification(v);
                    localStorage.setItem("magnification", v.toString());
                    const fontSize = v > 0 ? v * 20 + 100 : v * 10 + 100;
                    document.documentElement.style.fontSize = `${fontSize}%`;
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="useSound"
                  checked={enableSound}
                  onCheckedChange={value => {
                    setEnableSound(value);
                    localStorage.setItem(
                      "enableSound",
                      value ? "true" : "false"
                    );
                  }}
                />
                <Label htmlFor="useSound">音を鳴らす機能</Label>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
