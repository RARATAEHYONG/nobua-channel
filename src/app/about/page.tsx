import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import Footer from "@/components/Footer";
import { getYouTubeChannel } from "@/lib/youtube";

export default async function AboutPage() {
  const channel = await getYouTubeChannel();

  const title = channel
    ? `${channel.title}について`
    : "のぶあチャンネルについて";
  const description =
    channel?.description ||
    "YouTube APIからチャンネル情報を取得できませんでした。";
  const stats = channel
    ? [
        { value: channel.subscriberCount, label: "Subscribers" },
        { value: channel.videoCount, label: "Videos" },
        { value: channel.viewCount, label: "Views" },
      ]
    : [
        { value: "-", label: "Subscribers" },
        { value: "-", label: "Videos" },
        { value: "-", label: "Views" },
      ];

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-16">
        <SectionHeading eyebrow="ABOUT" title={title} />

        <div className="mt-8 max-w-3xl space-y-5 font-jp text-base leading-relaxed text-white/70">
          {description.split(/\r?\n/).map((line, index) => (
            <p key={`${line}-${index}`}>{line}</p>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:max-w-2xl sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-sans text-2xl font-black sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 font-jp text-xs text-white/50 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
