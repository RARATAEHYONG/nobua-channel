import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { FOOTER_NAV_LINKS } from "@/data/site";
import { getYouTubeChannel } from "@/lib/youtube";

const CHANNEL_URL = "https://www.youtube.com/channel/UCfiCrUkkcrlJO_JflFKgBow";
const INSTAGRAM_URL = "https://www.instagram.com/nobua2025/";
const TIKTOK_URL = "https://www.tiktok.com/@userww82jx4duf";

type SocialIconProps = {
  size?: number;
  className?: string;
};

function TikTokIcon({ size = 18, className = "" }: SocialIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 3v11.5a4.5 4.5 0 1 1-4.5-4.5" />
      <path d="M14 3c.7 3.5 2.7 5.5 6 6" />
    </svg>
  );
}

export default async function Footer() {
  const channel = await getYouTubeChannel();
  const channelTitle = channel?.title ?? "のぶあチャンネル";
  const subscriberText = channel
    ? `${channel.subscriberCount}人が登録中`
    : "チャンネル登録受付中";

  const socialLinks = [
    { label: "YouTube", href: CHANNEL_URL, Icon: Youtube },
    { label: "TikTok", href: TIKTOK_URL, Icon: TikTokIcon },
    { label: "Instagram", href: INSTAGRAM_URL, Icon: Instagram },
  ];

  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-16 sm:px-10 md:grid-cols-3 lg:px-16">
        <div className="flex flex-col gap-6">
          <div className="h-12 w-20 overflow-hidden bg-transparent">
            <img
              src="/images/nobua-logo-transparent.png"
              alt="Nobua logo"
              width={160}
              height={96}
              className="h-full w-full object-contain object-left"
            />
          </div>
          <p className="max-w-xs font-jp text-sm leading-relaxed text-white/50">
            切なく感情を込めた歌声で、歌ってみたやオリジナルソングを届けるシンガー・のぶあの公式サイト。
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-accent hover:text-accent"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-sans text-xs font-bold tracking-[0.25em] text-white/40">
            NAVIGATION
          </h3>
          <nav className="flex flex-col gap-3">
            {FOOTER_NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-sans text-sm font-bold tracking-widest text-white/70 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-sans text-xs font-bold tracking-[0.25em] text-white/40">
            YOUTUBE
          </h3>
          <div className="flex flex-col gap-5 border border-white/10 bg-surface p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-accent">
                <Youtube size={18} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="font-jp text-sm font-bold">{channelTitle}</p>
                <p className="font-jp text-xs text-white/50">
                  {subscriberText}
                </p>
              </div>
            </div>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-accent px-4 py-3 font-jp text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90"
            >
              チャンネル登録する →
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <p className="font-jp text-sm text-white/40">
            © 2026 のぶあチャンネル. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="font-jp text-sm text-white/40 transition-colors hover:text-white/70"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/legal"
              className="font-jp text-sm text-white/40 transition-colors hover:text-white/70"
            >
              特定商取引法に基づく表記
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
