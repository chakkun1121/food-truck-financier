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
        "text-foreground dark:text-background aspect-video h-32 rounded-md p-4 shadow",
        (() => {
          if (categoryName === id) {
            switch (category.color) {
              case "red":
                return "bg-red-300";
              case "yellow":
                return "bg-yellow-200";
              case "lime":
                return "bg-lime-200";
              case "green":
                return "bg-green-200";
              case "emerald":
                return "bg-emerald-300";
              case "teal":
                return "bg-teal-300";
              case "cyan":
                return "bg-cyan-300";
              case "sky":
                return "bg-sky-300";
              case "blue":
                return "bg-blue-300";
              case "violet":
                return "bg-violet-300";
              case "purple":
                return "bg-purple-300";
              case "fuchsia":
                return "bg-fuchsia-300";
              case "pink":
                return "bg-pink-300";
              case "rose":
                return "bg-rose-300";
              case "stone":
                return "bg-stone-300";
              case "neutral":
                return "bg-neutral-300";
              case "zinc":
                return "bg-zinc-300";
              case "gray":
                return "bg-gray-300";
              case "slate":
                return "bg-slate-300";
              default:
                return "bg-primary/50";
            }
          } else {
            switch (category.color) {
              case "red":
                return "bg-red-400";
              case "yellow":
                return "bg-yellow-400";
              case "lime":
                return "bg-lime-400";
              case "green":
                return "bg-green-400";
              case "emerald":
                return "bg-emerald-400";
              case "teal":
                return "bg-teal-400";
              case "cyan":
                return "bg-cyan-400";
              case "sky":
                return "bg-sky-400";
              case "blue":
                return "bg-blue-400";
              case "violet":
                return "bg-violet-400";
              case "purple":
                return "bg-purple-400";
              case "fuchsia":
                return "bg-fuchsia-400";
              case "pink":
                return "bg-pink-400";
              case "rose":
                return "bg-rose-400";
              case "stone":
                return "bg-stone-400";
              case "neutral":
                return "bg-neutral-400";
              case "zinc":
                return "bg-zinc-400";
              case "gray":
                return "bg-gray-400";
              case "slate":
                return "bg-slate-400";
              default:
                return "bg-primary";
            }
          }
        })()
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
