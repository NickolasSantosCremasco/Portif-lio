'use client'

import { useRef, useState } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Globe, Menu, X } from 'lucide-react'
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useLanguage } from "@/context/LanguageContext"

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null)
  const [isOpen, setIsOpen] = useState(false)
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

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header 
      ref={headerRef} 
      className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 md:px-16 md:py-6 bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-md transition-all duration-300 select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* 1. Branding / Logo para Telas Menores */}
        <Link href="/" className="text-sm font-black tracking-widest text-white uppercase md:hidden">
          NC
        </Link>

        {/* 2. Links de Navegação Desktop (escondidos em telas pequenas) */}
        <nav className="hidden md:flex items-center space-x-8 text-xs md:text-sm font-medium tracking-widest text-gray-300 uppercase">
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

        {/* 3. Lado Direito: Redes + Interruptor PT/EN (Desktop e Mobile) */}
        <div className="flex items-center space-x-4 md:space-x-6 text-gray-400">
          <div className="hidden sm:flex items-center space-x-4">
            <a href="https://github.com/NickolasSantosCremasco" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/nickolas-dos-santos-cremasco-0b4118246/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:nickolas.cremasco@exemplo.com" className="hover:text-white transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
            <div className="w-[1px] h-4 bg-white/20" />
          </div>

          {/* Toggle de Idioma (Sempre Visível) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-xs font-mono tracking-widest text-gray-300 hover:text-white cursor-pointer"
            aria-label="Trocar Idioma"
          >
            <Globe size={14} className="text-blue-400" />
            <span className={language === 'pt' ? 'text-white font-bold' : 'text-gray-500'}>PT</span>
            <span className="text-gray-600">|</span>
            <span className={language === 'en' ? 'text-white font-bold' : 'text-gray-500'}>EN</span>
          </button>

          {/* Botão Hambúrguer Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-white p-1 focus:outline-none"
            aria-label="Abrir Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* 4. Menu Overlay / Modal Mobile */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-black/95 backdrop-blur-xl border-b border-white/10 py-8 px-8 flex flex-col space-y-6 transition-all duration-300 z-40">
          <nav className="flex flex-col space-y-4 text-sm font-bold tracking-widest text-gray-300 uppercase">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-white py-1 transition-colors">
              {t.nav.home}
            </Link>
            <Link href="#about" onClick={() => setIsOpen(false)} className="hover:text-white py-1 transition-colors">
              {t.nav.about}
            </Link>
            <Link href="#resume" onClick={() => setIsOpen(false)} className="hover:text-white py-1 transition-colors">
              {t.nav.resume}
            </Link>
            <Link href="#portfolio" onClick={() => setIsOpen(false)} className="hover:text-white py-1 transition-colors">
              {t.nav.projects}
            </Link>
          </nav>

          <div className="pt-4 border-t border-white/10 flex items-center space-x-6 text-gray-400">
            <a href="https://github.com/NickolasSantosCremasco" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/nickolas-dos-santos-cremasco-0b4118246/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:nickolas.cremasco@exemplo.com" className="hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}