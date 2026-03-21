import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Noto_Sans_JP, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

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
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={cn("font-sans", inter.variable)}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
