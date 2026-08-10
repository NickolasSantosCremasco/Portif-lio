'use client'

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { supabase } from "@/lib/supabase"
import ProjectCard from "./ProjectCard"
import { useLanguage } from "@/context/LanguageContext"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: number
  text: string
  category: string
  description: string
  image_url: string
  project_url?: string
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage() // 🌐 Consumindo o contexto de tradução

  // 1. Busca no Banco de Dados (Supabase)
  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false })

      if (data) {
        setProjects(data)
      }
    }
    fetchProjects()
  }, [])

  // 2. Animação GSAP ao carregar os dados
  useGSAP(() => {
    // Animação do Cabeçalho
    gsap.from('.portfolio-header', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })

    // Animação Stagger dos Cards
    if (projects.length > 0) {
      gsap.fromTo(
        '.project-card-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )
    }
  }, { scope: sectionRef, dependencies: [projects] })

  return (
    <section 
      ref={sectionRef} 
      id="portfolio" 
      className="relative min-h-screen bg-black text-white py-24 px-8 md:px-16 border-t border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Cabeçalho da Seção Traduzido */}
        <div className="portfolio-header space-y-3">
          <h2 className="text-5xl md:text-6xl font-black tracking-widest uppercase text-white leading-none">
            {t.portfolio.title}
          </h2>
          <div className="w-12 h-[2px] bg-blue-500" />
          <p className="text-xs md:text-sm text-gray-400 font-mono tracking-wider uppercase">
            {t.portfolio.subtitle}
          </p>
        </div>

        {/* Estado de Carregamento Traduzido */}
        {projects.length === 0 && (
          <div className="flex items-center space-x-3 py-12">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <p className="text-xs font-mono tracking-widest text-gray-500 uppercase">
              {t.portfolio.loading}
            </p>
          </div>
        )}

        {/* Grade de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="project-card-item opacity-0 h-full">
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

      </div>
    </section>
  )
}