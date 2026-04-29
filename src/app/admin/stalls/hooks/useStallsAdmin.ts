"use client";

import { createUUID } from "@/lib/uuid";
import { StallInfo } from "@/types/stallInfo";
import { UserInfo } from "@/types/userInfo";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type AdminStallInfo = StallInfo & {
  stallId: string;
  userCount: number;
};

export function useStallsAdmin() {
  const [stalls, setStalls] = useState<AdminStallInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isAddStallOpen, setIsAddStallOpen] = useState(false);
  const [newStallId, setNewStallId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newPrefix, setNewPrefix] = useState("");

  useEffect(() => {
    if (isAddStallOpen && !newStallId) {
      setNewStallId(createUUID());
    }
  }, [isAddStallOpen, newStallId]);

  const [isEditStallOpen, setIsEditStallOpen] = useState(false);
  const [editStallId, setEditStallId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrefix, setEditPrefix] = useState("");

  const fetchStalls = async () => {
    setIsLoading(true);
    try {
      const [stallsRes, usersRes] = await Promise.all([
        fetch("/api/admin/stalls"),
        fetch("/api/admin/users")
      ]);

      const stallsData = await stallsRes.json();
      const usersData = await usersRes.json();

      if (stallsData.success && stallsData.stalls) {
        const users: UserInfo[] = usersData.success ? usersData.users : [];
        const stallList = Object.entries(stallsData.stalls).map(
          ([key, val]: [string, any]) => ({
            ...val,
            stallId: key,
            name: val.name || "",
            prefix: val.prefix || "",
            userCount: users.filter(u => u.stallId === key).length
          })
        );
        setStalls(stallList as AdminStallInfo[]);
      } else {
        toast.error("店舗一覧の取得に失敗しました");
      }
    } catch {
      toast.error("店舗一覧の取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStalls();
  }, []);

  const handleAddStall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPrefix.length < 1) {
      toast.error("識別記号は1文字以上にしてください");
      return;
    }
    if (stalls.some(s => s.prefix === newPrefix)) {
      toast.error("この識別記号は既に使用されています");
      return;
    }
    try {
      const res = await fetch("/api/admin/stalls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stallId: newStallId,
          name: newName,
          prefix: newPrefix
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("店舗を追加しました");
        setIsAddStallOpen(false);
        setNewStallId(null);
        setNewName("");
        setNewPrefix("");
        fetchStalls();
      } else {
        toast.error(data.error || "店舗の追加に失敗しました");
      }
    } catch {
      toast.error("通信エラーが発生しました");
    }
  };

  const openEditDialog = (stall: AdminStallInfo) => {
    setEditStallId(stall.stallId);
    setEditName(stall.name);
    setEditPrefix(stall.prefix);
    setIsEditStallOpen(true);
  };

  const handleEditStall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editPrefix.length < 1) {
      toast.error("識別記号は1文字以上にしてください");
      return;
    }
    if (
      stalls.some(s => s.prefix === editPrefix && s.stallId !== editStallId)
    ) {
      toast.error("この識別記号は既に使用されています");
      return;
    }
    try {
      // API requires stallId to be identical to update the existing one.
      const res = await fetch("/api/admin/stalls", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stallId: editStallId,
          name: editName,
          prefix: editPrefix
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("店舗情報を更新しました");
        setIsEditStallOpen(false);
        fetchStalls();
      } else {
        toast.error(data.error || "更新に失敗しました");
      }
    } catch {
      toast.error("通信エラーが発生しました");
    }
  };

  const handleDeleteStall = async (stallId: string, name: string) => {
    if (
      !confirm(
        `${name} (${stallId}) を削除しますか？\n（ユーザーが紐付いている場合は削除できません）`
      )
    )
      return;

    try {
      const res = await fetch(`/api/admin/stalls?stallId=${stallId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        toast.success("店舗を削除しました");
        fetchStalls();
      } else {
        toast.error(data.error || "削除に失敗しました");
      }
    } catch {
      toast.error("通信エラーが発生しました");
    }
  };

  let addError: string | null = null;
  if (newName.length < 1) {
    addError = "店舗名を入力してください";
  } else if (newPrefix.length < 1) {
    addError = "識別記号は1文字以上にしてください";
  } else if (stalls.some(s => s.prefix === newPrefix)) {
    addError = "この識別記号は既に使用されています";
  }

  let editError: string | null = null;
  if (editName.length < 1) {
    editError = "店舗名を入力してください";
  } else if (editPrefix.length < 1) {
    editError = "識別記号は1文字以上にしてください";
  } else if (
    stalls.some(s => s.prefix === editPrefix && s.stallId !== editStallId)
  ) {
    editError = "この識別記号は既に使用されています";
  }

  return {
    stalls,
    isLoading,
    addStall: {
      isOpen: isAddStallOpen,
      setIsOpen: setIsAddStallOpen,
      stallId: newStallId,
      setStallId: setNewStallId,
      name: newName,
      setName: setNewName,
      prefix: newPrefix,
      setPrefix: setNewPrefix,
      onSubmit: handleAddStall,
      error: addError
    },
    editStall: {
      isOpen: isEditStallOpen,
      setIsOpen: setIsEditStallOpen,
      stallId: editStallId,
      name: editName,
      setName: setEditName,
      prefix: editPrefix,
      setPrefix: setEditPrefix,
      onSubmit: handleEditStall,
      open: openEditDialog,
      error: editError
    },
    deleteStall: handleDeleteStall
  };
}
