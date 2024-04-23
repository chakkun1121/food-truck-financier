import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

export default function CommodityCard({
  commodity,
  count,
  setCount,
}: {
  commodity: {
    name: string;
    price: number;
  };
  count: number;
  setCount(count: number): void;
}) {
  return (
    <Card className="max-w-xs w-full">
      <CardContent className="p-0 flex justify-between">
        <div className="flex-1 p-6" onClick={() => setCount(count + 1)}>
          <h3 className="text-xl">{commodity.name}</h3>
          <p className="ml-1">¥{commodity.price}</p>
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
            aria-label="Minus"
          >
            <MinusIcon />
          </Button>
          <p className="text-lg w-8 text-center">{count}</p>
          <Button
            className="rounded-full"
            variant="outline"
            size="icon"
            onClick={() => setCount(count + 1)}
            aria-label="Plus"
          >
            <PlusIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
