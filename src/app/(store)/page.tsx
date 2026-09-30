import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { HomeMerch } from "@/components/home/HomeMerch";
import { Instagram } from "@/components/home/Instagram";
import { Marquee } from "@/components/home/Marquee";
import { NewCollection } from "@/components/home/NewCollection";
import { Reviews } from "@/components/home/Reviews";
import { WhyVelmora } from "@/components/home/WhyVelmora";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <HomeMerch />
      <NewCollection />
      <WhyVelmora />
      <Reviews />
      <Instagram />
      <Contact />
    </>
  );
}
