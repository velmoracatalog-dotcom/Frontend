import { BestSellers } from "@/components/home/BestSellers";
import { Contact } from "@/components/home/Contact";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { Hero } from "@/components/home/Hero";
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
      <FeaturedCategories />
      <BestSellers />
      <NewCollection />
      <WhyVelmora />
      <Reviews />
      <Instagram />
      <Contact />
    </>
  );
}
