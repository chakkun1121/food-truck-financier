import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CommodityType } from "@/types/stallInfo";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

export default function CommodityCard({
  commodity,
  count,
  setCount
}: {
  commodity: Partial<CommodityType>;
  count: number;
  setCount(count: number): void;
}) {
  return (
    <Card className="w-full max-w-xs">
      <CardContent
        className={cn("flex justify-between p-0", !commodity?.stock && "")}
      >
        <div
          className="flex-1 p-6"
          onClick={() =>
            (commodity?.stock ?? 0) - count > 0 && setCount(count + 1)
          }
        >
          <h3 className="text-xl">{commodity?.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <p className="ml-1">¥{commodity?.price}</p>
            <p>在庫:{commodity?.stock}</p>
          </div>
        </div>
        <div className="flex flex-none items-center gap-2 py-6 pr-6">
          <Button
            className="relative z-10 rounded-full"
            variant="outline"
            size="icon"
            onClick={e => {
              e.preventDefault();
              setCount(count - 1);
            }}
            disabled={count === 0}
            aria-label="Minus"
          >
            <MinusIcon />
          </Button>
          <p className="w-8 text-center text-lg">{count}</p>
          <Button
            className="rounded-full"
            variant="outline"
            size="icon"
            onClick={() => setCount(count + 1)}
            aria-label="Plus"
            disabled={count >= (commodity?.stock ?? 0)}
          >
            <PlusIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
