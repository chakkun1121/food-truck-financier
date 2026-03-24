import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { colorToBg400Class } from "@/lib/tailwindClasses";
import { TailwindColorType } from "@/types/stallInfo";
import { Trash } from "lucide-react";

export default function OrderItemCard({
  name,
  price,
  quantity,
  color = "primary",
  deleteItem
}: {
  name: string;
  price: number;
  quantity: number;
  color?: "primary" | TailwindColorType;
  deleteItem?: () => void;
}) {
  return (
    <Card className={colorToBg400Class(color)}>
      <CardHeader>
        <CardTitle className="flex">
          <p className="block">{name}</p>
          <p className="block">×{quantity}</p>
        </CardTitle>
        <CardDescription>
          ¥{price}×{quantity}
        </CardDescription>
        <CardAction>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={deleteItem}
          >
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
