import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "のぶあチャンネル | Official Website",
  description:
    "日常vlog、ゲーム実況、料理など多彩なコンテンツをお届けするのぶあチャンネルの公式サイト。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="font-jp bg-background text-white antialiased">
        {children}
      </body>
    </html>
  );
}
