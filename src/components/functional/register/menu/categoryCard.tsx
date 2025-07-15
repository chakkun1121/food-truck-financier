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
  return (
    <div
      className={cn(
        "text-foreground dark:text-background aspect-video h-32 rounded-md p-4",
        "bg-primary"
      )}
      style={
        categoryName === id
          ? { backgroundColor: category?.color?.bg, opacity: 0.5 }
          : { backgroundColor: category?.color?.bg }
      }
      onClick={() => setCategoryName(id)}
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
