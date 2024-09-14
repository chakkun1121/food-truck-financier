import { CATEGORIES } from "@/components/common/constants";
import { cn } from "@/lib/utils";

export default function CategoryCard({
  category,
  itemCount,
  setCategory
}: {
  category: (typeof CATEGORIES)[number];
  itemCount: number;
  setCategory(category: string | null): void;
}) {
  if (itemCount === 0) return null;
  return (
    <div
      className={cn(
        "h-32 w-48 rounded-md p-4 text-foreground dark:text-background",
        category.class.bg
      )}
      onClick={() => setCategory(category.id)}
    >
      <div className="flex h-full flex-col justify-between">
        <category.icon size={25} />
        <div>
          <h6 className="text-lg font-bold">{category.name}</h6>
          <p className="text-sm">{itemCount} items</p>
        </div>
      </div>
    </div>
  );
}
