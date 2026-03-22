import Header from "@/components/ui-elements/header";
import type { Metadata, Viewport } from "next";
import "./globals.css";

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
  return (
    <html lang="ja" className="font-sans">
      <body className="min-h-full select-none">
        <Header />
        {children}
      </body>
    </html>
  );
}
