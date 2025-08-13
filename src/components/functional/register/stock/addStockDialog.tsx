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
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function EditStockDialog({
  trigger,
  name,
  stock,
  setStock
}: {
  trigger: ReactNode;
  name: string;
  stock: number;
  setStock: (stock: number) => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const formSchema = z.object({
    stock: z
      .number()
      .int()
      .min(0, "0以上の値を入力して下さい")
      .max(Number.MAX_SAFE_INTEGER, "数が大きすぎます")
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(v => {
              setStock(stock + v.stock);
            })}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>追加数</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="追加数"
                        {...field}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
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
