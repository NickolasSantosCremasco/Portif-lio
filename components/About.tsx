'use client'

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef(null)

    useGSAP(() => {

        // Scroll Trigger Animations
        gsap.from('about-tag', {
            scrollTrigger: {
                //@ts-ignore
                trigger: '.about-tag',
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'Play none none Reverse',
            },
            opacity: 0,
            y:20,
            duration:0.8,
        });

        // Main Title

        gsap.from('about-title', {
            scrollTrigger: {
                trigger: '.about-title',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 40,
            duration: 1,
        });

        // Experiences

        gsap.from('.about-highlight', {
            scrollTrigger: {
                trigger: '.about-title',
                start: 'top 80%',
            },
            opacity: 0,
            scale: 0.8,
            filter: 'blur(10px)',
            duration: 1.5,
            delay: 0.3,
        });

        // Paragraphs

        gsap.from('.about-paragraph', {
            scrollTrigger: {
                trigger: '.about-paragraph',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.2,
        })

   // Substitua a animação dos skill-cards por:
        gsap.from('.skill-card', {
            scrollTrigger: {
                trigger: '.skills-container', // ← Novo! Adicione essa classe
                start: 'top 80%',
                markers: true,
            },
            opacity: 0,
            y: 30,
            scale: 0.95,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            onComplete: () => {
                gsap.set('.skill-card', { clearProps: 'all' });
            }
        });
        // Scroll Parallax

        gsap.to('.about-blob-1', {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
            y:-100,
            x:50,
        })

        gsap.to('.about-blob-2', {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5 
            },
            y:80,
            x:-40
        });
    }, {scope: sectionRef})
   return (
        <section 
            ref={sectionRef} 
            className="relative py-32 px-6 md:px-20 bg-[#0B0A14] overflow-hidden">
     
            <div className="about-blob-1 absolute -left-20 top-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] -z-10"/>
            
         
            <div className="about-blob-2 absolute -right-20 bottom-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -z-10"/>
           
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-20 -z-10"/>
            
         
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
               
                <div className="space-y-8">
                
                    <span className="about-tag block text-purple-300/80 font-medium tracking-[0.3em] text-xs uppercase">
                        Sobre mim
                    </span>
                    
                 
                    <h3 className="about-title text-4xl md:text-5xl font-bold leading-tight">
                        Transformando Códigos em{' '}
                    
                        <span className="about-highlight relative inline-block italic font-light text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-fuchsia-300 to-blue-400">
                            Experiências
                            
                         
                            <span className="absolute inset-0 blur-xl bg-linear-to-r from-purple-400 via-fuchsia-300 to-blue-400 opacity-30 -z-10" aria-hidden="true">
                                Experiências
                            </span>
                        </span>
                        {' '}Imersivas
                    </h3>
                    
            
                    <p className="about-paragraph text-gray-400 text-lg leading-relaxed">
                        Nascido em São Paulo, sou um desenvolvedor Fullstack apaixonado pela lógica do backend e pela beleza do frontend.
                    </p>
                    
                    <p className="about-paragraph text-gray-400 text-lg leading-relaxed">
                        Atualmente, foco em construir aplicações performáticas com Next.js, Python e SQL (PostgreSQL e MySQL), buscando sempre o equilíbrio entre design minimalista e código limpo.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
               
                    <div className="skill-card group relative p-6 
                                    bg-white/5 backdrop-blur-sm
                                    border border-white/10 rounded-2xl 
                                    hover:border-purple-500/50 hover:bg-white/10
                                    transition-all duration-300
                                    hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]
                                    hover:-translate-y-1">

                        
                        <h4 className="text-white font-bold mb-2 
                                       group-hover:text-purple-300 
                                       transition-colors">
                            Frontend
                        </h4>
                    
                        
                        <p className="text-sm text-gray-500 
                                      group-hover:text-gray-400 
                                      transition-colors">
                            React, Next.js, Tailwind, GSAP & Framer Motion
                        </p>
                        
                        <div className="absolute -top-2 -right-2 w-16 h-16 
                                        bg-linear-to-br from-purple-500/20 to-transparent 
                                        rounded-full blur-2xl opacity-0 
                                        group-hover:opacity-100 transition-opacity"/>
                       
                    </div>

                 
                    <div className="skill-card group relative p-6 
                                    bg-white/5 backdrop-blur-sm
                                    border border-white/10 rounded-2xl 
                                    hover:border-blue-500/50 hover:bg-white/10
                                    transition-all duration-300
                                    hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]
                                    hover:-translate-y-1">
                        
                        <h4 className="text-white font-bold mb-2 
                                       group-hover:text-blue-300 
                                       transition-colors">
                            Backend
                        </h4>
                        
                        <p className="text-sm text-gray-500 
                                      group-hover:text-gray-400 
                                      transition-colors">
                            Node.js, PHP, SQL & Supabase (PostgreSQL)
                        </p>
                        
                        <div className="absolute -top-2 -right-2 w-16 h-16 
                                        bg-linear-to-br from-blue-500/20 to-transparent 
                                        rounded-full blur-2xl opacity-0 
                                        group-hover:opacity-100 transition-opacity"/>
                    </div>

                    <div className="skill-card group relative col-span-2 p-6 
                                    bg-white/5 backdrop-blur-sm
                                    border border-white/10 rounded-2xl 
                                    hover:border-fuchsia-500/50 hover:bg-white/10
                                    transition-all duration-300
                                    hover:shadow-[0_0_30px_rgba(232,121,249,0.3)]
                                    hover:-translate-y-1">
               
                        
                        <h4 className="text-white font-bold mb-2 
                                       group-hover:text-fuchsia-300 
                                       transition-colors">
                            Tools
                        </h4>
                        
                        <p className="text-sm text-gray-500 
                                      group-hover:text-gray-400 
                                      transition-colors">
                            Git, Docker e Metodologias Ágeis
                        </p>
                        
                        <div className="absolute -top-2 -right-2 w-16 h-16 
                                        bg-linear-to-br from-fuchsia-500/20 to-transparent 
                                        rounded-full blur-2xl opacity-0 
                                        group-hover:opacity-100 transition-opacity"/>
                    </div>
                </div>
            </div>
        </section>
    )
}