import AboutSection from "@/components/home/about-section";
import HeroSection from "@/components/home/hero-section";
import PaketSection from "@/components/home/paket-section";
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";

export default async function Home() {


  
  return (
    <>
      <HeroSection />
      <PaketSection />
      <AboutSection />
    </>
  );
}
