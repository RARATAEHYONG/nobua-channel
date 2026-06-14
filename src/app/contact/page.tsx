import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto max-w-[1600px] px-6 pt-16 sm:px-10 lg:px-16">
          <SectionHeading eyebrow="GET IN TOUCH" title="お問い合わせ" />
        </div>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
