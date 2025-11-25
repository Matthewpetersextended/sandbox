// frontend/app/page.tsx

import { Hero } from "@/components/landing/Hero";

import { Services } from "@/components/landing/Services";
import { About } from "@/components/landing/About";


import { Contact } from "@/components/landing/contact";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/footer";



const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
    
      <Services />
   
   
      <About />
      <Contact />
      <Footer />
     
  
    </div>
  );
};

export default Index;
