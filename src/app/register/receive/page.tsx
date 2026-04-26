import Receive from "@/app/register/receive/_components";
import { Metadata } from "next";

export default function ReceivePage() {
  return (
    <section className="flex flex-wrap gap-4 p-4">
      <Receive />
    </section>
  );
}
export const metadata: Metadata = {
  title: "受取画面"
};
