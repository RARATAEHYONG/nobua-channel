import Link from "next/link";
import SectionHeading from "./SectionHeading";
import GoodsCard from "./GoodsCard";
import { GOODS_ITEMS } from "@/data/site";

export default function OfficialGoods() {
  return (
    <section
      id="official-goods"
      className="mx-auto max-w-[1600px] scroll-mt-24 px-6 py-20 sm:px-10 lg:px-16"
    >
      <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="OFFICIAL GOODS" title="公式グッズ" />
        <p className="font-jp text-sm text-white/50">
          のぶあチャンネルのオリジナルグッズです。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {GOODS_ITEMS.map((item) => (
          <GoodsCard key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-6 text-center">
        <p className="font-jp text-sm text-white/50">
          在庫数や発送時期については、お問い合わせ時にご案内します。
        </p>
        <Link
          href="/goods"
          className="border border-white/20 px-10 py-4 font-jp text-sm font-bold tracking-wide transition-colors hover:border-white/50"
        >
          すべてのグッズを見る
        </Link>
      </div>
    </section>
  );
}
