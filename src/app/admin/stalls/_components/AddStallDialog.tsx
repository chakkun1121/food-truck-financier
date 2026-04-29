import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddStallDialog({
  isOpen,
  onOpenChange,
  name,
  setName,
  prefix,
  setPrefix,
  onSubmit,
  error
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  name: string;
  setName: (v: string) => void;
  prefix: string;
  setPrefix: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>店舗を追加</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>店舗の追加</DialogTitle>
          <DialogDescription>
            新しい店舗を追加します。識別記号は整理券などで使われます。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="add-name">店舗名</Label>
            <Input
              id="add-name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. 1年A組 カレー屋"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="add-prefix">識別記号</Label>
            <Input
              id="add-prefix"
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
                      追加する
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
              <Button type="submit">追加する</Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
