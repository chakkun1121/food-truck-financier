import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import HeaderUser from "./headerUser";
export default function AdminHeader() {
  return (
    <header className="fixed flex h-12 w-full items-center justify-between p-2">
      <h1 className="text-2xl">
        <Link href="/admin/" prefetch={false}>
          FoodTruck Financier (管理コンソール)
        </Link>
      </h1>
      <div className="flex items-center gap-2">
        <HeaderUser />
        <ModeToggle />
      </div>
    </header>
  );
}
