import Image from "next/image";
import { ArrowRight, CalendarDays, Heart, MessageCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { getYouTubeActivities } from "@/lib/youtube";

export default async function LatestEventNotice() {
  const [post] = await getYouTubeActivities(1);

  return (
    <section
      id="latest-event"
      className="mx-auto max-w-[1600px] scroll-mt-24 px-6 py-20 sm:px-10 lg:px-16"
    >
      <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="LATEST EVENT" title="最新のイベントのお知らせ" />
        <a
          href="https://www.youtube.com/channel/UCfiCrUkkcrlJO_JflFKgBow/community"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-jp text-sm font-bold text-white/70 transition-colors hover:text-accent"
        >
          チャンネル投稿を見る
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>

      {post ? (
        <article
          className={`grid overflow-hidden border border-white/10 bg-surface/50 ${
            post.thumbnail ? "lg:grid-cols-[0.9fr_1.1fr]" : ""
          }`}
        >
          {post.thumbnail ? (
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative min-h-[280px] overflow-hidden bg-black sm:min-h-[360px] lg:min-h-full"
            >
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
              <span className="absolute left-0 top-0 bg-accent px-4 py-2 font-sans text-xs font-bold tracking-wide text-white">
                {post.type}
              </span>
            </a>
          ) : null}

          <div
            className={`flex flex-col p-6 sm:p-8 lg:p-10 ${
              post.thumbnail ? "" : "mx-auto w-full max-w-4xl"
            }`}
          >
            {!post.thumbnail ? (
              <span className="mb-6 w-fit bg-accent px-4 py-2 font-sans text-xs font-bold tracking-wide text-white">
                {post.type}
              </span>
            ) : null}
            <div className="mb-4 flex items-center gap-2 font-jp text-xs text-white/45">
              <CalendarDays size={15} aria-hidden="true" />
              {post.publishedAt}
            </div>
            <h3 className="font-jp text-2xl font-black leading-snug text-white sm:text-3xl">
              {post.title}
            </h3>
            {post.description ? (
              <p className="mt-6 whitespace-pre-line font-jp text-sm leading-8 text-white/65 sm:text-base">
                {post.description}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-5 font-jp text-xs text-white/45">
              {post.likeCount ? (
                <span className="flex items-center gap-1.5">
                  <Heart size={15} aria-hidden="true" />
                  {post.likeCount}
                </span>
              ) : null}
              {post.commentCount ? (
                <span className="flex items-center gap-1.5">
                  <MessageCircle size={15} aria-hidden="true" />
                  {post.commentCount}
                </span>
              ) : null}
            </div>

            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 bg-accent px-6 py-3 font-jp text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              投稿を開く
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </article>
      ) : (
        <p className="font-jp text-sm text-white/50">
          最新のお知らせを取得できませんでした。
        </p>
      )}
    </section>
  );
}
