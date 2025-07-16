import Dashboard from "@/components/functional/dashboard";
import Header from "@/components/ui-element/registerHeader";
import { Metadata } from "next";

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto h-dvh max-w-7xl space-y-4 p-4 pt-12">
        <Dashboard />
      </main>
    </>
  );
}
export const metadata: Metadata = {
  title: "ダッシュボード"
};
