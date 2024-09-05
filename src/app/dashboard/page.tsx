import Dashboard from "@/components/functional/dashboard";
import Header from "@/components/ui-element/registerHeader";
import { Metadata } from "next";

export default function Page() {
  return (
    <>
      <Header />
      <main className="h-screen pt-12 p-4 max-w-7xl mx-auto space-y-4">
        <Dashboard />
      </main>
    </>
  );
}
export const metadata: Metadata = {
  title: "ダッシュボード",
};
