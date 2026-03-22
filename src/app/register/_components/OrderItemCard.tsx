import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Trash } from "lucide-react";

export default function OrderItemCard({
  name,
  price,
  quantity
}: {
  name: string;
  price: number;
  quantity: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex">
          <p className="block">{name}</p>
          <p className="block">×{quantity}</p>
        </CardTitle>
        <CardDescription>
          ¥{price}×{quantity}
        </CardDescription>
        <CardAction>
          <Button className="aspect-square rounded-full">
            <Trash />
          </Button>
        </CardAction>
      </CardHeader>
      <CardFooter className="justify-end">
        <p className="text-xl">¥{price * quantity}</p>
      </CardFooter>
    </Card>
  );
}
