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
    "切なく感情を込めた歌声で、歌ってみたやオリジナルソングを届けるシンガー・のぶあの公式サイト。最新動画、ライブ情報、チャンネル投稿、公式グッズを掲載しています。",
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
