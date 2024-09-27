import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { StallInfo } from "@/types/stallInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function EditStockDialog({
  trigger,
  name,
  categories,
  stock,
  category,
  setStock,
  setCategory
}: {
  trigger: ReactNode;
  name: string;
  categories: StallInfo["category"];
  stock: number;
  category: string;
  setStock: (stock: number) => Promise<void>;
  setCategory: (category: string) => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const formSchema = z.object({
    stock: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER),
    category: z.string().optional()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { stock, category }
  });

  return (
    <Dialog open={isOpen} onOpenChange={o => setIsOpen(o)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>商品の編集</DialogTitle>
          <DialogDescription>
            在庫の編集とカテゴリの変更ができます
            カテゴリはレジ画面での表示に影響します
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>{name}</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(v => {
              setStock(v.stock);
              setCategory(v.category ?? "");
            })}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>在庫数</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="在庫数"
                        {...field}
                        onChange={(event: any) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      在庫の数が把握できない場合は大きい数値を入力してください
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>カテゴリ</FormLabel>
                    <Select onValueChange={field.onChange} {...field}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="未選択" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">未選択</SelectItem>
                        {Object.entries(categories || {}).map(
                          ([id, category]) => (
                            <SelectItem key={id} value={id}>
                              {category.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      商品数が多い場合にカテゴリを設定することを推奨します
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-6">
              <Button onClick={() => setIsOpen(false)} variant={"outline"}>
                キャンセル
              </Button>
              <Button type="submit">保存</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
