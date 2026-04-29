import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { requireAdminAuth } from "@/lib/auth/serverAuth";
import Link from "next/link";

export default async function AdminDashboard() {
  await requireAdminAuth();

  return (
    <div className="grid gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: "お店(屋台)の管理",
          description: "屋台の追加、編集、削除を行います",
          href: "/admin/stalls"
        },
        {
          title: "商品の管理",
          description: "商品の追加、編集を行います",
          href: "/admin/products"
        },
        {
          title: "ユーザー管理",
          description: "ユーザーの追加、一括登録、削除、店舗連携設定を行います",
          href: "/admin/users"
        },
        {
          title: "ダッシュボード",
          description: "売上やユーザーの動向を確認できます",
          href: "/admin/dashboard"
        },
        // {
        //   title: "各種設定",
        //   description: "アプリ全体やアカウントの設定を行います",
        //   href: "/admin/settings"
        // }
      ].map(section => (
        <Card key={section.href}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href={section.href}>管理画面へ</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
