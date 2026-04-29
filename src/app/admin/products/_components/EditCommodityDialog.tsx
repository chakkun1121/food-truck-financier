import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export function EditCommodityDialog({
  isOpen,
  setIsOpen,
  submit,
  editingData
}: any) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingData) {
      setName(editingData.name);
      setStock(String(editingData.stock));
      setError("");
    }
  }, [editingData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await submit({
        stallId: editingData.stallId,
        commodityId: editingData.commodityId,
        name,
        stock: Number(stock)
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>商品を編集</DialogTitle>
          <p className="text-sm text-gray-500">
            店舗: {editingData?.stallName}
          </p>
          <p className="text-sm text-gray-500">
            商品ID: {editingData?.commodityId}
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>商品名</Label>
            <Input
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>在庫</Label>
            <Input
              required
              type="number"
              min="0"
              value={stock}
              onChange={e => setStock(e.target.value)}
            />
          </div>
          <p className="text-xs text-red-500">
            ※売上データとの整合性を保つため、価格の変更および商品の削除はできません。
          </p>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            保存
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
