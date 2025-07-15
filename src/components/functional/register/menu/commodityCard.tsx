import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CategoryType, CommodityType } from "@/types/stallInfo";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

export default function CommodityCard({
  commodity,
  count,
  setCount,
  category
}: {
  commodity: Partial<CommodityType>;
  count: number;
  setCount(count: number): void;
  category?: CategoryType;
}) {
  return (
    <div
      className={cn(
        "outline-border aspect-video h-40 rounded-md border-l-[6px] bg-[rgba(225,225,225,0.05)] px-2 py-6 outline",
        count > 0 && "text-foreground dark:text-background",
        count >= (commodity?.stock ?? 0) && "opacity-50"
      )}
      style={
        category?.color?.border
          ? count > 0
            ? {
                borderColor: category?.color?.border,
                backgroundColor: category?.color?.bg
              }
            : {
                borderColor: category?.color?.border,
                color: category?.color?.text
              }
          : count > 0
            ? {
                borderColor: "var(--border-primary)",
                backgroundColor: "var(--primary)"
              }
            : {
                borderColor: "var(--border-primary)",
                color: "var(--text-primary-foreground)"
              }
      }
    >
      <div className={"flex flex-col justify-between p-0"}>
        <div
          className="flex-1"
          onClick={() =>
            (commodity?.stock ?? 0) - count > 0 && setCount(count + 1)
          }
        >
          <h3 className="text-lg font-bold">{commodity?.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <p
              className={cn(
                "text-muted-foreground ml-1 font-semibold tracking-wide",
                count > 0 && "text-foreground dark:text-background"
              )}
            >
              {commodity?.price} 円
            </p>
            <p
              className={cn(
                "text-muted-foreground pr-2 text-sm",
                count > 0 && "text-foreground dark:text-background",
                (commodity?.stock ?? 0) <= 10 && "text-destructive block"
              )}
            >
              在庫:{commodity?.stock}
            </p>
          </div>
        </div>
        <div className="flex flex-none items-center justify-end gap-2 py-6">
          <Button
            className="relative z-10 rounded-full bg-transparent"
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
            className="relative z-10 rounded-full bg-transparent"
            variant="outline"
            size="icon"
            onClick={() => setCount(count + 1)}
            aria-label="Plus"
            disabled={count >= (commodity?.stock ?? 0)}
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
