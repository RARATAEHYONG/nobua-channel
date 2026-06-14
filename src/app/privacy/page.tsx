import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1000px] px-6 py-16 sm:px-10 lg:px-16">
        <SectionHeading eyebrow="PRIVACY" title="プライバシーポリシー" />
        <div className="mt-10 space-y-8 font-jp text-sm leading-8 text-white/65">
          <p>
            のぶあチャンネル公式サイトでは、お問い合わせ対応やサイト改善のために必要な範囲で情報を取り扱います。
          </p>
          <section>
            <h2 className="mb-3 text-lg font-bold text-white">個人情報の利用目的</h2>
            <p>
              お問い合わせへの返信、グッズに関する連絡、サイト運営上必要な確認のために利用します。
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-bold text-white">外部サービス</h2>
            <p>
              本サイトではYouTube、Instagram、TikTokなど外部サービスへのリンクや公開情報の表示を行う場合があります。
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-bold text-white">お問い合わせ</h2>
            <p>
              個人情報の取り扱いに関するご連絡は、CONTACTページまたは公式SNSよりお願いいたします。
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
