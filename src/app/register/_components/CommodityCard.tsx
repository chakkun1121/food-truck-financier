"use client";

import { Button } from "@/components/ui/button";
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

function colorToBorder500Class(color: TailwindColorType | "primary") {
  // tailwindcssの都合上、outline-primaryのようなクラスは動的に生成できないため、色ごとにクラスを分ける必要がある。
  switch (color) {
    case "primary":
      return "border-primary";
    case "red":
      return "border-red-500";
    case "yellow":
      return "border-yellow-500";
    case "lime":
      return "border-lime-500";
    case "green":
      return "border-green-500";
    case "emerald":
      return "border-emerald-500";
    case "teal":
      return "border-teal-500";
    case "cyan":
      return "border-cyan-500";
    case "sky":
      return "border-sky-500";
    case "blue":
      return "border-blue-500";
    case "violet":
      return "border-violet-500";
    case "purple":
      return "border-purple-500";
    case "fuchsia":
      return "border-fuchsia-500";
    case "pink":
      return "border-pink-500";
    case "rose":
      return "border-rose-500";
    case "stone":
      return "border-stone-500";
    case "neutral":
      return "border-neutral-500";
    case "zinc":
      return "border-zinc-500";
    case "gray":
      return "border-gray-500";
    case "slate":
      return "border-slate-500";
  }
}

function colorToBg200Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "bg-primary/20";
    case "red":
      return "bg-red-200";
    case "yellow":
      return "bg-yellow-200";
    case "lime":
      return "bg-lime-200";
    case "green":
      return "bg-green-200";
    case "emerald":
      return "bg-emerald-200";
    case "teal":
      return "bg-teal-200";
    case "cyan":
      return "bg-cyan-200";
    case "sky":
      return "bg-sky-200";
    case "blue":
      return "bg-blue-200";
    case "violet":
      return "bg-violet-200";
    case "purple":
      return "bg-purple-200";
    case "fuchsia":
      return "bg-fuchsia-200";
    case "pink":
      return "bg-pink-200";
    case "rose":
      return "bg-rose-200";
    case "stone":
      return "bg-stone-200";
    case "neutral":
      return "bg-neutral-200";
    case "zinc":
      return "bg-zinc-200";
    case "gray":
      return "bg-gray-200";
    case "slate":
      return "bg-slate-200";
  }
}
function colorToBg400Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "bg-primary/40";
    case "red":
      return "bg-red-400";
    case "yellow":
      return "bg-yellow-400";
    case "lime":
      return "bg-lime-400";
    case "green":
      return "bg-green-400";
    case "emerald":
      return "bg-emerald-400";
    case "teal":
      return "bg-teal-400";
    case "cyan":
      return "bg-cyan-400";
    case "sky":
      return "bg-sky-400";
    case "blue":
      return "bg-blue-400";
    case "violet":
      return "bg-violet-400";
    case "purple":
      return "bg-purple-400";
    case "fuchsia":
      return "bg-fuchsia-400";
    case "pink":
      return "bg-pink-400";
    case "rose":
      return "bg-rose-400";
    case "stone":
      return "bg-stone-400";
    case "neutral":
      return "bg-neutral-400";
    case "zinc":
      return "bg-zinc-400";
    case "gray":
      return "bg-gray-400";
    case "slate":
      return "bg-slate-400";
  }
}

function colorToBg700Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "bg-primary/70";
    case "red":
      return "bg-red-700";
    case "yellow":
      return "bg-yellow-700";
    case "lime":
      return "bg-lime-700";
    case "green":
      return "bg-green-700";
    case "emerald":
      return "bg-emerald-700";
    case "teal":
      return "bg-teal-700";
    case "cyan":
      return "bg-cyan-700";
    case "sky":
      return "bg-sky-700";
    case "blue":
      return "bg-blue-700";
    case "violet":
      return "bg-violet-700";
    case "purple":
      return "bg-purple-700";
    case "fuchsia":
      return "bg-fuchsia-700";
    case "pink":
      return "bg-pink-700";
    case "rose":
      return "bg-rose-700";
    case "stone":
      return "bg-stone-700";
    case "neutral":
      return "bg-neutral-700";
    case "zinc":
      return "bg-zinc-700";
    case "gray":
      return "bg-gray-700";
    case "slate":
      return "bg-slate-700";
  }
}

function colorToBg800Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "bg-primary/80";
    case "red":
      return "bg-red-800";
    case "yellow":
      return "bg-yellow-800";
    case "lime":
      return "bg-lime-800";
    case "green":
      return "bg-green-800";
    case "emerald":
      return "bg-emerald-800";
    case "teal":
      return "bg-teal-800";
    case "cyan":
      return "bg-cyan-800";
    case "sky":
      return "bg-sky-800";
    case "blue":
      return "bg-blue-800";
    case "violet":
      return "bg-violet-800";
    case "purple":
      return "bg-purple-800";
    case "fuchsia":
      return "bg-fuchsia-800";
    case "pink":
      return "bg-pink-800";
    case "rose":
      return "bg-rose-800";
    case "stone":
      return "bg-stone-800";
    case "neutral":
      return "bg-neutral-800";
    case "zinc":
      return "bg-zinc-800";
    case "gray":
      return "bg-gray-800";
    case "slate":
      return "bg-slate-800";
  }
}
