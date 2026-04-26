"use client";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/color-radio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { db } from "@/firebase";
import { createUUID } from "@/lib/uuid";
import { StallInfo } from "@/types/stallInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { ref, set } from "firebase/database";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "カテゴリー名を入力してください"),
  color: z.optional(
    z.enum([
      "red",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "stone",
      "neutral",
      "zinc",
      "gray",
      "slate"
    ])
  )
});

export default function AddCategoryDialog({
  categories,
  stallId,
  categoryId
}: {
  categories: StallInfo["category"];
  stallId: string;
  categoryId: string | undefined;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: categoryId
      ? {
          name: categories?.[categoryId]?.name || "",
          color: categories?.[categoryId]?.color
        }
      : {
          name: "",
          color: undefined
        }
  });
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (categoryId && categories?.[categoryId]) {
      form.reset({
        name: categories[categoryId].name,
        color: categories[categoryId].color
      });
    } else {
      form.reset({
        name: "",
        color: undefined
      });
    }
  }, [categories, categoryId, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSaving(true);
    try {
      const payload = {
        name: values.name,
        ...(values.color && { color: values.color })
      };
      if (categoryId) {
        await set(ref(db, `stalls/${stallId}/category/${categoryId}`), payload);
      } else {
        await set(
          ref(db, `stalls/${stallId}/category/${createUUID()}`),
          payload
        );
      }
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("保存に失敗しました");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {categoryId ? (
          <Button className="flex-none p-2">
            <Pencil size={16} />
          </Button>
        ) : (
          <Button>カテゴリーを追加</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>カテゴリーの追加</DialogTitle>
          <DialogDescription>新しいカテゴリーを追加します</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>カテゴリー名</FormLabel>
                    <FormControl>
                      <Input placeholder="カテゴリー名を入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>カテゴリー色</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        {(
                          [
                            "red",
                            "yellow",
                            "lime",
                            "green",
                            "emerald",
                            "teal",
                            "cyan",
                            "sky",
                            "blue",
                            "violet",
                            "purple",
                            "fuchsia",
                            "pink",
                            "rose",
                            "stone",
                            "neutral",
                            "zinc",
                            "gray",
                            "slate"
                          ] as const
                        ).map(color => (
                          <RadioGroupItem key={color} value={color} />
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={saving}>
              {saving ? "保存中..." : categoryId ? "更新" : "追加"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
