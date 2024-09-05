"use client";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/columnHeader";
import { StallInfo } from "@/types/stallInfo";
import { ColumnDef } from "@tanstack/react-table";
type Data = {
  stallId: string;
  storeName: string;
  commodityId: string;
  commodityName: string;
  stock: number;
};

const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "storeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="店舗名" />
    ),
  },
  {
    accessorKey: "commodityName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="商品名" />
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="在庫数" />
    ),
  },
];
export function StockSheet({
  stalls,
}: {
  stalls: { [key: string]: StallInfo };
}) {
  // 在庫数が10件以下のリスト
  const data: Data[] = Object.entries(stalls)
    .flatMap(([stallId, stall]) =>
      Object.entries(stall.commodities ?? {}).map(
        ([commodityId, commodity]) => ({
          stallId,
          storeName: stall.name,
          commodityId,
          commodityName: commodity.name,
          stock: commodity.stock,
        })
      )
    )
    .filter(d => d.stock <= 10);
  return (
    <div className="p-4 space-y-2">
      <h2 className="text-2xl text-center">在庫10件以下の商品</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
