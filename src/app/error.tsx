"use client"; // Error boundaries must be Client Components

import { logger } from "@/lib/logger";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [errorId, setErrorId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Log the error to an error reporting service
    const id = logger.error("Unhandled application error", error, {
      digest: error.digest
    });
    setErrorId(id);
  }, [error]);

  const copyToClipboard = async () => {
    if (!errorId) return;
    try {
      await navigator.clipboard.writeText(errorId);
      setCopied(true);
      toast.success("エラーIDをコピーしました");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("コピーに失敗しました");
    }
  };

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-4">
      <h2 className="text-xl font-bold">Something went wrong!</h2>
      {errorId && (
        <div className="bg-muted flex flex-col items-center gap-2 rounded-lg p-4">
          <p className="text-center text-sm text-gray-500">
            エラーが発生しました。お問い合わせの際はこのIDをお伝えください。
          </p>
          <div className="bg-background flex items-center gap-2 rounded border px-3 py-2">
            <code className="font-mono text-xs">{errorId}</code>
            <button
              onClick={copyToClipboard}
              className="hover:bg-muted rounded p-1 transition-colors"
              title="コピーする"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="text-muted-foreground h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}
      <button
        className="rounded bg-orange-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-orange-600"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        もう一度試す
      </button>
    </div>
  );
}
