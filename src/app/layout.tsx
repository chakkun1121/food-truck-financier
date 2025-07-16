import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import firebase from "firebase/compat/app";

import "@/lib/customErrorMap";

import "./globals.css";

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
      console.log("Disconnecting from Firebase");
      firebase.database().goOffline();
    });
  }

  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-dvh select-none",
          notoSansJP.variable,
          "font-sans"
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
