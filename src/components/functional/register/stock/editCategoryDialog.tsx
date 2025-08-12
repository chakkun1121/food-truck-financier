"use client";
import AddCategoryDialog from "@/components/functional/register/stock/addCategoryDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { db } from "@/firebase";
import { StallInfo } from "@/types/stallInfo";
import { ref, set } from "firebase/database";
import { Trash } from "lucide-react";

export default function EditCategoryDialog({
  stallId,
  categories
}: {
  stallId: string;
  categories: StallInfo["category"];
}) {
  const categoryArray = Object.entries(categories || {}).map(
    ([key, value]) => ({
      id: key,
      name: value.name,
      color: value.color
    })
  );

  function removeCategory(categoryId: string) {
    set(ref(db, `stalls/${stallId}/category/${categoryId}`), {});
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>カテゴリーを編集</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>カテゴリー編集</DialogTitle>
          <DialogDescription>
            カテゴリーの追加、編集、削除ができます
          </DialogDescription>
        </DialogHeader>

        {categoryArray &&
          categoryArray.map(category => (
            <div key={category.id} className="flex items-center gap-2">
              <p className="flex-1">{category.name}</p>
              <AddCategoryDialog
                categories={categories}
                stallId={stallId}
                categoryId={category.id}
              />
              <Button
                className="flex-none p-2"
                onClick={() => removeCategory(category.id)}
              >
                <Trash size={16} />
              </Button>
            </div>
          ))}
        <AddCategoryDialog
          stallId={stallId}
          categories={categories}
          categoryId={undefined}
        />
      </DialogContent>
    </Dialog>
  );
}
