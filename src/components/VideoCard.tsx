import Image from "next/image";
import { Eye, Clock } from "lucide-react";
import type { Video } from "@/data/site";

type VideoCardProps = {
  video: Video;
};

/**
 * Single video preview card: thumbnail with category badge and duration,
 * title, and view count / upload date metadata.
 */
export default function VideoCard({ video }: VideoCardProps) {
  const content = (
    <article className="group flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden bg-surface">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-0 top-0 bg-accent px-3 py-1.5 font-jp text-xs font-bold tracking-wide text-white">
          {video.category}
        </span>
        <span className="absolute bottom-3 right-3 rounded-sm bg-black/80 px-2 py-1 font-sans text-xs font-bold tabular-nums text-white">
          {video.duration}
        </span>
      </div>

      <h3 className="mt-4 font-jp text-lg font-bold leading-snug text-white">
        {video.title}
      </h3>

      <div className="mt-3 flex items-center gap-4 font-jp text-sm text-white/50">
        <span className="flex items-center gap-1.5">
          <Eye size={16} aria-hidden="true" />
          {video.views}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={16} aria-hidden="true" />
          {video.postedAt}
        </span>
      </div>
    </article>
  );

  if (video.url) {
    return (
      <a href={video.url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
