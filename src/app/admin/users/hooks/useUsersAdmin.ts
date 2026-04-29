"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export type User = {
  uid: string;
  email: string;
  stallId: string | null;
  stallName: string | null;
  isAdmin: boolean;
};

export type Stall = {
  id: string;
  name: string;
};

export function useUsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 新規ユーザー追加フォームの状態
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserStallId, setNewUserStallId] = useState("");

  // 一括追加用
  const [csvFile, setCsvFile] = useState<File | null>(null);

  // 編集用ダイアログの状態
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editUserUid, setEditUserUid] = useState<string>("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editRoleType, setEditRoleType] = useState<"admin" | "stall" | "none">(
    "none"
  );
  const [editStallId, setEditStallId] = useState("");

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error("ユーザー一覧の取得に失敗しました");
      }
    } catch {
      toast.error("ユーザー一覧の取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStalls = async () => {
    try {
      const res = await fetch("/api/admin/stalls");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.stalls) {
          setStalls(
            Object.entries(data.stalls).map(([id, s]: any) => ({
              id,
              name: s.name
            }))
          );
        }
      }
    } catch (err) {
      // APIがない場合はスキップ
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStalls();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newUserEmail,
          password: newUserPassword,
          stallId: newUserStallId
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("ユーザーを追加しました");
        setIsAddUserOpen(false);
        setNewUserEmail("");
        setNewUserPassword("");
        setNewUserStallId("");
        fetchUsers();
      } else {
        toast.error(data.error || "ユーザーの追加に失敗しました");
      }
    } catch {
      toast.error("通信エラーが発生しました");
    }
  };

  const openEditDialog = (user: User) => {
    setEditUserUid(user.uid);
    setEditEmail(user.email);
    setEditPassword("");

    if (user.isAdmin) {
      setEditRoleType("admin");
      setEditStallId("");
    } else if (user.stallId && user.stallId !== "admin") {
      setEditRoleType("stall");
      setEditStallId(user.stallId);
    } else {
      setEditRoleType("none");
      setEditStallId("");
    }

    setIsEditDialogOpen(true);
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: editUserUid,
          email: editEmail,
          password: editPassword || undefined,
          roleType: editRoleType,
          stallId: editRoleType === "stall" ? editStallId : undefined
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("ユーザー情報を更新しました");
        setIsEditDialogOpen(false);
        fetchUsers();
      } else {
        toast.error(data.error || "更新に失敗しました");
      }
    } catch {
      toast.error("通信エラーが発生しました");
    }
  };

  const handleBulkUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvFile) return;

    const formData = new FormData();
    formData.append("file", csvFile);

    toast.loading("追加中です...");
    try {
      const res = await fetch("/api/admin/users/bulk", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      toast.dismiss();
      if (data.success) {
        toast.success("一括追加が完了しました");
        setCsvFile(null);
        fetchUsers();
      } else {
        toast.error(data.error || "一括追加に失敗しました");
      }
    } catch {
      toast.dismiss();
      toast.error("通信エラーが発生しました");
    }
  };

  const handleDeleteUser = async (email: string) => {
    if (!confirm(`${email}を削除しますか？`)) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("ユーザーを削除しました");
        fetchUsers();
      } else {
        toast.error(data.error || "削除に失敗しました");
      }
    } catch {
      toast.error("通信エラーが発生しました");
    }
  };

  return {
    users,
    stalls,
    isLoading,
    addUser: {
      isOpen: isAddUserOpen,
      setIsOpen: setIsAddUserOpen,
      email: newUserEmail,
      setEmail: setNewUserEmail,
      password: newUserPassword,
      setPassword: setNewUserPassword,
      stallId: newUserStallId,
      setStallId: setNewUserStallId,
      onSubmit: handleAddUser
    },
    editUser: {
      isOpen: isEditDialogOpen,
      setIsOpen: setIsEditDialogOpen,
      email: editEmail,
      setEmail: setEditEmail,
      password: editPassword,
      setPassword: setEditPassword,
      roleType: editRoleType,
      setRoleType: setEditRoleType,
      stallId: editStallId,
      setStallId: setEditStallId,
      open: openEditDialog,
      onSubmit: handleEditUser
    },
    bulkUpload: {
      csvFile,
      setCsvFile,
      onSubmit: handleBulkUpload
    },
    deleteUser: handleDeleteUser
  };
}
