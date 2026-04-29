import { CommodityType } from "@/types/stallInfo";
import { useCallback, useEffect, useState } from "react";

export type StallInfoWithId = {
  stallId: string;
  name: string;
  prefix: string;
};

export type CommodityWithId = CommodityType & {
  stallId: string;
  stallName: string;
  commodityId: string;
};

export function useMenuAdmin() {
  const [stalls, setStalls] = useState<StallInfoWithId[]>([]);
  const [commodities, setCommodities] = useState<CommodityWithId[]>([]);
  const [loading, setLoading] = useState(false);

  // Dialog states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCommodity, setEditingCommodity] =
    useState<CommodityWithId | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const stallsRes = await fetch("/api/admin/stalls");
      const stallsData = await stallsRes.json();
      const stallList = Object.entries(stallsData.stalls || {}).map(
        ([id, data]: any) => ({
          stallId: id,
          ...data
        })
      );
      setStalls(stallList);

      const menuRes = await fetch("/api/admin/commodities");
      const menuData = await menuRes.json();

      const combinedCommodities: CommodityWithId[] = [];
      for (const [sId, sData] of Object.entries(menuData.commodities || {})) {
        const stallName =
          stallList.find(s => s.stallId === sId)?.name || "不明な店舗";
        for (const [cId, cData] of Object.entries(
          sData as Record<string, CommodityType>
        )) {
          combinedCommodities.push({
            ...(cData as CommodityType),
            stallId: sId,
            stallName,
            commodityId: cId
          });
        }
      }
      setCommodities(combinedCommodities);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addCommodity = async (data: any) => {
    const res = await fetch("/api/admin/commodities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!result.success) throw new Error(result.error);
    await fetchData();
    setIsAddOpen(false);
  };

  const editCommodity = async (data: any) => {
    const res = await fetch("/api/admin/commodities", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!result.success) throw new Error(result.error);
    await fetchData();
    setIsEditOpen(false);
    setEditingCommodity(null);
  };

  const openEdit = (commodity: CommodityWithId) => {
    setEditingCommodity(commodity);
    setIsEditOpen(true);
  };

  return {
    stalls,
    commodities,
    loading,
    addCommodity: {
      isOpen: isAddOpen,
      setIsOpen: setIsAddOpen,
      submit: addCommodity
    },
    editCommodity: {
      isOpen: isEditOpen,
      setIsOpen: setIsEditOpen,
      submit: editCommodity,
      open: openEdit,
      editingData: editingCommodity
    }
  };
}
