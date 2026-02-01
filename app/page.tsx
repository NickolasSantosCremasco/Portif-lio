'use client'

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import {useGSAP} from '@gsap/react'
import { supabase } from "@/lib/supabase";
import ProjectCard from "@/public/components/ProjectCard"; 
import Hero from "@/public/components/Hero";
import About from "@/public/components/About";
import Navbar from "@/public/components/Navbar";
import Footer from "@/public/components/Footer";

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

    <section className="py-24 px-6 md:px-20 max-w-8xl mx-auto" id="projects">
      <h2 className="text-4xl md:text-5xl font-light mb-16 tracking-tight">Trabalhos Selecionados</h2>

      {projects.length === 0  && (
        <p className="text-gray-500 animate-pulse">Carregando Projetos do Banco...</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project)=> (
          <div key={project.id} className="project-card opacity-0">
            <ProjectCard
              title={project.text}
              category={project.category}
              description={project.description}
              image_url={project.image_url}
              project_url={project.project_url}
            />
          </div>
        ))}
      </div>
    </section>

    <Footer/>
   </main>
  );
}