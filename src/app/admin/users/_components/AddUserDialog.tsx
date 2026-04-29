import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Stall } from "../hooks/useUsersAdmin";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  stallId: string;
  setStallId: (val: string) => void;
  stalls: Stall[];
  onSubmit: (e: React.FormEvent) => void;
};

export function AddUserDialog({
  isOpen,
  onOpenChange,
  email,
  setEmail,
  password,
  setPassword,
  stallId,
  setStallId,
  stalls,
  onSubmit
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>新規ユーザー追加</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ユーザーを追加</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              type="text"
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              type="password"
              minLength={6}
            />
          </div>
          <div className="space-y-2">
            <Label>Stall (店舗)</Label>
            <Select value={stallId} onValueChange={setStallId} required>
              <SelectTrigger>
                <SelectValue placeholder="店舗を選択..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">【システム管理者】</SelectItem>
                <SelectItem value="none">【未設定】</SelectItem>
                {stalls.map(stall => (
                  <SelectItem key={stall.id} value={stall.id}>
                    {stall.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            追加する
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
