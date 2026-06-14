import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LatestVideos from "@/components/LatestVideos";
import ChannelPosts from "@/components/ChannelPosts";
import OfficialGoods from "@/components/OfficialGoods";
import Footer from "@/components/Footer";
import { getYouTubeChannel } from "@/lib/youtube";

export default async function HomePage() {
  const channel = await getYouTubeChannel();

  return (
    <>
      <Navbar />
      <main>
        <Hero channel={channel} />
        <LatestVideos />
        <ChannelPosts />
        <OfficialGoods />
      </main>
      <Footer />
    </>
  );
}
