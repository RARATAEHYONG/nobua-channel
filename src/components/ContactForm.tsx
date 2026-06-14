"use client";

import { Send } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/nobua2025/";

export default function ContactForm() {
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const subjectParam = params.get("subject");
    const messageParam = params.get("message");

    if (subjectParam) {
      setSubject(subjectParam);
    }

    if (messageParam) {
      setMessage(messageParam);
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = [`お問い合わせ種別：${subject}`, "", message].join("\n");

    try {
      await navigator.clipboard.writeText(body);
      setStatus("内容をコピーしました。Instagramで送信してください。");
    } catch {
      setStatus("Instagramを開きます。内容をコピーして送信してください。");
    }

    window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-16">
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl flex-col gap-8">
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
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="w-full appearance-none border border-white/15 bg-surface px-5 py-4 font-jp text-sm text-white/80 focus:border-accent"
          >
            <option value="general">一般お問い合わせ</option>
            <option value="goods">グッズについて</option>
            <option value="business">お仕事のご相談</option>
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
            rows={7}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="お問い合わせ内容を入力してください..."
            className="w-full resize-none border border-white/15 bg-surface px-5 py-4 font-jp text-sm text-white placeholder:text-white/40 focus:border-accent"
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-accent px-8 py-4 font-jp text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90"
        >
          <Send size={18} aria-hidden="true" />
          Instagramで送信する
        </button>

        {status ? (
          <p className="text-center font-jp text-sm text-white/60">{status}</p>
        ) : (
          <p className="text-center font-jp text-sm text-white/50">
            送信ボタンを押すと内容をコピーし、Instagramを開きます。
          </p>
        )}
      </form>
    </section>
  );
}
