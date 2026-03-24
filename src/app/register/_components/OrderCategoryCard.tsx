import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { colorToBg700Class } from "@/lib/tailwindClasses";
import { cn } from "@/lib/utils";
import { TailwindColorType } from "@/types/stallInfo";

export default function OrderCategoryCard({
  name,
  color = "primary",
  itemCount,
  selected,
  setSelected
}: {
  name: string;
  itemCount: number;
  color?: "primary" | TailwindColorType;
  selected?: boolean;
  setSelected?: () => void;
}) {
  return (
    <Card
      className={cn(
        "aspect-video h-32 flex-none transition-all",
        selected
          ? colorToBg700Class(color)
          : "border-border border bg-transparent",
        selected && "text-background shadow-sm"
      )}
      onClick={() => setSelected?.()}
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className={cn(selected && "text-background")}>
          {itemCount}アイテム
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
