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
  const [category, setCategory] = useState<string>("all");
  return (
    <>
      <div className="flex items-center gap-4">
        {Object.entries(categories ?? {}).map(([id, c]) => (
          <CategoryCard
            key={id}
            category={c}
            setCategory={setCategory}
            itemCount={
              (commodities &&
                (id === "all"
                  ? Object.entries(commodities).length
                  : Object.entries(commodities).filter(
                      ([_, value]) => value.category === id
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
              ([_, value]) =>
                category === "all" ||
                value.category === category ||
                value.category === null ||
                value.category === "none"
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
