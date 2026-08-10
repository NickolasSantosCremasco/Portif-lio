'use client'

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { 
  Dribbble, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Twitter, 
  Maximize2,
  ArrowUpRight
} from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export default function Hero() {
  const container = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // 🎬 1. Animação de Entrada GSAP
    tl.from('.hero-firstname', {
      opacity: 0,
      x: -30,
      duration: 0.8
    })
    .from('.hero-lastname', {
      opacity: 0,
      y: 40,
      duration: 1
    }, "-=0.6")
    .from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.6
    }, "-=0.4")
    .from('.hero-btn', {
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 0.6,
      clearProps: "all" // 🔑 Limpa as propriedades inline do GSAP após animar para não travar o hover do Tailwind
    }, "-=0.4")
    .from('.hero-footer', {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, "-=0.4")

    // 🖱️ 2. Parallax com o Mouse
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      const moveX = (clientX - centerX) * 0.015
      const moveY = (clientY - centerY) * 0.015

      gsap.to('.hero-bg-img', {
        x: -moveX * 1.5,
        y: -moveY * 1.5,
        duration: 1,
        ease: 'power2.out'
      })

      gsap.to('.hero-content', {
        x: moveX,
        y: moveY,
        duration: 0.8,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)

  }, { scope: container })

  return (
    <section 
      ref={container} 
      className="relative w-full h-screen bg-black text-white overflow-hidden flex flex-col justify-between p-8 md:p-14 select-none"
    >
      {/* 🖼️ Background com Overlay Escuro */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/img/background.png"
          alt="Setup Background"
          fill
          priority
          className="hero-bg-img object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      {/* 📝 Conteúdo Central */}
      <main className="hero-content relative z-10 max-w-2xl my-auto ml-0 md:ml-12">
        <div className="space-y-1">
          <span className="hero-firstname block text-2xl md:text-3xl font-light tracking-[0.25em] text-gray-300 uppercase">
            NICKOLAS
          </span>
          <h1 className="hero-lastname text-7xl md:text-9xl font-black tracking-tight text-white uppercase leading-none">
            CREMASCO
          </h1>
          <p className="hero-subtitle text-base md:text-lg font-light tracking-wider text-gray-400 pt-2 max-w-xl leading-relaxed">
            {t.hero.description}
          </p>
        </div>

        {/* 🎯 Botões de CTA com Animação de Hover Totalmente Funcional */}
        <div className="flex items-center gap-4 pt-8">
          {/* Botão Principal de Contato (Destaque Branco) */}
          <Link
            href="#contact"
            className="hero-btn group relative flex items-center gap-2 px-8 py-3.5 text-sm font-bold tracking-wider uppercase text-black bg-white rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg shadow-white/10 active:scale-95 cursor-pointer"
          >
            <span>{t.hero.contactBtn}</span>
            <ArrowUpRight 
              size={18} 
              className="transform transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" 
            />
          </Link>

          {/* Botão Secundário de Portfólio (Contorno Minimalista) */}
          <Link
            href="#portfolio"
            className="hero-btn group flex items-center gap-2 px-8 py-3.5 text-sm font-medium tracking-wider uppercase text-white border border-gray-500 rounded-full hover:bg-white/10 hover:border-white hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span>{t.hero.portfolioBtn}</span>
          </Link>
        </div>
      </main>

      {/* 🌐 Rodapé */}
      <footer className="hero-footer relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center space-x-6 text-gray-400">
          <a href="#" className="hover:text-white transition-colors"><Dribbble size={18} /></a>
          <a href="#" className="hover:text-white transition-colors"><Facebook size={18} /></a>
          <a href="https://www.linkedin.com/in/nickolas-dos-santos-cremasco-0b4118246/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={18} /></a>
          <a href="#" className="hover:text-white transition-colors"><Instagram size={18} /></a>
          <a href="#" className="hover:text-white transition-colors"><Twitter size={18} /></a>
        </div>

        <button 
          onClick={() => document.documentElement.requestFullscreen?.()}
          className="text-gray-400 hover:text-white transition-colors p-2 cursor-pointer"
          aria-label="Toggle Fullscreen"
        >
          <Maximize2 size={18} />
        </button>
      </footer>
    </section>
  )
}