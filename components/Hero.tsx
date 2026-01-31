'use client'

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ArrowRight } from "lucide-react"

export default function Hero() {
    const container = useRef(null)

    useGSAP(() => {
        const tl = gsap.timeline({defaults: {ease: 'power3.out'}});
        // 🎬 ENTRANCE ANIMATION 
        tl.from('.hero-tag', {
            opacity: 0, 
            y: 20, 
            duration: 0.8
        })
        .to('.hero-tag', { 
            opacity: 1
        })
        .from('.hero-title-line', {
            opacity: 0, 
            y: 60, 
            rotationX: -15, 
            duration: 1.2, 
            stagger: 0.15
        }, "-=0.4")
        .to('.hero-title-line', { 
            opacity: 1
        })
        .from('.hero-title-ethereal', {
            opacity: 0, 
            scale: 0.8, 
            filter: 'blur(10px)', 
            duration: 1.5
        }, '-=0.8')
        .to('.hero-title-ethereal', { 
            opacity: 1,
            filter: 'blur(0px)' 
        })
        .from('.hero-desc', {
            opacity: 0, 
            y: 20, 
            duration: 0.8
        }, "-=0.6")
        .to('.hero-desc', { 
            opacity: 1
        })
        .from('.hero-btn', {
            scale: 0.9, 
            opacity: 0, 
            duration: 0.6
        }, "-=0.4")
        .to('.hero-btn', { 
            scale: 1,
            opacity: 1,
            clearProps: 'all'
        });
        // 🌊 CONTINUOUS ANIMATION
        
        gsap.to('.blob-1', {
            x: 30, 
            y: -30, 
            scale: 1.1, 
            duration: 8, 
            repeat: -1, 
            yoyo: true, 
            ease: 'sine.inOut'
        })

        gsap.to('.blob-2', {
            x: -40, 
            y: 40, 
            scale: 0.9, 
            duration: 10, 
            repeat: -1, 
            yoyo: true, 
            ease: 'sine.inOut'
        })
        // PARALLAX
        const handleMouseMove = (e: MouseEvent) => {
            const {clientX, clientY} = e
            const centerX = window.innerWidth / 2
            const centerY = window.innerHeight / 2
            const moveX = (clientX - centerX) * 0.01
            const moveY = (clientY - centerY) * 0.01

            gsap.to('.hero-title-ethereal', {
                x: moveX,
                y: moveY,
                duration: 0.5, 
                ease: 'power2.out'
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
        
    }, {scope: container})

    return (
        <section 
            ref={container} 
            className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden"
        >
            <div className="blob-1 absolute top-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10"/>
            <div className="blob-2 absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] -z-10"/>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 -z-10"/>

            <div className="max-w-4xl relative z-10">
                
                <span className="hero-tag block text-purple-300/80 font-medium tracking-[0.3em] text-xs uppercase mb-6">
                    Creative Technologist
                </span>

                <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tight mb-8">
                    <span className="hero-title-line block">
                        Nickolas Cremasco
                    </span>
                    
                    <span className="hero-title-ethereal block italic font-light text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-fuchsia-300 to-blue-400 relative">
                        Fullstack Developer
                        
                        <span className="absolute inset-0 blur-2xl bg-linear-to-r from-purple-400 via-fuchsia-300 to-blue-400 opacity-30 -z-10" aria-hidden="true">
                            Etherealism
                        </span>
                    </span>
                </h1>

                <p className="hero-desc text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
                    Desenvolvedor Full Stack especializado em interfaces de alta performance e experiências visuais imersivas com Next.js.
                </p>

                <a 
                    href="#projects" 
                    className="hero-btn group relative z-20 inline-flex items-center justify-center gap-3 px-8 py-4 
                               bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-full 
                               font-medium tracking-wide
                               transition-all duration-300
                               hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]
                               hover:scale-105
                               before:absolute before:inset-0 before:rounded-full 
                               before:bg-linear-to-r before:from-purple-400 before:to-blue-400 
                               before:opacity-0 before:transition-opacity before:duration-300
                               hover:before:opacity-100 hover:before:blur-xl before:-z-10"
                >
                    Ver Projetos
                    <ArrowRight 
                        size={20} 
                        className="group-hover:translate-x-1 transition-transform duration-300" 
                    />
                </a>

            </div>
        </section>
    )
}