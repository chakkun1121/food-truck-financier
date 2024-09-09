import type { Metadata, Viewport } from "next";
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
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "FoodTruck Financier",
    template: "%s | FoodTruck Financier",
  },
  robots: {
    index: false,
  },
};
export const viewport: Viewport = {
  themeColor: "#ff9933",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
