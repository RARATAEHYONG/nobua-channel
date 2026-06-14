import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";

const rows = [
  ["販売事業者", "のぶあチャンネル"],
  ["販売価格", "各商品ページに税込価格を表示"],
  ["商品代金以外の必要料金", "送料、振込手数料等が発生する場合があります"],
  ["お支払い方法", "個別にご案内します"],
  ["商品の引き渡し時期", "ご注文確認後、準備が整い次第発送します"],
  ["返品・交換", "未使用品に限り、商品到着後14日以内にご相談ください"],
  ["お問い合わせ", "CONTACTページまたは公式SNSよりご連絡ください"],
];

export default function LegalPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1000px] px-6 py-16 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="LEGAL"
          title="特定商取引法に基づく表記"
        />
        <dl className="mt-10 divide-y divide-white/10 border-y border-white/10 font-jp text-sm">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="grid gap-2 py-5 sm:grid-cols-[220px_1fr] sm:gap-8"
            >
              <dt className="font-bold text-white">{label}</dt>
              <dd className="leading-7 text-white/65">{value}</dd>
            </div>
          ))}
        </dl>
      </main>
      <Footer />
    </>
  );
}
