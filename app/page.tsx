import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NostalgiaBand from "@/components/NostalgiaBand";
import Manifesto from "@/components/Manifesto";
import Marquee from "@/components/Marquee";
import Sere from "@/components/Sere";
import PoolExperience from "@/components/PoolExperience";
import Location from "@/components/Location";
import Invito from "@/components/Invito";
import SunsetFinale from "@/components/SunsetFinale";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <NostalgiaBand />
        <Manifesto />
        <Marquee />
        <Sere />
        <PoolExperience />
        <Location />
        <Invito />
        <SunsetFinale />
      </main>
      <Footer />
    </>
  );
}
