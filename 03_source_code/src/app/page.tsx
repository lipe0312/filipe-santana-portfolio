import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <Experience />
      <About />
      <section id="gallery" className="min-h-[100vh] flex items-center justify-center p-8">
        <h2 className="text-4xl font-bold text-text-primary">Gallery</h2>
      </section>
      <Contact />
    </main>
  );
}
