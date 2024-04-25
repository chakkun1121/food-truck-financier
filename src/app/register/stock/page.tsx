"use client";

import AccessError from "@/components/accessError";
import Loading from "@/components/ui-element/loading";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/columnHeader";
import { auth, db } from "@/firebase";
import { cn } from "@/lib/utils";
import { CommodityType, StallInfo } from "@/types/stallInfo";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { UUID } from "crypto";
import { ref } from "firebase/database";
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
  const columns: ColumnDef<{
    id: UUID;
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
            )}
          >
            {row.getValue("stock")}
          </span>
        </p>
      ),
    },
  ];
  const data = Object.entries(commodities || {}).map(
    // @ts-ignore
    ([id, commodity]: [id: UUID, commodity: CommodityType]) => ({
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
      <h2 className="text-2xl text-center p-4">在庫状況</h2>
      <div className="p-4">
        <DataTable
          columns={columns}
          data={data}
          className="max-w-7xl mx-auto"
        />
      </div>
    </>
  );
}
