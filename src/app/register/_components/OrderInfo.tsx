import { Button } from "@/components/ui/button";
import { CategoryType, CommodityType, OrderType } from "@/types/stallInfo";
import { UUID } from "crypto";
import { Trash } from "lucide-react";
import OrderItemCard from "./OrderItemCard";

export default function OrderInfo({
  commodities,
  categories,
  order,
  setOrder
}: {
  commodities?: { [key: UUID]: CommodityType };
  categories?: { [key: string]: CategoryType };
  order?: Partial<OrderType>;
  setOrder: (order: Partial<OrderType>) => void;
}) {
  const totalPrice = order?.commodities
    ? Object.entries(order.commodities).reduce((sum, [commodityId, count]) => {
        const price = commodities?.[commodityId as UUID]?.price ?? 0;
        return sum + price * count;
      }, 0)
    : 0;
  return (
    <>
      <div className="flex flex-none items-center justify-between border-b pb-2">
        <h2 className="block text-xl">注文内容</h2>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => setOrder({})}
          title="全削除"
        >
          <Trash />
        </Button>
      </div>
      <div className="flex-1 space-y-4 overflow-y-scroll py-4">
        {order?.commodities
          ? Object.entries(order.commodities).map(([commodityId, count]) => (
              <OrderItemCard
                key={commodityId}
                name={commodities?.[commodityId as UUID]?.name ?? "不明な商品"}
                price={commodities?.[commodityId as UUID]?.price ?? 0}
                quantity={count}
                color={
                  categories?.[
                    commodities?.[commodityId as UUID]?.category ?? ""
                  ]?.color
                }
                deleteItem={() => {
                  const newOrder = { ...order };
                  if (newOrder.commodities) {
                    delete newOrder.commodities[commodityId as UUID];
                  }
                  setOrder(newOrder);
                }}
              />
            ))
          : "商品が選択されていません"}
      </div>
      <div className="flex-none border-t pt-4">
        <h3 className="text-lg font-bold">合計: {totalPrice}円</h3>
      </div>
      <div className="flex-none border-t pt-4">
        <Button className="w-full flex-none p-6 pt-4">支払いに進む</Button>
      </div>
    </>
  );
}
