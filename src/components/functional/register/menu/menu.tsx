import { StallInfo } from "@/types/stallInfo";
import { UUID } from "crypto";
import CommodityCard from "./commodityCard";

export default function Menu({
  commodities,
  currentOrder,
  setCurrentOrder,
}: {
  commodities: StallInfo["commodities"];
  currentOrder: { [key: UUID]: number };
  setCurrentOrder: React.Dispatch<
    React.SetStateAction<{ [key: UUID]: number }>
  >;
}) {
  return (
    <>
      <h2 className="text-2xl">メニュー</h2>
      <div className="flex flex-wrap gap-4">
        {commodities &&
          Object.entries(commodities).map(([key, value]) => (
            <CommodityCard
              key={key}
              commodity={value}
              count={currentOrder[key as UUID] || 0}
              setCount={c => {
                setCurrentOrder(o => ({ ...o, [key]: c }));
              }}
            />
          ))}
      </div>
    </>
  );
}
