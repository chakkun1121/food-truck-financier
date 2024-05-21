"use client";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import { createUUID } from "@/lib/uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { ref, set } from "firebase/database";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

export default function AddCommodityDialog({ stallId }: { stallId: string }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const formSchema = z.object({
    name: z.string(),
    price: z.number().int().min(0),
    stock: z.number().int().min(0),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    disabled: saving,
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
      toast("エラーが発生しました");
    } finally {
      setSaving(false);
    }
  }
  return (
    <Dialog onOpenChange={o => setOpen(o)} open={open}>
      <DialogTrigger className="mx-auto">
        <Button>
          <PlusIcon />
          商品を追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>商品追加</DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      onChange={(event: any) =>
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
                      onChange={(event: any) =>
                        field.onChange(+event.target.value)
                      }
                    />
                  </FormControl>
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
