import type { Metadata } from "next";
import "./globals.css";
import firebase from "firebase/compat/app";
import { Toaster } from "@/components/ui/sonner";
import { Noto_Sans_JP } from "next/font/google";
import { cn } from "@/lib/utils";
const noto = Noto_Sans_JP({
  weight: ["400", "700"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FoodTruck Financier",
    template: "%s | FoodTruck Financier",
  },
  robots: {
    index: false,
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
      <body className={cn("select-none min-h-screen", noto.className)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
