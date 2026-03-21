import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 py-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:grid-cols-2 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {[
        {
          href: "/register",
          title: "レジシステム",
          description:
            "レジ打ち用のシステムです。主に店で顧客からの注文を受けるときに利用します"
        },
        {
          href: "/orders",
          title: "注文情報",
          description:
            "注文情報確認ページです。主に店の裏で商品を準備するために利用します"
        },
        {
          href: "/receive",
          title: "受け取り商品表示画面",
          description:
            "受け取り準備が終わった番号を表示する画面です。主にディスプレイで準備が終わった番号を表示して顧客に知らせるために利用します"
        },
        {
          href: "/stock",
          title: "在庫、商品管理",
          description:
            "在庫や商品を管理するための画面です。主に商品の追加や在庫の確認、売上の確認などに利用します"
        },
        {
          href: "/settings",
          title: "設定",
          description: "アカウント情報の変更ができます"
        },
        {
          href: "https://chakkun1121.github.io/food-truck-financier/",
          target: "_blank",
          title: "ドキュメント",
          description:
            "このアプリの使い方などが書いてあるドキュメントサイトです"
        },
        {
          href: "/admin",
          title: "管理者機能",
          description: "アプリ全体の設定など管理者用機能です"
        },
        {
          href: "/dashboard",
          title: "ダッシュボード",
          description:
            "売上や在庫の推移などをグラフで確認できる画面です。デフォルトでは管理者用となっています"
        }
      ].map(item => (
        <a
          href={item.href}
          className="block"
          target={item.target}
          key={item.href}
        >
          <Card className="@container/card">
            <CardHeader>
              <CardTitle className="py-4 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardFooter>
              <CardDescription>{item.description}</CardDescription>
            </CardFooter>
          </Card>
        </a>
      ))}
    </div>
  );
}
