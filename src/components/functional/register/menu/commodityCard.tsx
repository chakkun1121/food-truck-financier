import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CategoryType, CommodityType } from "@/types/stallInfo";
import { Minus, Plus } from "lucide-react";

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
        count >= (commodity?.stock ?? 0) && "opacity-50",
        (() => {
          if (count > 0) {
            switch (category?.color) {
              case "red":
                return "border-red-800 bg-red-400";
              case "yellow":
                return "border-yellow-800 bg-yellow-400";
              case "lime":
                return "border-lime-800 bg-lime-400";
              case "green":
                return "border-green-800 bg-green-400";
              case "emerald":
                return "border-emerald-800 bg-emerald-400";
              case "teal":
                return "border-teal-800 bg-teal-400";
              case "cyan":
                return "border-cyan-800 bg-cyan-400";
              case "sky":
                return "border-sky-800 bg-sky-400";
              case "blue":
                return "border-blue-800 bg-blue-400";
              case "violet":
                return "border-violet-800 bg-violet-400";
              case "purple":
                return "border-purple-800 bg-purple-400";
              case "fuchsia":
                return "border-fuchsia-800 bg-fuchsia-400";
              case "pink":
                return "border-pink-800 bg-pink-400";
              case "rose":
                return "border-rose-800 bg-rose-400";
              case "stone":
                return "border-stone-800 bg-stone-400";
              case "neutral":
                return "border-neutral-800 bg-neutral-400";
              case "zinc":
                return "border-zinc-800 bg-zinc-400";
              case "gray":
                return "border-gray-800 bg-gray-400";
              case "slate":
                return "border-slate-800 bg-slate-400";
              default:
                return "bg-primary/70 border-primary";
            }
          } else {
            switch (category?.color) {
              case "red":
                return "border-red-800 text-red-800";
              case "yellow":
                return "border-yellow-800 text-yellow-800";
              case "lime":
                return "border-lime-800 text-lime-800";
              case "green":
                return "border-green-800 text-green-800";
              case "emerald":
                return "border-emerald-800 text-emerald-800";
              case "teal":
                return "border-teal-800 text-teal-800";
              case "cyan":
                return "border-cyan-800 text-cyan-800";
              case "sky":
                return "border-sky-800 text-sky-800";
              case "blue":
                return "border-blue-800 text-blue-800";
              case "violet":
                return "border-violet-800 text-violet-800";
              case "purple":
                return "border-purple-800 text-purple-800";
              case "fuchsia":
                return "border-fuchsia-800 text-fuchsia-800";
              case "pink":
                return "border-pink-800 text-pink-800";
              case "rose":
                return "border-rose-800 text-rose-800";
              case "stone":
                return "border-stone-800 text-stone-800";
              case "neutral":
                return "border-neutral-800 text-neutral-800";
              case "zinc":
                return "border-zinc-800 text-zinc-800";
              case "gray":
                return "border-gray-800 text-gray-800";
              case "slate":
                return "border-slate-800 text-slate-800";
              default:
                return "text-primary border-primary";
            }
          }
        })()
      )}
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
            <Minus />
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
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}
