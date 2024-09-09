import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CommodityType } from "@/types/stallInfo";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

export default function CommodityCard({
  commodity,
  count,
  setCount,
}: {
  commodity: CommodityType;
  count: number;
  setCount(count: number): void;
}) {
  return (
    <Card className="max-w-xs w-full">
      <CardContent
        className={cn("p-0 flex justify-between", !commodity.stock && "")}>
        <div
          className="flex-1 p-6"
          onClick={() => commodity?.stock - count > 0 && setCount(count + 1)}>
          <h3 className="text-xl">{commodity?.name}</h3>
          <div className="flex justify-between items-center mt-2">
            <p className="ml-1">¥{commodity?.price}</p>
            <p>在庫:{commodity.stock}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-none py-6 pr-6">
          <Button
            className="rounded-full relative z-10"
            variant="outline"
            size="icon"
            onClick={e => {
              e.preventDefault();
              setCount(count - 1);
            }}
            disabled={count === 0}
            aria-label="Minus">
            <MinusIcon />
          </Button>
          <p className="text-lg w-8 text-center">{count}</p>
          <Button
            className="rounded-full"
            variant="outline"
            size="icon"
            onClick={() => setCount(count + 1)}
            aria-label="Plus"
            disabled={count >= commodity?.stock}>
            <PlusIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
