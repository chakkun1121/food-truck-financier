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
    )
  },
  {
    accessorKey: "commodityName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="商品名" />
    )
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="在庫数" />
    )
  }
];
export function StockSheet({
  stalls
}: {
  stalls: { [key: string]: Partial<StallInfo> | null | undefined } | undefined;
}) {
  const data: Data[] =
    (stalls &&
      Object.entries(stalls)
        .flatMap(([stallId, stall]) =>
          Object.entries(stall?.commodities ?? {}).map(
            ([commodityId, commodity]) => ({
              stallId,
              storeName: stall?.name || "",
              commodityId,
              commodityName: commodity.name,
              stock: commodity.stock
            })
          )
        )
        .sort((a, b) => a.stock - b.stock)) ||
    [];
  return (
    <div className="space-y-2 p-4">
      <h2 className="text-center text-2xl">商品の在庫一覧</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
