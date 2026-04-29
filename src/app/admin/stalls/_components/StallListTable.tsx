import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import type { AdminStallInfo } from "../hooks/useStallsAdmin";

type StallListTableProps = {
  stalls: AdminStallInfo[];
  onEdit: (stall: AdminStallInfo) => void;
  onDelete: (stallId: string, name: string) => void;
};

export function StallListTable({
  stalls,
  onEdit,
  onDelete
}: StallListTableProps) {
  if (stalls.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500">店舗がありません</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>店舗名</TableHead>
            <TableHead>店舗ID</TableHead>
            <TableHead>識別記号 (Prefix)</TableHead>
            <TableHead className="w-37.5">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stalls.map(stall => {
            const hasUsers = (stall.userCount ?? 0) > 0;
            return (
              <TableRow key={stall.stallId}>
                <TableCell>{stall.name}</TableCell>
                <TableCell className="max-w-50 text-xs font-medium break-all">
                  {stall.stallId}
                </TableCell>
                <TableCell>{stall.prefix}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(stall)}
                    >
                      編集
                    </Button>
                    {hasUsers ? (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="inline-block">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled
                              className="cursor-not-allowed text-red-500 opacity-50"
                            >
                              削除
                            </Button>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-60 text-sm">
                          {stall.userCount}
                          人のユーザーがこの店舗に所属しているため、削除できません。先にユーザーの店舗所属を変更または削除してください。
                        </HoverCardContent>
                      </HoverCard>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(stall.stallId, stall.name)}
                        className="text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        削除
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
