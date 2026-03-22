import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function OrderCategoryCard({
  name,
  categoryId,
  itemCount,
  selected,
  setSelected
}: {
  name: string;
  itemCount: number;
  categoryId?: string;
  selected?: boolean;
  setSelected?: (selected: boolean) => void;
}) {
  return (
    <Card
      className={cn(
        "bg-accent aspect-video h-32 flex-none",
        selected && "bg-primary"
      )}
      onClick={() => setSelected?.(true)}
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{itemCount}アイテム</CardDescription>
      </CardHeader>
    </Card>
  );
}
