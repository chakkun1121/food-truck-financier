"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { db } from "@/firebase";
import { createUUID } from "@/lib/uuid";
import { StallInfo } from "@/types/stallInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@radix-ui/react-icons";
import { ref, set } from "firebase/database";
import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function AddCommodityDialog({
  stallId,
  categories
}: {
  stallId: string;
  categories: StallInfo["category"];
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const formSchema = z.object({
    name: z.string(),
    price: z.number().int().min(0).max(10000),
    stock: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER),
    category: z.string().optional()
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    disabled: saving
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setSaving(true);
    try {
      const commodityId = createUUID();
      await set(
        ref(db, `stalls/${stallId}/commodities/${commodityId}`),
        values
      );
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("エラーが発生しました");
    } finally {
      setSaving(false);
    }
  }
  return (
    <Dialog onOpenChange={o => setOpen(o)} open={open}>
      <DialogTrigger className="mx-auto" asChild>
        <Button>
          <PlusIcon />
          商品を追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>商品追加</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>商品名</FormLabel>
                  <FormControl>
                    <Input placeholder="商品名" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>値段</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="値段"
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
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        field.onChange(+event.target.value)
                      }
                    />
                  </FormControl>
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
            <Button type="submit">保存</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
