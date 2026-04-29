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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { StallInfoWithId } from "../hooks/useMenuAdmin";

export function AddCommodityDialog({ isOpen, setIsOpen, submit, stalls }: any) {
  const [stallId, setStallId] = useState("");
  const [commodityId, setCommodityId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("0");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await submit({
        stallId,
        commodityId,
        name,
        price: Number(price),
        stock: Number(stock)
      });
      setStallId("");
      setCommodityId("");
      setName("");
      setPrice("");
      setStock("0");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          商品追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>商品を新しく追加</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>対象店舗</Label>
            <Select value={stallId} onValueChange={setStallId}>
              <SelectTrigger>
                <SelectValue placeholder="店舗を選択" />
              </SelectTrigger>
              <SelectContent>
                {stalls.map((stall: StallInfoWithId) => (
                  <SelectItem key={stall.stallId} value={stall.stallId}>
                    {stall.name} ({stall.stallId})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>商品ID (英数字)</Label>
            <Input
              required
              value={commodityId}
              onChange={e => setCommodityId(e.target.value)}
              placeholder="komachi-yaki"
            />
          </div>
          <div className="space-y-2">
            <Label>商品名</Label>
            <Input
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="小町焼き"
            />
          </div>
          <div className="space-y-2">
            <Label>価格 (円)</Label>
            <Input
              required
              type="number"
              min="0"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="500"
            />
          </div>
          <div className="space-y-2">
            <Label>初期在庫</Label>
            <Input
              required
              type="number"
              min="0"
              value={stock}
              onChange={e => setStock(e.target.value)}
              placeholder="100"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            追加
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
