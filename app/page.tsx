import { Hero } from "@/components/sections/Hero";
import { Destinations } from "@/components/sections/Destinations";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Destinations />
      <About />
      <Contact />
    </div>
  );
}
