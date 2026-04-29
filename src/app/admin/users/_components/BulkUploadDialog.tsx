import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  csvFile: File | null;
  setCsvFile: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function BulkUploadDialog({ csvFile, setCsvFile, onSubmit }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">CSV/TSV一括追加</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>CSV/TSVファイルから一括追加</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>ファイル (フォーマット: Email, Password, StallID の3列)</Label>
            <Input
              type="file"
              accept=".csv,.tsv"
              onChange={e => setCsvFile(e.target.files?.[0] || null)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={!csvFile}>
            一括追加
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
