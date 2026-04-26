import Orders from "@/app/register/orders/_components";
import { Metadata } from "next";

export default function OrdersPage() {
  return <Orders />;
}
export const metadata: Metadata = {
  title: "注文一覧"
};
