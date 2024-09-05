"use client";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/columnHeader";
import { totalAmount } from "@/lib/totalAmount";
import { StallInfo } from "@/types/stallInfo";
import { ColumnDef } from "@tanstack/react-table";
type Data = {
  stallId: string;
  storeName: string;
  sales: number;
};

export function SalesSheet({
  stalls,
}: {
  stalls: { [key: string]: StallInfo };
}) {
  function getSales(stall: StallInfo) {
    return Object.values(stall?.orders ?? {}).reduce(
      (acc, order) => acc + totalAmount(stall.commodities, order),
      0
    );
  }
  const data: Data[] = Object.entries(stalls).map(([stallId, stall]) => ({
    stallId: stallId,
    storeName: stall.name,
    sales: getSales(stall),
  }));
  const columns: ColumnDef<Data>[] = [
    {
      accessorKey: "storeName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="店舗名" />
      ),
    },
    {
      accessorKey: "sales",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="売上金額" />
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("sales"));
        const formatted = new Intl.NumberFormat("ja-JP", {
          style: "currency",
          currency: "JPY",
        }).format(amount);

        return (
          <>
            <div className="text-right font-medium ">{formatted} </div>
            <div
              className="absolute inset-y-1 left-0 bg-primary opacity-40 rounded -z-10"
              style={{
                width: `${
                  (amount / Math.max(...data.map(d => d.sales))) * 100 - 5
                }%`,
              }}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="p-4 space-y-2">
      <h2 className="text-2xl text-center">売上一覧</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
