'use client'

import { useRef } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail } from 'lucide-react'
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export default function Navbar() {
    const navRef = useRef(null)

    useGSAP(() => {
        gsap.to(navRef.current, {
            y:0,
            opacity: 1,
            duration:1.2,
            ease: 'power4.out',
            delay: 0.8
        })
    })

    return (
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-center ">
            <nav ref={navRef} className="pointer-events-auto flex items-center justify-between px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] w-full max-w-2xl transition-all hover:border-purple-500/30">
            
            <Link href="/" className="w-8 h-8 rounded-full bg-linear-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-lg hover:scale-110 transition-transform">
                    NC
            </Link>

            <ul className="flex items-center gap-8 text-sm font-medium text-gray-400">
                    <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                    <li><Link href="#about" className="hover:text-white transition-colors">Sobre</Link></li>
                    <li><Link href="#projects" className="hover:text-white transition-colors">Projetos</Link></li>
            </ul>
            
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                    <a href="https://github.com" target="_blank" className="text-gray-400 hover:text-white transition-all hover:scale-110"><Github size={18} /></a>
                    <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-white transition-all hover:scale-110"><Linkedin size={18} /></a>
                </div>
            </nav>
        </header>
    )
}