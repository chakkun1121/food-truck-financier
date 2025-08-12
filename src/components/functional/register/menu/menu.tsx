"use client";

import { Separator } from "@/components/ui/separator";
import { StallInfo } from "@/types/stallInfo";
import { useState } from "react";
import CategoryCard from "./categoryCard";
import CommodityCard from "./commodityCard";

export default function Menu({
  commodities,
  currentOrder,
  setCurrentOrder,
  categories
}: {
  commodities: StallInfo["commodities"];
  currentOrder: { [key: string]: number };
  setCurrentOrder: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  categories?: StallInfo["category"];
}) {
  const [categoryName, setCategoryName] = useState<string>("all");
  return (
    <>
      <div className="flex items-center gap-4 overflow-x-scroll">
        {Object.entries(categories ?? {}).map(([id, c]) => (
          <CategoryCard
            key={id}
            category={c}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            itemCount={
              (commodities &&
                (id === "all"
                  ? Object.entries(commodities).length
                  : Object.entries(commodities).filter(
                      ([, value]) => value.category === id
                    ).length)) as number
            }
            id={id}
          />
        ))}
      </div>
      <Separator />
      <div className="flex flex-wrap gap-4">
        {commodities &&
          Object.entries(commodities)
            ?.filter(
              ([, value]) =>
                categoryName === "all" ||
                value.category === categoryName ||
                value.category === null
            )
            .map(([key, value]) => {
              return (
                <CommodityCard
                  key={key}
                  commodity={value}
                  count={currentOrder[key] || 0}
                  setCount={c => {
                    setCurrentOrder(o => ({ ...o, [key]: c }));
                  }}
                  category={categories?.[value.category ?? "none"]}
                />
              );
            })}
      </div>
    </>
  );
}
