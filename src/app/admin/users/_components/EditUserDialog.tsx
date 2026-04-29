import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  roleType: "admin" | "stall" | "none";
  setRoleType: (val: "admin" | "stall" | "none") => void;
  stallId: string;
  setStallId: (val: string) => void;
  stalls: Stall[];
  onSubmit: (e: React.FormEvent) => void;
};

export function EditUserDialog({
  isOpen,
  onOpenChange,
  email,
  setEmail,
  password,
  setPassword,
  roleType,
  setRoleType,
  stallId,
  setStallId,
  stalls,
  onSubmit
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ユーザーの編集</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label>Password (変更する場合のみ入力・6文字以上)</Label>
            <Input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="変更しない場合は空欄"
            />
          </div>
          <div className="space-y-2 pt-2">
            <Label>権限・所属</Label>
            <RadioGroup
              value={roleType}
              onValueChange={(val: any) => setRoleType(val)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="r-admin" />
                <Label htmlFor="r-admin">管理者 (店舗接続なし)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stall" id="r-stall" />
                <Label htmlFor="r-stall">店舗スタッフ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="r-none" />
                <Label htmlFor="r-none">未設定 (無効状態)</Label>
              </div>
            </RadioGroup>
          </div>

          {roleType === "stall" && (
            <div className="space-y-2 pl-6">
              <Label>所属店舗を選択</Label>
              <Select value={stallId} onValueChange={setStallId} required>
                <SelectTrigger>
                  <SelectValue placeholder="店舗を選択..." />
                </SelectTrigger>
                <SelectContent>
                  {stalls.map(stall => (
                    <SelectItem key={stall.id} value={stall.id}>
                      {stall.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button type="submit" className="w-full">
            更新する
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
