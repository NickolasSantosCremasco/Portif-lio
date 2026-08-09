'use client'

import { useRef } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail } from 'lucide-react'
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null)

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
      className="fixed top-0 left-0 right-0 z-50 w-full px-8 py-6 md:px-16 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-xs transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* 1. Navegação de Links (Esquerda) */}
        <nav className="flex items-center space-x-8 text-xs md:text-sm font-medium tracking-widest text-gray-300 uppercase">
          <Link href="/" className="hover:text-white transition-colors duration-200">
            Home
          </Link>
          <Link href="#about" className="hover:text-white transition-colors duration-200">
            Sobre
          </Link>
          <Link href="#resume" className="hover:text-white transition-colors duration-200">
            Resume
          </Link>
          <Link href="#projects" className="hover:text-white transition-colors duration-200">
            Projetos
          </Link>
        </nav>

        {/* 2. Redes Sociais e Contato (Direita) */}
        <div className="flex items-center space-x-6 text-gray-400">
          <a 
            href="https://github.com/NickolasSantosCremasco" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a 
            href="https://www.linkedin.com/in/nickolas-dos-santos-cremasco-0b4118246/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a 
            href="mailto:seu-email@dominio.com" 
            className="hover:text-white transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

      </div>
    </header>
  )
}