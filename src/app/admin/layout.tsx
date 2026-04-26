import AdminHeader from "@/components/ui-element/adminHeader";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminHeader />
      <main className="mx-auto h-dvh max-w-7xl space-y-4 p-4 pt-12">
        {children}
      </main>
    </>
  );
}
