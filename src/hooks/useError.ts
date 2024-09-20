import { useEffect } from "react";
import { toast } from "sonner";

export function useError(...args: (undefined | Error)[]) {
  useEffect(() => {
    for (const arg of args) {
      if (arg) {
        console.error(arg);
        toast.error(arg.message);
      }
    }
  }, [args]);
}
