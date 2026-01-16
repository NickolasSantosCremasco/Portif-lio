'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animar título
      gsap.from(titleRef.current, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
      });

      // Animar subtítulo
      gsap.from(subtitleRef.current, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        delay: 0.2,
        ease: 'power3.out',
      });

      // Animar botões
      gsap.from(buttonsRef.current?.children, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        delay: 0.4,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Animação de scroll infinito
      gsap.to(scrollRef.current, {
        duration: 2,
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Fundo com efeito de grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-[100px]"
          style={{
            animation: 'float 20s ease-in-out infinite',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto px-6 text-center space-y-8">
        {/* Título principal */}
        <div className="space-y-4">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Olá, eu sou Nickolas
          </h1>

          {/* Subtítulo */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300"
          >
            Desenvolvedor Full Stack | Criador de Experiências Web Incríveis
          </p>
        </div>

        {/* Descrição */}
        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
          Especializado em criar aplicações web modernas e responsivas com foco
          em performance e experiência do usuário. Vou te mostrar meus trabalhos
          e habilidades.
        </p>

        {/* Botões de ação */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Ver Projetos
          </a>

          <a
            href="#contact"
            className="px-8 py-3 border-2 border-blue-500 text-blue-400 rounded-lg font-semibold hover:bg-blue-500/10 transition-all duration-300 transform hover:scale-105"
          >
            Entrar em Contato
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-gray-400 animate-pulse" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0px);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }
      `}</style>
    </section>
  );
}
