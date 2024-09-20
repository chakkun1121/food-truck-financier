import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Poppins } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import firebase from "firebase/compat/app";

import "@/lib/customErrorMap";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  adjustFontFallback: false,
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-noto-sans-jp"
});

export const metadata: Metadata = {
  title: {
    default: "FoodTruck Financier",
    template: "%s | FoodTruck Financier"
  },
  robots: {
    index: false
  }
};
export const viewport: Viewport = {
  themeColor: "#ff9933"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", () => {
      // biome-ignore lint/suspicious/noConsoleLog: <explanation>
      console.log("Disconnecting from Firebase");
      firebase.database().goOffline();
    });
  }

  return (
    <html lang="ja">
      <body
        className={cn(
          "min-h-screen select-none",
          `${poppins.variable} ${notoSansJP.variable} font-sans`
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
