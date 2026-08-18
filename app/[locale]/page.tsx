import { Hero } from "@/components/sections/Hero";
import { ArtistStatement } from "@/components/sections/ArtistStatement";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { MusicShowcase } from "@/components/sections/MusicShowcase";
import { Discography } from "@/components/sections/Discography";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ArtistStatement />
      <ProjectShowcase />
      <MusicShowcase />
      <Discography />
      <Services />
      <About />
      <ContactSection />
    </>
  );
}
