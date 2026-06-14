import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { GOODS_ITEMS } from "@/data/site";

type GoodsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return GOODS_ITEMS.map((item) => ({ slug: item.slug }));
}

export default async function GoodsDetailPage({
  params,
}: GoodsDetailPageProps) {
  const { slug } = await params;
  const item = GOODS_ITEMS.find((goodsItem) => goodsItem.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <ProductDetail item={item} />
      </main>
      <Footer />
    </>
  );
}
