"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddStallDialog } from "./_components/AddStallDialog";
import { EditStallDialog } from "./_components/EditStallDialog";
import { StallListTable } from "./_components/StallListTable";
import { useStallsAdmin } from "./hooks/useStallsAdmin";

export default function StallsAdminPage() {
  const { stalls, addStall, editStall, deleteStall } = useStallsAdmin();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">店舗 (屋台) 管理</h1>
        <div className="flex gap-4">
          <AddStallDialog {...addStall} onOpenChange={addStall.setIsOpen} />
          <EditStallDialog {...editStall} onOpenChange={editStall.setIsOpen} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>店舗一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <StallListTable
            stalls={stalls}
            onEdit={editStall.open}
            onDelete={deleteStall}
          />
        </CardContent>
      </Card>
    </div>
  );
}
