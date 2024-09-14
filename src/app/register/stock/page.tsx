"use client";

import AccessError from "@/components/accessError";
import { CATEGORIES } from "@/components/common/constants";
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
import AddCommodityDialog from "../../../components/functional/register/stock/addCommodityDialog";

export default function StockPage() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [commodities, commoditiesLoading, commoditiesError] = useObjectVal<
    StallInfo["commodities"]
  >(ref(db, `stalls/${userInfo?.stallId}/commodities`));
  useError(error, userInfoError, commoditiesError);
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
        const c = CATEGORIES.find(
          category => category.id === row.getValue("category")
        );
        if (!row.getValue("category") || row.getValue("category") === "none")
          return <p>未設定</p>;
        return (
          <div
            className={cn(
              "inline-block rounded-full border px-2 py-1 text-xs",
              c?.class.text,
              c?.class.border
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
          stock={row.getValue("stock")}
          category={row.getValue("category")}
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
  const data = Object.entries(commodities || {}).map(
    // @ts-ignore
    ([id, commodity]: [id: string, commodity: CommodityType]) => ({
      id,
      name: commodity.name,
      price: commodity.price,
      stock: commodity.stock,
      category: commodity.category
    })
  );
  if (loading || userInfoLoading || commoditiesLoading) return <Loading />;
  if (!user || !userInfo?.stallId) return <AccessError />;
  return (
    <div className="mx-auto max-w-7xl p-4">
      <h2 className="py-4 text-4xl font-semibold tracking-wide">商品管理</h2>
      <p className="mb-6 text-sm leading-6 tracking-wider text-muted-foreground">
        在庫数の管理と商品の追加が行えます
        <br />※ 商品の名称、金額の編集は整合性が取れなくなるため行えません
      </p>
      <div className="space-y-4">
        <DataTable columns={columns} data={data} className="" />
        <AddCommodityDialog stallId={userInfo.stallId} />
      </div>
    </div>
  );
}
