import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import About from "@/components/sections/About";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import BlobBackground from "@/components/BlobBackground";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-clip min-h-screen">
      {/* Fixed ambient blob background — static on mobile via CSS, animated on desktop */}
      <BlobBackground />
      <Hero />
      <Projects />
      <Experience />
      <About />
      <Gallery />
      <Contact />
    </main>
  );
}
