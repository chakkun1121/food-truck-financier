"use client";

import { CATEGORIES } from "@/components/common/constants";
import { Separator } from "@/components/ui/separator";
import { StallInfo } from "@/types/stallInfo";
import { useState } from "react";
import CategoryCard from "./categoryCard";
import CommodityCard from "./commodityCard";

export default function Menu({
  commodities,
  currentOrder,
  setCurrentOrder
}: {
  commodities: StallInfo["commodities"];
  currentOrder: { [key: string]: number };
  setCurrentOrder: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
}) {
  const [category, setCategory] = useState<string | null>(
    Object.entries(commodities!)?.[0]?.[1].category ?? null
  );
  return (
    <>
      <div className="flex items-center gap-4">
        {CATEGORIES.map(c => (
          <CategoryCard
            category={c}
            setCategory={setCategory}
            itemCount={
              (commodities &&
                Object.entries(commodities).filter(
                  ([key, value]) => value.category === c.id
                ).length) as number
            }
          />
        ))}
      </div>
      <Separator />
      <div className="flex flex-wrap gap-4">
        {commodities &&
          Object.entries(commodities)
            ?.filter(([key, value]) => value.category === category)
            .map(([key, value]) => {
              return (
                <CommodityCard
                  key={key}
                  commodity={value}
                  count={currentOrder[key] || 0}
                  setCount={c => {
                    setCurrentOrder(o => ({ ...o, [key]: c }));
                  }}
                />
              );
            })}
      </div>
    </>
  );
}
