"use client";

import AccessError from "@/components/accessError";
import AddCommodityDialog from "@/components/functional/register/stock/addCommodityDialog";
import AddStockDialog from "@/components/functional/register/stock/addStockDialog";
import EditCategoryDialog from "@/components/functional/register/stock/editCategoryDialog";
import EditStockDialog from "@/components/functional/register/stock/editStockDialog";
import Loading from "@/components/ui-element/loading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/columnHeader";
import { auth, db } from "@/firebase";
import { useError } from "@/hooks/useError";
import { cn } from "@/lib/utils";
import { CommodityType, StallInfo } from "@/types/stallInfo";
import { ColumnDef } from "@tanstack/react-table";
import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";

export default function StockPage() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [commodities, commoditiesLoading, commoditiesError] = useObjectVal<
    StallInfo["commodities"]
  >(ref(db, `stalls/${userInfo?.stallId}/commodities`));
  const [categories, categoriesLoading, categoriesError] = useObjectVal<
    StallInfo["category"]
  >(ref(db, `stalls/${userInfo?.stallId}/category`));
  useError(error, userInfoError, commoditiesError, categoriesError);
  const columns: ColumnDef<{
    id: string;
    name: string;
    price: number;
    stock: number;
    category?: string;
  }>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="商品名" />
      )
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="値段" />
      )
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="在庫数" />
      ),
      cell: ({ row }) => (
        <p className="flex items-center gap-2">
          {row.getValue("stock") == 0 && (
            <span className="text-lg text-red-600">!</span>
          )}
          <span
            className={cn(
              Number(row.getValue("stock")) <= 10 && "text-lg text-red-600"
            )}
          >
            {row.getValue("stock")}
          </span>
        </p>
      )
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="カテゴリ" />
      ),
      cell: ({ row }) => {
        const categoryId = row.getValue("category") as string | undefined;
        const c = categoryId
          ? ((categories as StallInfo["category"]) || {})[categoryId]
          : undefined;
        console.log(categoryId);
        if (!categoryId || categoryId === "none" || !c) return <p>未設定</p>;
        return (
          <div
            className={cn(
              "inline-block rounded-full border px-2 py-1 text-xs",
              (() => {
                switch (c?.color) {
                  case "red":
                    return "border-red-800 bg-red-400";
                  case "yellow":
                    return "border-yellow-800 bg-yellow-400";
                  case "lime":
                    return "border-lime-800 bg-lime-400";
                  case "green":
                    return "border-green-800 bg-green-400";
                  case "emerald":
                    return "border-emerald-800 bg-emerald-400";
                  case "teal":
                    return "border-teal-800 bg-teal-400";
                  case "cyan":
                    return "border-cyan-800 bg-cyan-400";
                  case "sky":
                    return "border-sky-800 bg-sky-400";
                  case "blue":
                    return "border-blue-800 bg-blue-400";
                  case "violet":
                    return "border-violet-800 bg-violet-400";
                  case "purple":
                    return "border-purple-800 bg-purple-400";
                  case "fuchsia":
                    return "border-fuchsia-800 bg-fuchsia-400";
                  case "pink":
                    return "border-pink-800 bg-pink-400";
                  case "rose":
                    return "border-rose-800 bg-rose-400";
                  case "stone":
                    return "border-stone-800 bg-stone-400";
                  case "neutral":
                    return "border-neutral-800 bg-neutral-400";
                  case "zinc":
                    return "border-zinc-800 bg-zinc-400";
                  case "gray":
                    return "border-gray-800 bg-gray-400";
                  case "slate":
                    return "border-slate-800 bg-slate-400";
                  default:
                    return "border-black text-black";
                }
              })()
            )}
          >
            {c?.name}
          </div>
        );
      }
    },
    {
      id: "editStock",
      cell: ({ row }) => (
        <EditStockDialog
          trigger={<Button>編集</Button>}
          name={row.getValue("name")}
          stock={row.getValue("stock")}
          category={row.getValue("category")}
          categories={categories}
          setStock={async stock => {
            await set(
              ref(
                db,
                `stalls/${userInfo?.stallId}/commodities/${row.original.id}/stock`
              ),
              stock
            );
          }}
          setCategory={async category => {
            await set(
              ref(
                db,
                `stalls/${userInfo?.stallId}/commodities/${row.original.id}/category`
              ),
              category
            );
          }}
        />
      )
    },
    {
      id: "addStock",
      cell: ({ row }) => (
        <AddStockDialog
          trigger={<Button>在庫追加</Button>}
          name={row.getValue("name")}
          stock={row.getValue("stock")}
          setStock={async stock => {
            await set(
              ref(
                db,
                `stalls/${userInfo?.stallId}/commodities/${row.original.id}/stock`
              ),
              stock
            );
          }}
        />
      )
    }
  ];
  const data = Object.entries(commodities || {})
    .filter((entry): entry is [string, CommodityType] => {
      const [, value] = entry;
      return (
        typeof value === "object" &&
        value !== null &&
        "name" in value &&
        "price" in value &&
        "stock" in value
      );
    })
    .map(([id, commodity]) => {
      return {
        id,
        name: commodity.name,
        price: commodity.price,
        stock: commodity.stock,
        category: commodity.category
      };
    });
  if (loading || userInfoLoading || commoditiesLoading || categoriesLoading)
    return <Loading />;
  if (!user || !userInfo?.stallId) return <AccessError />;
  return (
    <div className="mx-auto max-w-7xl p-4">
      <h2 className="py-4 text-4xl font-semibold tracking-wide">商品管理</h2>
      <p className="text-muted-foreground mb-6 text-sm leading-6 tracking-wider">
        在庫数の管理と商品の追加が行えます
        <br />※ 商品の名称、金額の編集は整合性が取れなくなるため行えません
      </p>
      <div className="space-y-4">
        <DataTable columns={columns} data={data} />
        <div className="algin-left flex items-center gap-2">
          <AddCommodityDialog
            stallId={userInfo.stallId}
            categories={categories}
          />
          <EditCategoryDialog
            stallId={userInfo.stallId}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}
