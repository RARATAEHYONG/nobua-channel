"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import type { GoodsItem } from "@/data/site";

type ProductDetailProps = {
  item: GoodsItem;
};

const SIZE_DETAILS = [
  {
    size: "S",
    body: "身丈66 / 身幅49 / 肩幅44 / 袖丈19",
    model: "モデル身長目安：163cm",
  },
  {
    size: "M",
    body: "身丈70 / 身幅52 / 肩幅47 / 袖丈20",
    model: "モデル身長目安：170cm",
  },
  {
    size: "L",
    body: "身丈74 / 身幅55 / 肩幅50 / 袖丈22",
    model: "モデル身長目安：179cm",
  },
];

export default function ProductDetail({ item }: ProductDetailProps) {
  const images = item.images?.length ? item.images : [item.image];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const sizeSummary = useMemo(
    () => SIZE_DETAILS.map((detail) => detail.body).join(" / "),
    [],
  );
  const hasSizes = Boolean(item.sizes?.length);

  return (
    <section className="mx-auto max-w-[1600px] px-6 py-12 sm:px-10 lg:px-16">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
        <Link
          href="/goods"
          className="font-jp text-sm font-bold text-white/50 transition-colors hover:text-white"
        >
          ← グッズ一覧に戻る
        </Link>
        <div className="font-sans text-xs font-bold tracking-widest text-white/40">
          HOME / GOODS / <span className="text-white">{item.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="relative aspect-square overflow-hidden bg-surface">
            {item.badge && (
              <span className="absolute left-0 top-0 z-10 bg-accent px-4 py-2 font-jp text-sm font-bold text-white">
                {item.badge}
              </span>
            )}
            <Image
              src={selectedImage}
              alt={item.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`relative aspect-square overflow-hidden border transition-colors ${
                  selectedImage === image
                    ? "border-accent"
                    : "border-white/10 hover:border-white/40"
                }`}
                aria-label={`${item.name} image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${item.name} thumbnail ${index + 1}`}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="font-jp text-3xl font-black leading-tight text-white sm:text-5xl">
            {item.name}
          </h1>
          <div className="mt-6 flex items-end gap-3">
            <p className="font-sans text-5xl font-black text-accent">
              {item.price}
            </p>
            <p className="pb-1 font-jp text-sm text-white/50">税込 / 送料別</p>
          </div>

          <p className="mt-8 border-t border-white/10 pt-8 font-jp text-base leading-loose text-white/60">
            {item.description}
          </p>

          {hasSizes && (
            <div className="mt-8">
              <p className="mb-4 font-jp text-sm font-bold tracking-wide text-white/60">
                サイズ <span className="ml-2 text-accent">※選択してください</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {item.sizes?.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 w-16 border font-sans text-sm font-bold transition-colors ${
                      selectedSize === size
                        ? "border-accent bg-accent text-white"
                        : "border-white/15 text-white/60 hover:border-white/50 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-[152px_1fr] gap-4">
            <div className="flex h-16 items-center justify-between border border-white/15 px-5">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="text-white/50 transition-colors hover:text-white"
                aria-label="数量を減らす"
              >
                <Minus size={18} />
              </button>
              <span className="font-sans text-lg font-black">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                className="text-white/50 transition-colors hover:text-white"
                aria-label="数量を増やす"
              >
                <Plus size={18} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setAdded(true)}
              className={`flex h-16 items-center justify-center gap-3 font-jp text-base font-bold tracking-wide text-white transition-colors ${
                added ? "bg-green-500" : "bg-accent hover:opacity-90"
              }`}
            >
              {added ? (
                <>
                  <Check size={20} aria-hidden="true" />
                  追加済み
                </>
              ) : (
                <>
                  <ShoppingCart size={20} aria-hidden="true" />
                  カートに追加する
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            className="mt-6 flex h-14 items-center justify-center border border-white/15 font-jp text-sm font-bold tracking-wide text-white transition-colors hover:border-white/50"
          >
            今すぐ購入する →
          </button>

          <div className="mt-8 space-y-1 text-center font-jp text-sm text-white/40">
            {item.shippingNotes?.map((note) => <p key={note}>{note}</p>)}
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <h2 className="font-jp text-lg font-bold text-white">商品詳細</h2>
            <dl className="mt-6 grid gap-4 font-jp text-sm">
              {item.details?.map((detail) => (
                <div
                  key={detail.label}
                  className="grid grid-cols-[72px_1fr] gap-6"
                >
                  <dt className="text-white/40">{detail.label}</dt>
                  <dd className="text-white">{detail.value}</dd>
                </div>
              ))}
              {hasSizes && (
                <div className="grid grid-cols-[72px_1fr] gap-6">
                  <dt className="text-white/40">採寸</dt>
                  <dd className="text-white">{sizeSummary}</dd>
                </div>
              )}
            </dl>
          </div>

          {hasSizes && (
            <div className="mt-8 border-t border-white/10 pt-8">
              <h2 className="font-jp text-lg font-bold text-white">
                サイズ詳細
              </h2>
              <div className="mt-5 space-y-5 font-jp text-sm leading-relaxed text-white/70">
                {SIZE_DETAILS.map((detail) => (
                  <div key={detail.size}>
                    <p className="font-bold text-white">
                      {detail.size}：{detail.body}
                    </p>
                    <p>（{detail.model}）</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
