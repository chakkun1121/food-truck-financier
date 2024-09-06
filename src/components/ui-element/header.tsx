import Link from "next/link";
import HeaderUser from "./headerUser";
import { ModeToggle } from "../ui/mode-toggle";
export default function Header() {
  return (
    <header className="flex justify-between items-center p-2 fixed w-full h-12">
      <h1 className="text-2xl">
        <Link href="/" prefetch={false}>
          FoodTruck Financier
        </Link>
      </h1>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <HeaderUser />
      </div>
    </header>
  );
}
