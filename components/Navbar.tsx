'use client'

import { useRef } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Globe } from 'lucide-react'
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useLanguage } from "@/context/LanguageContext"

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null)
  const { language, toggleLanguage, t } = useLanguage()

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3
      }
    )
  }, { scope: headerRef })

  return (
    <header 
      ref={headerRef} 
      className="fixed top-0 left-0 right-0 z-50 w-full px-8 py-6 md:px-16 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-xs transition-all duration-300 select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Links de Navegação Traduzidos */}
        <nav className="flex items-center space-x-8 text-xs md:text-sm font-medium tracking-widest text-gray-300 uppercase">
          <Link href="/" className="hover:text-white transition-colors duration-200">
            {t.nav.home}
          </Link>
          <Link href="#about" className="hover:text-white transition-colors duration-200">
            {t.nav.about}
          </Link>
          <Link href="#resume" className="hover:text-white transition-colors duration-200">
            {t.nav.resume}
          </Link>
          <Link href="#portfolio" className="hover:text-white transition-colors duration-200">
            {t.nav.projects}
          </Link>
        </nav>

        {/* Lado Direito: Redes Sociais + Toggle de Idioma */}
        <div className="flex items-center space-x-6 text-gray-400">
          <a href="https://github.com/NickolasSantosCremasco" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/nickolas-dos-santos-cremasco-0b4118246/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="mailto:nickolas.cremasco@exemplo.com" className="hover:text-white transition-colors">
            <Mail size={18} />
          </a>

          <div className="w-[1px] h-4 bg-white/20" />

          {/* 🎛️ Interruptor / Switch de Idioma (PT | EN) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-xs font-mono tracking-widest text-gray-300 hover:text-white cursor-pointer"
            aria-label="Trocar Idioma"
          >
            <Globe size={14} className="text-blue-400" />
            <span className={language === 'pt' ? 'text-white font-bold' : 'text-gray-500'}>PT</span>
            <span className="text-gray-600">|</span>
            <span className={language === 'en' ? 'text-white font-bold' : 'text-gray-500'}>EN</span>
          </button>
        </div>

      </div>
    </header>
  )
}