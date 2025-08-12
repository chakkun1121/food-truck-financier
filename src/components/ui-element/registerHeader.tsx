"use client";
import Loading from "@/components/ui-element/loading";
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
import { useSoundSetting } from "@/hooks/useSoundSetting";
import { ref } from "firebase/database";
import { Play, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { toast } from "sonner";

export default function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [stallName, stallInfoLoading, stallInfoError] = useObjectVal<string>(
    ref(db, `stalls/${userInfo?.stallId}/name`)
  );
  const router = useRouter();
  const [magnification, setMagnification] = useState<number>(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isSoundEnabled, setSoundEnabled, isSettingLoaded } =
    useSoundSetting();

  useEffect(() => {
    const stored = Number(localStorage.getItem("magnification")) || 1;
    setMagnification(stored);
  }, []);

  useEffect(() => {
    const fontSize = magnification * 100;
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem("magnification", String(magnification));
  }, [magnification]);

  if (error || userInfoError || stallInfoError) {
    console.error("Error fetching data:", error, userInfoError, stallInfoError);
    return <p className="text-red-500">データの取得に失敗しました</p>;
  }
  if (!isSettingLoaded) {
    return <Loading className="text-start" />;
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
                <div className="flex items-center justify-between">
                  <p>拡大率</p>
                  <p>{Math.floor(magnification * 100)}%</p>
                </div>
                <Slider
                  value={[magnification]}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onValueChange={value => {
                    const v = value[0];
                    setMagnification(v);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    id="useSound"
                    checked={isSoundEnabled}
                    onCheckedChange={value => {
                      setSoundEnabled(value);
                    }}
                  />
                  <Label htmlFor="useSound">音を鳴らす機能</Label>
                </div>
                <Play
                  onClick={() => {
                    audioRef.current = new Audio("/receive.mp3");
                    audioRef.current?.play().catch(() => {
                      toast.error(
                        "音を鳴らすことができませんでした。ブラウザの設定を確認してください。"
                      );
                    });
                  }}
                  aria-label="テストで音を鳴らす"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
