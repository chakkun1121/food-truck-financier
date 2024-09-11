"use client";

import AccessError from "@/components/accessError";
import EditStockDialog from "@/components/functional/register/stock/editStockDialog";
import Loading from "@/components/ui-element/loading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/columnHeader";
import { auth, db } from "@/firebase";
import { cn } from "@/lib/utils";
import { CommodityType, StallInfo } from "@/types/stallInfo";
import { ColumnDef } from "@tanstack/react-table";
import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import AddCommodityDialog from "../../../components/functional/register/stock/addCommodityDialog";
import { useError } from "@/hooks/useError";

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
  }>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="商品名" />
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="値段" />
      ),
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="在庫数" />
      ),
      cell: ({ row }) => (
        <p className="flex gap-2 items-center">
          {row.getValue("stock") == 0 && (
            <span className="text-red-600 text-lg">!</span>
          )}
          <span
            className={cn(
              Number(row.getValue("stock")) <= 10 && "text-red-600 text-lg"
            )}>
            {row.getValue("stock")}
          </span>
        </p>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <EditStockDialog
          trigger={<Button>編集</Button>}
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
      ),
    },
  ];
  const data = Object.entries(commodities || {}).map(
    // @ts-ignore
    ([id, commodity]: [id: string, commodity: CommodityType]) => ({
      id,
      name: commodity.name,
      price: commodity.price,
      stock: commodity.stock,
    })
  );
  if (loading || userInfoLoading || commoditiesLoading) return <Loading />;
  if (!user || !userInfo?.stallId) return <AccessError />;
  return (
    <>
      <h2 className="text-2xl text-center p-4">在庫、商品管理</h2>
      <div className="p-4 max-w-7xl mx-auto space-y-4">
        <DataTable columns={columns} data={data} className="" />
        <AddCommodityDialog stallId={userInfo.stallId} />
      </div>
    </>
  );
}
