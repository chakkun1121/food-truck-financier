import { Button } from "@/components/ui/button";
import { convertCsv } from "@/lib/convertCsv";
import { StallInfo } from "@/types/stallInfo";
import { useState } from "react";
import { toast } from "sonner";
// @ts-ignore
import { dl, zip } from "@/lib/zip";

export default function Export({
  stalls
}: {
  stalls: { [key: string]: StallInfo };
}) {
  const [loading, setLoading] = useState(false);
  async function download() {
    try {
      setLoading(true);
      const data = Object.entries(stalls).map(([stallId, stall]) => ({
        id: stallId,
        name: stall.name,
        csv: convertCsv(stall?.commodities, stall?.orders!)
      }));
      const files = data.map(d => ({
        name: `${d.name}.csv`,
        buffer: new TextEncoder().encode(d.csv)
      }));
      dl({ name: "stalls.zip", buffer: await zip(files) });
    } catch (e: any) {
      console.error(e);
      toast.error(`エクスポートに失敗しました: ${e.message}`);
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
