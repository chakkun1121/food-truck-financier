import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function EditStockDialog({
  trigger,
  stock,
  setStock,
}: {
  trigger: ReactNode;
  stock: number;
  setStock: (stock: number) => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const formSchema = z.object({
    stock: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { stock },
  });
  return (
    <Dialog open={isOpen} onOpenChange={o => setIsOpen(o)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>在庫数を編集</DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(v => setStock(v.stock))}>
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">保存</Button>
              <Button onClick={() => setIsOpen(false)}>キャンセル</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
