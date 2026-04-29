"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clientFirebase } from "@/firebase/client";
import { AddUserDialog } from "./_components/AddUserDialog";
import { BulkUploadDialog } from "./_components/BulkUploadDialog";
import { EditUserDialog } from "./_components/EditUserDialog";
import { UserListTable } from "./_components/UserListTable";
import { useUsersAdmin } from "./hooks/useUsersAdmin";

export default function UsersAdminPage() {
  const { users, stalls, addUser, editUser, bulkUpload, deleteUser } =
    useUsersAdmin();

  const currentUser = clientFirebase.auth.currentUser;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ユーザー管理</h1>
        <div className="flex gap-4">
          <AddUserDialog
            stalls={stalls}
            {...addUser}
            onOpenChange={addUser.setIsOpen}
          />
          <BulkUploadDialog {...bulkUpload} />
          <EditUserDialog
            stalls={stalls}
            {...editUser}
            onOpenChange={editUser.setIsOpen}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ユーザー一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <UserListTable
            users={users}
            currentUid={currentUser?.uid}
            onEdit={editUser.open}
            onDelete={deleteUser}
          />
        </CardContent>
      </Card>
    </div>
  );
}
