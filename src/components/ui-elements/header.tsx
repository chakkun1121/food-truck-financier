import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="border-b">
      <div className="flex p-4">
        <h1 className="block flex-1 text-3xl font-bold">FoodTruck Financier</h1>
        <div className="flex flex-none items-center">
          <Avatar className="">
            <AvatarImage src="" />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
          <div className="ml-2 hidden items-center sm:block">
            <p>テストユーザー</p>
            <p className="text-muted-foreground text-sm">test@example.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
