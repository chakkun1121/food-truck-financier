import { Button } from "@/components/ui/button";
import { convertCsv } from "@/lib/convertCsv";
import { dl, zip } from "@/lib/zip.mjs";
import { StallInfo } from "@/types/stallInfo";
import { useState } from "react";
import { toast } from "sonner";

export default function Export({
  stalls
}: {
  stalls: { [key: string]: Partial<StallInfo> | null | undefined } | undefined;
}) {
  const [loading, setLoading] = useState(false);
  async function download() {
    try {
      setLoading(true);
      const data =
        (stalls &&
          Object.entries(stalls).map(([stallId, stall]) => ({
            id: stallId,
            name: stall?.name,
            csv: convertCsv(stall?.commodities, stall?.orders ?? {})
          }))) ??
        [];
      const files = data.map(d => ({
        name: `${d.name}.csv`,
        buffer: new TextEncoder().encode(d.csv)
      }));
      dl({ name: "stalls.zip", buffer: await zip(files) });
    } catch (e: unknown) {
      console.error(e);
      const msg = e instanceof Error ? e.message : String(e);
      toast.error(`エクスポートに失敗しました: ${msg}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Button onClick={() => download()} disabled={loading}>
      データをエクスポート
    </Button>
  );
}
