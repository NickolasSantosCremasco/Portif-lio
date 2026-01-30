'use client'

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef(null)
    useGSAP(() => {
        gsap.from('about-text', {
            scrollTrigger: {
                trigger: '.about-text',
                start: 'top 80%',
                toggleActions: 'Play none none Reverse',
            },
            opacity: 0,
            y:30,
            duration:1,
            stagger: 0.3,
        });
    }, {scope: sectionRef})
    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-20 bg-[#0B0A14] relative overflow-hidden">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <h2 className="about-text text-secondary font-medium tracking-widest text-xs uppercase">Sobre mim</h2>
                    <h3 className="about-text text-4xl md:text-5xl font-bold leading-tight">Transformando Códigos em <span className="text-primary italic"> Experiências </span> Imersivas</h3>
                    <p className="about-text text-gray-400 text-lg leading-relaxed">Nascido em São Paulo, Sou um desenvolvedor Fullstack apaixadonado pela lógica do backend e pela beleza do frontend</p>
                    <p className="about-text text-gray-400 text-lg leading-relaxed">Atualmente, foco em construir aplicações performáticas com Next.js, Python e SQL (postegre e MySQL), buscando sempre o equilíbrio entre design minimalista e código limpo</p>
                </div>

                {/* Lado Direito */}
                <div className="about-text grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/50 transition-colors">
                        <h4 className="text-white font-bold mb-2">Frontend</h4>
                        <p className="text-xs text-gray-500">React, Next.js, Tailwind, GSAP @ Framer Motion</p>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border/50 transition-colors">
                        <h4 className="text-white font-bold mb-2">Backend</h4>
                        <p className="text-xs text-gray-500">Node.js, PHP, SQL & Supabase (PostgreSQL).</p>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/50 transition-colors">
                        <h4 className="text-white font-bold mb-2">Tools</h4>
                        <p className="text-xs text-gray-500">Git, Docker e Metodologias Ágeis.</p>
                    </div>
                </div>
            </div>
           
        </section>
    )
}