import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Edit } from "lucide-react";

export function AdminMenuList({ commodities, onEdit }: any) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>店舗名</TableHead>
          <TableHead>商品ID</TableHead>
          <TableHead>商品名</TableHead>
          <TableHead>価格</TableHead>
          <TableHead>在庫</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {commodities.map((item: any) => (
          <TableRow key={`${item.stallId}-${item.commodityId}`}>
            <TableCell>{item.stallName}</TableCell>
            <TableCell>{item.commodityId}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.stock}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                <Edit className="mr-2 h-4 w-4" />
                編集
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
