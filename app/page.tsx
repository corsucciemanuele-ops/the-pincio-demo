import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Tempi from "@/components/Tempi";
import Gallery from "@/components/Gallery";
import Sere from "@/components/Sere";
import Invito from "@/components/Invito";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Tempi />
        <Gallery />
        <Sere />
        <Invito />
        <Location />
      </main>
      <Footer />
    </>
  );
}
