import { Button } from "@/components/ui/button";
import { CommodityType, OrderType } from "@/types/stallInfo";
import OrderItemCard from "./OrderItemCard";

export default function OrderInfo({
  commodities,
  order
}: {
  commodities?: { [key: string]: CommodityType };
  order?: Partial<OrderType>;
}) {
  const totalPrice = order?.commodities
    ? Object.entries(order.commodities).reduce((sum, [commodityId, count]) => {
        const price = commodities?.[commodityId]?.price ?? 0;
        return sum + price * count;
      }, 0)
    : 0;
  return (
    <>
      <div className="flex-none border-b pb-2">
        <h2 className="text-xl">注文内容</h2>
      </div>
      <div className="flex-1 space-y-4 overflow-y-scroll py-4">
        {order?.commodities
          ? Object.entries(order.commodities).map(([commodityId, count]) => (
              <OrderItemCard
                key={commodityId}
                name={commodities?.[commodityId]?.name ?? "不明な商品"}
                price={commodities?.[commodityId]?.price ?? 0}
                quantity={count}
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
