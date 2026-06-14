import { Send } from "lucide-react";

/**
 * Contact form section: subject dropdown and message textarea with a
 * submit button. Matches the "CONTACT" page form fields shown in the
 * design (select + message + send button + response-time note).
 */
export default function ContactForm() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="subject"
            className="font-jp text-sm font-bold text-white/80"
          >
            お問い合わせ種別
          </label>
          <select
            id="subject"
            name="subject"
            defaultValue=""
            className="w-full appearance-none border border-white/15 bg-surface px-5 py-4 font-jp text-sm text-white/60 focus:border-accent"
          >
            <option value="" disabled>
              選択してください
            </option>
            <option value="general">一般的なお問い合わせ</option>
            <option value="goods">グッズについて</option>
            <option value="business">お仕事のご依頼</option>
            <option value="other">その他</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="font-jp text-sm font-bold text-white/80"
          >
            メッセージ <span className="text-accent">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="お問い合わせ内容をご記入ください..."
            className="w-full resize-none border border-white/15 bg-surface px-5 py-4 font-jp text-sm text-white placeholder:text-white/40 focus:border-accent"
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-accent px-8 py-4 font-jp text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90"
        >
          <Send size={18} aria-hidden="true" />
          送信する
        </button>

        <p className="text-center font-jp text-sm text-white/50">
          通常2〜3営業日以内にご返信いたします
        </p>
      </div>
    </section>
  );
}
