import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Tempi from "@/components/Tempi";
import PoolExperience from "@/components/PoolExperience";
import FoodExperience from "@/components/FoodExperience";
import Gallery from "@/components/Gallery";
import Sere from "@/components/Sere";
import Invito from "@/components/Invito";
import Location from "@/components/Location";
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
        <Marquee />
        <Tempi />
        <PoolExperience />
        <FoodExperience />
        <Gallery />
        <Sere />
        <Location />
        <Invito />
        <SunsetFinale />
      </main>
      <Footer />
    </>
  );
}
