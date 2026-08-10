'use client'

import { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from('.about-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.about-email', {
      opacity: 0,
      y: 15,
      duration: 0.6,
    }, '-=0.4')
    .from('.about-paragraph', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.2
    }, '-=0.4')
    .from('.about-location', {
      opacity: 0,
      x: -20,
      duration: 0.6
    }, '-=0.4')
    .from('.about-image-container', {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)',
      duration: 1.2,
      ease: 'power2.out'
    }, '-=1.0');

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      id="about"
      className="relative min-h-screen bg-black text-white py-24 px-8 md:px-16 flex items-center overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* 📝 Lado Esquerdo: Textos, Título e Localização */}
        <div className="lg:col-span-7 flex flex-col justify-between min-h-[480px] z-10">
          <div className="space-y-8">
            {/* Cabeçalho da Seção */}
            <div>
              <h2 className="about-title text-4xl md:text-5xl font-black tracking-widest uppercase text-white">
                ABOUT
              </h2>
              <div className="w-12 h-[2px] bg-blue-500 my-3" />
              <p className="about-email text-xs md:text-sm text-gray-400 font-mono tracking-wider">
                nickolas.cremasco@exemplo.com
              </p>
            </div>

            {/* Parágrafos de Apresentação */}
            <div className="space-y-6 text-gray-300 text-base md:text-lg font-light leading-relaxed max-w-2xl">
              <p className="about-paragraph">
                Desenvolvedor Fullstack focado na construção de aplicações web de alta performance, unindo a arquitetura consistente do backend ao design minimalista e responsivo no frontend.
              </p>
              <p className="about-paragraph">
                Especializado no ecossistema Next.js, Python e bancos de dados relacionais (PostgreSQL/MySQL), busco transformar requisitos complexos em código limpo e experiências imersivas.
              </p>
            </div>
          </div>

          {/* Rodapé do Lado Esquerdo: Localização */}
          <div className="about-location flex items-center gap-3 text-xs md:text-sm text-gray-400 tracking-widest pt-8 uppercase">
            <span className="w-8 h-[1px] bg-blue-500" />
            <span>São Paulo, SP — Brasil</span>
          </div>
        </div>

        {/* 📸 Lado Direito: Foto em PNG Transparente */}
        <div className="lg:col-span-5 relative w-full h-[500px] md:h-175  bottom-50 flex items-end justify-center">
          <div className="about-image-container relative w-full h-full  drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            <Image
              src="/img/myself.png"
              alt="Nickolas Cremasco"
              fill
              priority
              className="object-contain object-bottom"
            />
            {/* Gradiente sutil na base apenas para suavizar o corte inferior da camiseta */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black to-transparent" />
          </div>
        </div>

      </div>
    </section>
  )
}