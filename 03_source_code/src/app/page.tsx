import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import About from "@/components/sections/About";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Fixed ambient blob background — sits behind all sections */}
      <div aria-hidden="true" className="fixed blob-bg">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-soft-slate opacity-80 blur-[180px] will-change-transform animate-blob-slow top-[-15%] left-[-10%]" />
        <div className="absolute w-[700px] h-[700px] rounded-full bg-soft-slate opacity-70 blur-[160px] will-change-transform animate-blob-mid top-[-5%] right-[-15%]" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-alabaster opacity-60 blur-[140px] will-change-transform animate-blob-fast bottom-[10%] left-[25%]" />
      </div>
      <Hero />
      <Projects />
      <Experience />
      <About />
      <Gallery />
      <Contact />
    </main>
  );
}
