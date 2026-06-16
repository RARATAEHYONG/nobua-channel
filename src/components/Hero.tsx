import { Youtube, ShoppingBag, Play } from "lucide-react";
import { CHANNEL_STATS } from "@/data/site";
import type { YouTubeChannel } from "@/lib/youtube";

type HeroProps = {
  channel: YouTubeChannel | null;
};

export default function Hero({ channel }: HeroProps) {
  const subscriberCount = channel?.subscriberCount ?? "24.5";
  const subscriberUnit = channel ? "subscribers" : "万人";
  const stats = channel
    ? [
        { value: channel.videoCount, label: "Videos" },
        { value: channel.viewCount, label: "Views" },
      ]
    : CHANNEL_STATS.slice(0, 2);

  return (
    <section className="relative overflow-hidden bg-grid">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <span className="font-sans text-xs font-bold tracking-[0.25em] text-accent">
              OFFICIAL WEBSITE
            </span>
          </div>

          <div className="mb-6 flex h-44 w-44 items-center justify-center overflow-hidden border border-white/10 bg-background sm:h-56 sm:w-56">
            <img
              src="/images/nobua-logo-banner.png"
              alt="Nobua logo"
              width={224}
              height={224}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="mb-6 flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            <p className="font-jp text-base text-white/80 sm:text-lg">
              歌ってみた / オリジナルソング / シンガー
            </p>
          </div>

          <div className="mb-8 flex items-stretch gap-4 border-l-2 border-accent pl-4">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-6xl font-black leading-none sm:text-7xl">
                  {subscriberCount}
                </span>
                <span className="font-jp text-2xl font-bold text-accent sm:text-3xl">
                  {subscriberUnit}
                </span>
              </div>
              <p className="mt-2 font-jp text-sm text-white/50">
                YouTubeチャンネル登録者数
              </p>
            </div>
          </div>

          <div className="mb-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/videos"
              className="flex items-center justify-center gap-2 bg-accent px-8 py-4 font-jp text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90 sm:text-base"
            >
              <Youtube size={20} aria-hidden="true" />
              最新動画を見る
            </a>
            <a
              href="/goods"
              className="flex items-center justify-center gap-2 border border-white/20 px-8 py-4 font-jp text-sm font-bold tracking-wide text-white transition-colors hover:border-white/50 sm:text-base"
            >
              <ShoppingBag size={20} aria-hidden="true" />
              グッズを見る
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-sans text-2xl font-black sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 font-jp text-xs text-white/50 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-xl overflow-hidden border border-white/10 bg-background">
            <div
              className="absolute right-0 top-0 z-10 h-24 w-24 bg-accent"
              style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-6 -left-6 z-10 h-24 w-24 bg-accent"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
              aria-hidden="true"
            />

            <div className="flex h-full w-full items-center justify-center">
              <img
                src="/images/nobua-hero-vocal.png"
                alt="Nobua recording vocals in a studio"
                width={1200}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 border-t border-white/10 bg-background/80 px-4 py-4 backdrop-blur-sm sm:gap-4 sm:px-6 sm:py-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-accent">
                <Play
                  size={18}
                  className="fill-white text-white"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="font-jp text-base font-bold">のぶあチャンネル</p>
                <p className="font-jp text-sm text-white/50">
                  @のぶあチャンネル
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto hidden max-w-[1600px] px-6 pb-10 sm:px-10 lg:flex lg:px-16">
        <a
          href="#latest-event"
          aria-label="Scroll to latest event notice"
          className="group flex flex-col items-center gap-3"
        >
          <span className="font-sans text-xs font-bold tracking-[0.3em] text-white/40">
            SCROLL
          </span>
          <span
            className="relative flex h-20 w-8 items-center justify-center overflow-hidden"
            aria-hidden="true"
          >
            <span className="scroll-moving-arrow absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center">
              <span className="h-10 w-px bg-accent shadow-[0_0_10px_rgba(229,9,20,0.85)]" />
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
