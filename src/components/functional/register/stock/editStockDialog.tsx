import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ReactNode, useState } from "react";

export default function EditStockDialog({
  trigger,
  stock,
  setStock,
}: {
  trigger: ReactNode;
  stock: number;
  setStock: (stock: number) => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [newStock, setNewStock] = useState(stock);
  return (
    <Dialog open={isOpen} onOpenChange={o => setIsOpen(o)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>在庫数を編集</DialogHeader>
        <div>
          <Input
            type="number"
            value={newStock}
            onChange={s => setNewStock(Number(s.target.value))}
            placeholder="在庫数を入力"
          />
        </div>
        <DialogFooter>
          <Button onClick={() => setStock(newStock)}>保存</Button>
          <Button onClick={() => setIsOpen(false)}>キャンセル</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
