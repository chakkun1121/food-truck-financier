import { cn } from "@/lib/utils";
import { CategoryType } from "@/types/stallInfo";

export default function CategoryCard({
  category,
  itemCount,
  setCategory,
  id
}: {
  category: CategoryType;
  itemCount: number;
  setCategory(category: string): void;
  id: string;
}) {
  if (itemCount === 0) return null;
  return (
    <div
      className={cn(
        "aspect-video h-32 rounded-md p-4 text-foreground dark:text-background",
        "bg-primary",
        category?.color?.bg ? `bg-[${category?.color?.bg}]` : ""
      )}
      onClick={() => setCategory(id)}
    >
      <div className="flex h-full flex-col justify-between">
        {/* <category.icon size={25} /> */}
        <div>
          <h6 className="text-lg font-bold">{category.name}</h6>
          <p className="text-sm">{itemCount} items</p>
        </div>
      </div>
    </div>
  );
}
