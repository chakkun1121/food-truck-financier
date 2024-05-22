import type { Metadata } from "next";
import "./globals.css";
import firebase from "firebase/compat/app";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "FoodTruck Financier",
    template: "%s | FoodTruck Financier",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", () => {
      console.log("Disconnecting from Firebase");
      firebase.database().goOffline();
    });
  }
  return (
    <html lang="ja">
      <body className="select-none min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
