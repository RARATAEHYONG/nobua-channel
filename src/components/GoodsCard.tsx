import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GoodsItem } from "@/data/site";

type GoodsCardProps = {
  item: GoodsItem;
};

const BADGE_STYLES: Record<string, string> = {
  初回限定: "bg-accent text-white",
  NEW: "bg-white text-black",
};

export default function GoodsCard({ item }: GoodsCardProps) {
  const imageFit = item.imageFit === "contain" ? "object-contain" : "object-cover";
  const imageBg = item.imageBackground === "light" ? "bg-white" : "bg-surface";

  return (
    <article className="flex flex-col bg-surface">
      <Link
        href={`/goods/${item.slug}`}
        className={`relative aspect-square w-full overflow-hidden ${imageBg}`}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`${imageFit} transition-transform duration-500 hover:scale-105`}
        />
        {item.badge && (
          <span
            className={`absolute left-0 top-0 px-3 py-1.5 font-jp text-xs font-bold tracking-wide ${BADGE_STYLES[item.badge]}`}
          >
            {item.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-col gap-3 p-5">
        <Link href={`/goods/${item.slug}`}>
          <h3 className="font-jp text-base font-bold leading-snug text-white transition-colors hover:text-accent">
            {item.name}
          </h3>
        </Link>
        <p className="font-sans text-xl font-black text-accent">
          {item.price}
        </p>
        <Link
          href={`/goods/${item.slug}`}
          className="mt-1 flex items-center justify-center gap-2 bg-accent px-4 py-3 font-jp text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90"
        >
          商品詳細を見る
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
