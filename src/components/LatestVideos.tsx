import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import VideoCard from "./VideoCard";
import { getLatestYouTubeVideos } from "@/lib/youtube";

/**
 * "最新動画" section: heading with a "view all" link and a responsive
 * grid of the latest video cards.
 */
export default async function LatestVideos() {
  const videos = await getLatestYouTubeVideos(3);

  return (
    <section
      id="latest-videos"
      className="mx-auto max-w-[1600px] scroll-mt-24 px-6 py-20 sm:px-10 lg:px-16"
    >
      <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="LATEST VIDEOS" title="最新動画" />
        <Link
          href="/videos"
          className="flex items-center gap-2 font-jp text-sm font-bold text-white/70 transition-colors hover:text-accent"
        >
          すべて見る
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {videos.length > 0 ? (
          videos.map((video) => <VideoCard key={video.id} video={video} />)
        ) : (
          <p className="font-jp text-sm text-white/50">
            最新動画を取得できませんでした。
          </p>
        )}
      </div>
    </section>
  );
}
