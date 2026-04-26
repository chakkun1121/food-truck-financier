import { colorToBg700Class } from "@/lib/tailwindClasses";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/types/stallInfo";

export default function CategoryCard({
  category,
  itemCount,
  categoryName,
  setCategoryName,
  id
}: {
  category: CategoryType;
  itemCount: number;
  categoryName: string;
  setCategoryName(category: string): void;
  id: string;
}) {
  if (itemCount === 0) return null;
  const selected = categoryName === id;
  return (
    <div
      className={cn(
        "text-foreground dark:text-background aspect-video h-32 rounded-md p-4 shadow",
        selected
          ? colorToBg700Class(category.color || "primary")
          : "border-border border bg-transparent",
        selected && "text-background shadow-sm"
      )}
      onClick={() => setCategoryName(id)}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <h6 className="text-lg font-bold">{category.name}</h6>
          <p className="text-sm">{itemCount} items</p>
        </div>
      </div>
    </div>
  );
}
