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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StallInfo } from "@/types/stallInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState, type ChangeEvent } from "react";
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

  const editStockFormSchema = z.object({
    stock: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER),
    category: z.string().optional()
  });
  const editStockForm = useForm<z.infer<typeof editStockFormSchema>>({
    resolver: zodResolver(editStockFormSchema),
    defaultValues: { stock, category }
  });

  const addStockFormSchema = z.object({
    stock: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER)
  });
  const addStockForm = useForm<z.infer<typeof addStockFormSchema>>({
    resolver: zodResolver(addStockFormSchema),
    defaultValues: { stock: 0 }
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
        <Tabs>
          <TabsList>
            <TabsTrigger value="edit">一般編集</TabsTrigger>
            <TabsTrigger value="add">在庫追加</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <Form {...editStockForm}>
              <form
                onSubmit={editStockForm.handleSubmit(v => {
                  setStock(v.stock);
                  setCategory(v.category ?? "");
                })}
              >
                <div className="space-y-4">
                  <FormField
                    control={editStockForm.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>在庫数</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="在庫数"
                            {...field}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
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
                    control={editStockForm.control}
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
          </TabsContent>
          <TabsContent value="add">
            <Form {...addStockForm}>
              <form
                onSubmit={addStockForm.handleSubmit(v => {
                  setStock(stock + v.stock);
                })}
              >
                <FormField
                  control={addStockForm.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>追加在庫数</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="追加在庫数"
                          {...field}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
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
                <DialogFooter className="mt-6">
                  <Button onClick={() => setIsOpen(false)} variant={"outline"}>
                    キャンセル
                  </Button>
                  <Button type="submit">保存</Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
