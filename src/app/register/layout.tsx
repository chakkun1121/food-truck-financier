import Header from "@/components/ui-element/registerHeader";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="h-dvh pt-12">{children}</main>
    </>
  );
}
