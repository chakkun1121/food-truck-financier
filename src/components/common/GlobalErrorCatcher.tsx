"use client";

import { logger } from "@/lib/logger";
import { useEffect } from "react";
import { toast } from "sonner";

export function GlobalErrorCatcher() {
  useEffect(() => {
    const handleWindowError = (event: ErrorEvent) => {
      const errorId = logger.error(
        "Uncaught Global Error",
        event.error || new Error(event.message)
      );
      toast.error(event.message || "予期せぬエラーが発生しました", {
        description: `エラーID: ${errorId}`,
        action: {
          label: "IDをコピー",
          onClick: () => {
            navigator.clipboard.writeText(errorId);
            toast.success("コピーしました");
          }
        }
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error =
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason));
      const errorId = logger.error("Unhandled Promise Rejection", error);
      toast.error(error.message || "予期せぬ通信エラー等が発生しました", {
        description: `エラーID: ${errorId}`,
        action: {
          label: "IDをコピー",
          onClick: () => {
            navigator.clipboard.writeText(errorId);
            toast.success("コピーしました");
          }
        }
      });
    };

    window.addEventListener("error", handleWindowError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleWindowError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  return null;
}
