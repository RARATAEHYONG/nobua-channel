# のぶあチャンネル — Official Website

Next.js 15 (App Router) + TypeScript + Tailwind CSS implementation of the
"のぶあチャンネル" YouTube channel homepage design.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## YouTube API setup

Create `.env.local` from `.env.example` and set:

```bash
YOUTUBE_API_KEY=your_youtube_data_api_v3_key
YOUTUBE_CHANNEL_ID=your_channel_id
```

The site reads these values on the server only. When they are missing or the
API request fails, the latest videos section falls back to the mock data in
`src/data/site.ts`.

## Project structure

```
src/
  app/
    layout.tsx        # Root layout, fonts, global metadata
    page.tsx           # Home: Navbar + Hero + LatestVideos + OfficialGoods + Footer
    globals.css        # Tailwind layers, grid background, focus styles
    about/page.tsx
    goods/page.tsx
    videos/page.tsx
    contact/page.tsx
  components/
    Navbar.tsx          # Sticky top nav with logo, links, subscribe CTA
    Hero.tsx            # Landing hero with subscriber stats + showcase panel
    Logo.tsx            # "NA / のぶあ" wordmark, reused in Navbar/Hero/Footer
    SectionHeading.tsx  # Eyebrow + title pattern (OFFICIAL WEBSITE, etc.)
    LatestVideos.tsx    # "最新動画" section
    VideoCard.tsx       # Single video preview card
    OfficialGoods.tsx   # "グッズ" section
    GoodsCard.tsx       # Single product card
    ContactForm.tsx     # Contact form fields + submit
    Footer.tsx          # Brand, nav, YouTube callout, legal bar
  data/
    site.ts             # Shared types + mock content (nav links, videos, goods, stats)
```

## Notes

- Color tokens (`background`, `surface`, `accent`, etc.) are defined in
  `tailwind.config.ts`.
- Thumbnails use Unsplash placeholder images via `next/image`; swap the
  `image`/`thumbnail` fields in `src/data/site.ts` with real assets.
- Fully responsive: the hero showcase panel collapses on screens below
  `lg`, and grids reflow from 1 → 2 → 3/4 columns.
