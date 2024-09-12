import { Card, CardContent } from "@/components/ui/card";
import { OrderType } from "@/types/stallInfo";

export default function OrderCard({
  id,
  setOrderState,
  order
}: {
  id: string;
  order: OrderType;
  setOrderState: (id: string, state: OrderType["status"]) => void;
}) {
  return (
    <button className="max-w-52" onClick={() => setOrderState(id, "completed")}>
      <Card>
        <CardContent className="p-8">
          <p className="text-center text-4xl font-bold">{order.ticket}</p>
        </CardContent>
      </Card>
    </button>
  );
}
