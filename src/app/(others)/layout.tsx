import Header from "@/components/ui-element/header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="h-screen pt-12">{children}</main>
    </>
  );
}
