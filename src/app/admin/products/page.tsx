"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddCommodityDialog } from "./_components/AddCommodityDialog";
import { AdminMenuList } from "./_components/AdminMenuList";
import { EditCommodityDialog } from "./_components/EditCommodityDialog";
import { useMenuAdmin } from "./hooks/useMenuAdmin";

export default function ProductsAdminPage() {
  const { stalls, commodities, loading, addCommodity, editCommodity } =
    useMenuAdmin();

  if (loading && !commodities.length) {
    return <div className="p-6">読み込み中...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">商品管理</h1>
        <div className="flex gap-4">
          <AddCommodityDialog
            isOpen={addCommodity.isOpen}
            setIsOpen={addCommodity.setIsOpen}
            submit={addCommodity.submit}
            stalls={stalls}
          />
          <EditCommodityDialog
            isOpen={editCommodity.isOpen}
            setIsOpen={editCommodity.setIsOpen}
            submit={editCommodity.submit}
            editingData={editCommodity.editingData}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>商品一覧</CardTitle>
          <p className="text-sm text-gray-500">
            すべての店舗において登録されている商品を確認できます。金額の変更や削除は非対応です。
          </p>
        </CardHeader>
        <CardContent>
          <AdminMenuList
            commodities={commodities}
            onEdit={editCommodity.open}
          />
        </CardContent>
      </Card>
    </div>
  );
}
