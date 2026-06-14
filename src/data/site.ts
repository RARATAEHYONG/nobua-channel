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

export type GoodsBadge = "初回限定" | null;

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
  description?: string;
  sizes?: string[];
  details?: GoodsDetail[];
  shippingNotes?: string[];
};

const SHIPPING_NOTES = [
  "※Tシャツ送料：全国一律350円",
  "※コースター送料：200円",
  "※セットは送料無料予定",
];

export const GOODS_ITEMS: GoodsItem[] = [
  {
    id: "original-t-shirt",
    slug: "original-t-shirt",
    name: "オリジナルTシャツ（S/M/L）【初回限定25枚】",
    price: "¥3,500",
    badge: "初回限定",
    image: "/images/goods-shirt.png",
    images: ["/images/goods-shirt.png", "/images/goods-shirt-back.png"],
    description:
      "胸元と背面にのぶあロゴをプリントしたオリジナルTシャツ。シンプルな黒ボディで、普段使いしやすい初回限定アイテムです。",
    sizes: ["S", "M", "L"],
    details: [
      { label: "カラー", value: "ブラック" },
      { label: "素材", value: "綿100%" },
      { label: "サイズ", value: "S / M / L" },
      { label: "販売数", value: "初回限定25枚" },
    ],
    shippingNotes: SHIPPING_NOTES,
  },
  {
    id: "cork-coaster",
    slug: "cork-coaster",
    name: "コルクコースター《初回限定8枚》",
    price: "¥700",
    badge: "初回限定",
    image: "/images/goods-coaster.png",
    images: ["/images/goods-coaster.png", "/images/goods-coaster-lifestyle.png"],
    description:
      "のぶあロゴをプリントした丸型コルクコースター。デスクやレコーディング環境にも馴染む、温かみのある初回限定アイテムです。",
    details: [
      { label: "素材", value: "コルク" },
      { label: "形状", value: "丸型" },
      { label: "販売数", value: "初回限定8枚" },
      { label: "用途", value: "グラス・マグカップ用コースター" },
    ],
    shippingNotes: SHIPPING_NOTES,
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
