"use client";

import AccessError from "@/components/accessError";
import Loading from "@/components/ui-element/loading";
import { auth, db } from "@/firebase";
import { useError } from "@/hooks/useError";
import { useSoundSetting } from "@/hooks/useSoundSetting";
import { OrderType } from "@/types/stallInfo";
import { UUID } from "crypto";
import { ref, set } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { toast } from "sonner";
import OrderCard from "./orderCard";

export default function Receive() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [orders, ordersLoading, ordersError] = useObjectVal<{
    [key: UUID]: OrderType;
  }>(ref(db, `stalls/${userInfo?.stallId}/orders`));
  useError(error, userInfoError, ordersError);
  const receive = Object.entries(orders ?? {})
    .reverse()
    .filter(
      ([, o]) =>
        typeof o === "object" &&
        o !== null &&
        "status" in o &&
        o.status === "ready"
    ) as [UUID, OrderType][];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevCountRef = useRef(0);
  const {
    isSoundEnabled: isSoundAllowed,
    setSoundEnabled: setSoundAllowed,
    isSettingLoaded
  } = useSoundSetting();
  const [enableSound, setEnableSound] = useState(false);

  useEffect(() => {
    if (isSettingLoaded && isSoundAllowed && !enableSound) {
      toast("この画面で音を鳴らしますか?", {
        action: {
          label: "はい",
          onClick: () => {
            setEnableSound(true);
            audioRef.current?.play();
            toast.success(
              "サウンドを有効にしましました。テストで音を鳴らします。鳴らなかった場合はブラウザの設定を確認してください。",
              { position: "top-center", duration: 5000 }
            );
          }
        },
        cancel: {
          label: "いいえ",
          onClick: () => {
            setSoundAllowed(false);
            toast.info("サウンドを無効にしました");
          }
        },
        position: "top-center"
      });
    }
    if (typeof Audio !== "undefined") {
      audioRef.current = new Audio("/receive.mp3");
    }
  }, [isSettingLoaded, enableSound, isSoundAllowed, setSoundAllowed]);

  useEffect(() => {
    if (enableSound && receive.length > prevCountRef.current) {
      audioRef.current?.play().catch(() => {
        toast.error(
          "エラーが発生し、音を鳴らすことができませんでした。ページを再度読み込んでください。"
        );
      });
    }
    prevCountRef.current = receive.length;
  }, [receive, enableSound]);

  if (loading || userInfoLoading || ordersLoading || !orders)
    return <Loading />;
  if (!user || !userInfo?.stallId) return <AccessError />;

  function setOrderState(id: string, status: OrderType["status"]) {
    set(ref(db, `stalls/${userInfo?.stallId}/orders/${id}/status`), status);
  }

  return (
    <>
      {receive.map(([id, order]) => (
        <OrderCard
          id={id}
          order={order}
          setOrderState={setOrderState}
          key={id}
        />
      ))}
      {!receive.length && (
        <p className="text-center text-2xl">受取準備が整った商品はありません</p>
      )}
    </>
  );
}
