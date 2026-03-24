"use client";
import { CategoryType, CommodityType, OrderType } from "@/types/stallInfo";
import { useState } from "react";
import CommodityCard from "./CommodityCard";
import OrderCategoryCard from "./OrderCategoryCard";

export default function SelectCommodities({
  categories,
  commodities,
  order,
  setOrder
}: {
  categories: { [key: string]: CategoryType };
  commodities: { [key: string]: CommodityType };
  order?: Partial<OrderType>;
  setOrder(order: Partial<OrderType>): void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  return (
    <>
      <div className="flex flex-none gap-4 overflow-x-scroll">
        <OrderCategoryCard
          name="すべて"
          itemCount={Object.keys(commodities).length}
          selected={selectedCategory === null}
          color="primary"
          setSelected={() => setSelectedCategory(null)}
        />
        {Object.entries(categories).map(([id, category]) => (
          <OrderCategoryCard
            key={id}
            name={category.name}
            color={category.color}
            itemCount={
              Object.values(commodities).filter(
                commodity => commodity.category === id
              ).length
            }
            selected={selectedCategory === id}
            setSelected={() => setSelectedCategory(id)}
          />
        ))}
      </div>
      <br />
      <div className="flex flex-wrap gap-4 overflow-x-hidden py-2">
        {Object.entries(commodities)
          .filter(([id, commodity]) => {
            if (selectedCategory === null) return true;
            return commodity.category === selectedCategory;
          })
          .map(([id, commodity]) => (
            <CommodityCard
              key={id}
              commodity={commodity}
              count={
                (order?.commodities as Record<string, number> | undefined)?.[
                  id
                ] ?? 0
              }
              setCount={newCount => {
                if (newCount === 0) {
                  const { [id]: _, ...rest } = (order?.commodities ??
                    {}) as Record<string, number>;
                  setOrder({
                    ...order,
                    commodities: rest
                  });
                  return;
                }
                setOrder({
                  ...order,
                  commodities: {
                    ...order?.commodities,
                    [id]: newCount
                  }
                });
              }}
              color={categories[commodity.category ?? ""]?.color ?? "primary"}
            />
          ))}
      </div>
    </>
  );
}
