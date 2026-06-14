import Image from "next/image";
import { ArrowRight, CalendarDays, Heart, MessageCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { getYouTubeActivities } from "@/lib/youtube";

export default async function ChannelPosts() {
  const posts = await getYouTubeActivities(3);

  return (
    <section className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-16">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="CHANNEL POSTS" title="チャンネル投稿" />
        <a
          href="https://www.youtube.com/channel/UCfiCrUkkcrlJO_JflFKgBow/community"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-jp text-sm font-bold text-white/70 transition-colors hover:text-accent"
        >
          投稿を見る
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-white/10 bg-surface/50 transition-colors hover:border-accent/70"
            >
              {post.thumbnail ? (
                <div className="relative aspect-video overflow-hidden bg-black">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <span className="absolute left-0 top-0 bg-accent px-3 py-1.5 font-sans text-xs font-bold tracking-wide text-white">
                    {post.type}
                  </span>
                </div>
              ) : (
                <div className="border-b border-white/10 p-5">
                  <span className="inline-flex bg-accent px-3 py-1.5 font-sans text-xs font-bold tracking-wide text-white">
                    {post.type}
                  </span>
                </div>
              )}

              <div className="p-5">
                <div className="mb-3 flex items-center gap-2 font-jp text-xs text-white/45">
                  <CalendarDays size={15} aria-hidden="true" />
                  {post.publishedAt}
                </div>
                <h3 className="font-jp text-lg font-bold leading-snug text-white">
                  {post.title}
                </h3>
                {post.description ? (
                  <p className="mt-3 max-h-28 whitespace-pre-line overflow-hidden font-jp text-sm leading-7 text-white/55">
                    {post.description}
                  </p>
                ) : null}
                <div className="mt-5 flex items-center gap-5 font-jp text-xs text-white/45">
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
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="font-jp text-sm text-white/50">
          投稿を取得できませんでした。
        </p>
      )}
    </section>
  );
}
