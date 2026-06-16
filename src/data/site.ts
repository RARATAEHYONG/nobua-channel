export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "HOME", href: "/" },
  { label: "GOODS", href: "/goods" },
  { label: "VIDEOS", href: "/videos" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export type Video = {
  id: string;
  title: string;
  category: string;
  duration: string;
  views: string;
  postedAt: string;
  thumbnail: string;
  url?: string;
};

export type GoodsBadge = "初回限定" | "NEW" | null;

export type GoodsDetail = {
  label: string;
  value: string;
};

export type GoodsItem = {
  id: string;
  slug: string;
  name: string;
  price: string;
  badge: GoodsBadge;
  image: string;
  images?: string[];
  imageFit?: "cover" | "contain";
  imageBackground?: "dark" | "light";
  description?: string;
  sizes?: string[];
  details?: GoodsDetail[];
  shippingNotes?: string[];
};

const SHIPPING_NOTES = [
  "Tシャツ送料：全国一律350円",
  "コースター送料：200円",
  "セットは送料無料予定",
];

const GOODS_GENERAL_SHIPPING_NOTES = [
  "送料：ご注文内容に応じて別途ご案内します",
  "複数購入の場合はまとめて発送可能です",
];

export const GOODS_ITEMS: GoodsItem[] = [
  {
    id: "original-t-shirt",
    slug: "original-t-shirt",
    name: "のぶあ オリジナルTシャツ（S/M/L）",
    price: "¥3,500",
    badge: "初回限定",
    image: "/images/goods-shirt.png",
    images: ["/images/goods-shirt.png", "/images/goods-shirt-back.png"],
    description: `のぶあチャンネルのオリジナルロゴをプリントしたTシャツです。

シンプルなブラック生地で、普段使いにもライブやイベントにも合わせやすい一枚です。

初回限定25枚で制作しました。`,
    sizes: ["S", "M", "L"],
    details: [
      { label: "カラー", value: "ブラック" },
      { label: "素材", value: "綿100%" },
      { label: "サイズ", value: "S / M / L" },
      { label: "数量", value: "初回限定25枚" },
    ],
    shippingNotes: SHIPPING_NOTES,
  },
  {
    id: "cork-coaster",
    slug: "cork-coaster",
    name: "のぶあ コルクコースター",
    price: "¥700",
    badge: "初回限定",
    image: "/images/goods-coaster.png",
    images: ["/images/goods-coaster.png", "/images/goods-coaster-lifestyle.png"],
    description: `のぶあオリジナルロゴをデザインしたコルクコースターです。

テーブルまわりに置きやすい落ち着いた質感で、日常の中でもさりげなく使えるアイテムです。

初回限定8枚で制作しました。`,
    details: [
      { label: "素材", value: "コルク" },
      { label: "形状", value: "円形" },
      { label: "数量", value: "初回限定8枚" },
      { label: "用途", value: "ドリンク用コースター" },
    ],
    shippingNotes: SHIPPING_NOTES,
  },
  {
    id: "original-tote-bag",
    slug: "original-tote-bag",
    name: "のぶあ オリジナルトートバッグ",
    price: "¥2,200",
    badge: "NEW",
    image: "/images/goods-totobag.jpg",
    images: ["/images/goods-totobag.jpg"],
    imageFit: "contain",
    imageBackground: "light",
    description: `シンプルなブラック生地に、のぶあオリジナルロゴをプリントしたトートバッグです。

A4サイズもゆったり入る使いやすいサイズで、通勤・通学やお買い物、ライブのお供にもぴったり。僕のオカンはエコバッグ扱いしています。

普段使いしやすいデザインなので、さりげなく応援していただけるアイテムになっています。

いつも応援してくださる皆さまへの感謝を込めて制作しました。`,
    details: [
      { label: "カラー", value: "ブラック" },
      { label: "サイズ", value: "A4サイズ対応" },
      { label: "用途", value: "通勤・通学・お買い物・ライブ" },
    ],
    shippingNotes: GOODS_GENERAL_SHIPPING_NOTES,
  },
  {
    id: "microfiber-muffler-towel",
    slug: "microfiber-muffler-towel",
    name: "のぶあ オリジナルマイクロファイバーマフラータオル",
    price: "¥2,500",
    badge: "NEW",
    image: "/images/goods-taoru.png",
    images: ["/images/goods-taoru.png"],
    imageFit: "contain",
    imageBackground: "light",
    description: `のぶあオリジナルロゴをデザインした、マイクロファイバー素材のマフラータオルです。

サイズは約1100×210mm。
首に掛けやすいロングサイズで、ライブやイベントでの応援はもちろん、スポーツやお出かけの際にもお使いいただけます。

肌触りが良く、吸水性にも優れたマイクロファイバー素材を採用。

シンプルなデザインなので、日常の中でもさりげなくお使いいただける一枚です。

いつも応援してくださる皆さまへの感謝を込めて制作しました。

皆さまの毎日に、少しでも音楽と彩りをお届けできたら嬉しいです。♪`,
    details: [
      { label: "素材", value: "マイクロファイバー" },
      { label: "サイズ", value: "約1100×210mm" },
      { label: "用途", value: "ライブ・イベント・スポーツ・お出かけ" },
    ],
    shippingNotes: GOODS_GENERAL_SHIPPING_NOTES,
  },
];

export const CHANNEL_STATS = [
  { value: "850+", label: "Videos" },
  { value: "1.2億+", label: "Views" },
  { value: "2019", label: "Since" },
];

export const FOOTER_NAV_LINKS: NavLink[] = [
  { label: "HOME", href: "/" },
  { label: "GOODS", href: "/goods" },
  { label: "VIDEOS", href: "/videos" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];
