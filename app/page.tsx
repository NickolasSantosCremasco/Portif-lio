'use client'

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import {useGSAP} from '@gsap/react'
import { supabase } from "@/lib/supabase";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Portfolio from "@/components/Portfolio";

interface Project {
  id: number;
  text: string;
  category: string;
  description: string;
  image_url: string;
  project_url?: string; 
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const container = useRef(null)

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
      .from('projects')
      .select('*')
      .order('id', {ascending:false});

    if (data) {
      setProjects(data)
    }
  }
  fetchProjects();
}, []);

useGSAP(() => {
  if (projects.length > 0) {
    gsap.fromTo(".project-card", 
      {y: 50, opacity: 0},
      {y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out"}
    );
  }
}, {scope: container, dependencies: [projects]});

  return (
   <main ref={container} className="min-h-screen bg-[#0B0A14] text-white">
    <Navbar/>
    
    <Hero />

    <About/>
    <Portfolio />
    <Contact />

    <Footer/>
   </main>
  );
}