import { logger } from "@/lib/logger";
import { useEffect } from "react";
import { toast } from "sonner";

export function useError(...args: (undefined | Error)[]) {
  useEffect(() => {
    for (const arg of args) {
      if (arg) {
        const errorId = logger.error(arg.message, arg);
        toast.error(arg.message, {
          description: `エラーID: ${errorId}`,
          action: {
            label: "IDをコピー",
            onClick: () => {
              navigator.clipboard.writeText(errorId);
              toast.success("コピーしました");
            }
          }
        });
      }
    }
  }, [args]);
}
