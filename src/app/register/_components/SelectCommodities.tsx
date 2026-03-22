"use client";
import { CategoryType, CommodityType, OrderType } from "@/types/stallInfo";
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
  return (
    <>
      <div className="flex flex-none gap-4 overflow-x-scroll">
        <OrderCategoryCard
          name="すべて"
          itemCount={Object.keys(commodities).length}
          selected
        />
        {Object.entries(categories).map(([id, category]) => (
          <OrderCategoryCard
            key={id}
            name={category.name}
            itemCount={
              Object.values(commodities).filter(
                commodity => commodity.category === id
              ).length
            }
          />
        ))}
      </div>
      <br />
      <div className="flex flex-wrap gap-4 overflow-x-hidden py-2">
        {Object.entries(commodities).map(([id, commodity]) => (
          <CommodityCard
            key={id}
            name={commodity.name}
            price={commodity.price}
            stock={commodity.stock}
            count={
              (order?.commodities as Record<string, number> | undefined)?.[
                id
              ] ?? 0
            }
            setCount={newCount => {
              if (newCount === 0) {
                const { [id]: _, ...rest } = (order?.commodities ?? {}) as Record<string, number>;
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
          />
        ))}
      </div>
    </>
  );
}
