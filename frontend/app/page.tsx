//frontend/app/page.tsx

'use client';

import { Hero } from "@/components/website/Hero";
import { SeriesATimeTrap } from "@/components/website/SeriesATimeTrap";
import { Services } from "@/components/website/Services";
import { About } from "@/components/website/About";
import { Contact } from "@/components/website/Contact";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <SeriesATimeTrap />
      <Services />
      
   
      <About />
      <Contact />
      <Footer />
      
    </div>
  );
};

export default Index;
