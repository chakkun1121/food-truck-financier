import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EditStallDialog({
  isOpen,
  onOpenChange,
  stallId,
  name,
  setName,
  prefix,
  setPrefix,
  onSubmit,
  error
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  stallId: string | null;
  name: string;
  setName: (v: string) => void;
  prefix: string;
  setPrefix: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>店舗の編集</DialogTitle>
          <DialogDescription>{name} の情報を更新します。</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">店舗名</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. 1年A組 カレー屋"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-prefix">識別記号</Label>
            <Input
              id="edit-prefix"
              value={prefix}
              onChange={e => setPrefix(e.target.value)}
              placeholder="e.g. A"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              キャンセル
            </Button>
            {error ? (
              <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger asChild>
                  <span className="inline-block">
                    <Button type="submit" disabled>
                      更新する
                    </Button>
                  </span>
                </HoverCardTrigger>
                <HoverCardContent
                  side="top"
                  className="text-destructive w-auto p-2 text-sm font-medium"
                >
                  {error}
                </HoverCardContent>
              </HoverCard>
            ) : (
              <Button type="submit">更新する</Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
