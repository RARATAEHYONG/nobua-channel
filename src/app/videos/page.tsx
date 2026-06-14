import Navbar from "@/components/Navbar";
import LatestVideos from "@/components/LatestVideos";
import Footer from "@/components/Footer";

export default function VideosPage() {
  return (
    <>
      <Navbar />
      <main>
        <LatestVideos />
      </main>
      <Footer />
    </>
  );
}
