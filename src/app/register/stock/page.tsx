"use client";

import AccessError from "@/components/accessError";
import AddCommodityDialog from "@/components/functional/register/stock/addCommodityDialog";
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
        const c = Object.entries(
          (categories as StallInfo["category"]) || {}
        ).find(([id]) => id === row.getValue("category"))?.[1];
        if (!row.getValue("category") || row.getValue("category") === "none")
          return <p>未設定</p>;
        return (
          <div
            className={cn(
              "inline-block rounded-full border px-2 py-1 text-xs",
              c?.color?.text ? `text-[${c?.color.text}]` : "text-black",
              c?.color?.border ? `border-[${c?.color.border}]` : "border-black"
            )}
          >
            {c?.name}
          </div>
        );
      }
    },
    {
      id: "actions",
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
        <DataTable columns={columns} data={data} className="" />
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
