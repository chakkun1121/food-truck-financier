"use client";

import { Button } from "@/components/ui/button";
import {
  colorToBg400Class,
  colorToBorder500Class
} from "@/lib/tailwindClasses";
import { cn } from "@/lib/utils";
import { CommodityType, TailwindColorType } from "@/types/stallInfo";
import { Minus, Plus } from "lucide-react";

export default function CommodityCard({
  commodity,
  count,
  setCount,
  categoryId,
  color
}: {
  commodity: CommodityType;
  categoryId?: string;
  count: number;
  setCount(count: number): void;
  color: "primary" | TailwindColorType;
}) {
  return (
    <div
      className={cn(
        "outline-border aspect-video h-40 rounded-md border-l-[6px] bg-[rgba(225,225,225,0.05)] px-2 py-6 outline",
        colorToBorder500Class(color),
        count > 0 && colorToBg400Class(color),
        (commodity.stock ?? 0) <= 0 && "cursor-not-allowed opacity-50"
      )}
    >
      <div className={"flex flex-col justify-between p-0"}>
        <div
          className="flex-1"
          onClick={() =>
            (commodity.stock ?? 0) - count > 0 && setCount(count + 1)
          }
        >
          <h3 className="text-lg font-bold">{commodity.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <p
              className={cn(
                "text-muted-foreground ml-1 font-semibold tracking-wide",
                count > 0 && "text-foreground dark:text-background"
              )}
            >
              {commodity.price} 円
            </p>
            <p
              className={cn(
                "text-muted-foreground pr-2 text-sm",
                count > 0 && "text-foreground dark:text-background",
                (commodity.stock ?? 0) <= 10 && "text-destructive block"
              )}
            >
              在庫:{commodity.stock}
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
            disabled={count >= (commodity.stock ?? 0)}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}
