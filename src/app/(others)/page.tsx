import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-4">
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl">FoodTruck Financierについて</h2>
        <p>
          このアプリは屋台の総合会計アプリです。レジ打ち、注文管理、在庫管理、売上管理などができます。
        </p>
      </section>
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl">リンク</h2>
        <ul className="list-disc list-inside underline">
          <li>
            <Link href="/register">レジ</Link>
          </li>
          <li>
            <Link href="/register/orders">注文情報</Link>
          </li>
          <li>
            <Link href="/register/receive">受取管理</Link>
          </li>
          <li>
            <Link href="/register/stock">在庫、商品管理</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
