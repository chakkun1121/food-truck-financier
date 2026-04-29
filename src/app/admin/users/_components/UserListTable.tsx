import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { User } from "../hooks/useUsersAdmin";

type Props = {
  users: User[];
  currentUid?: string;
  onEdit: (user: User) => void;
  onDelete: (email: string) => void;
};

export function UserListTable({ users, currentUid, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>権限 / 所属先</TableHead>
          <TableHead className="text-right">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.uid}>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.isAdmin ? (
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  管理者
                </span>
              ) : user.stallId ? (
                <span>
                  {user.stallName || "不明"} ({user.stallId})
                </span>
              ) : (
                <span className="text-gray-500">未設定</span>
              )}
            </TableCell>
            <TableCell className="space-x-2 text-right">
              <Button variant="outline" onClick={() => onEdit(user)}>
                編集
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDelete(user.email)}
                disabled={
                  (!!user.stallId && user.stallId !== "admin") ||
                  user.uid === currentUid
                }
              >
                削除
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
