'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'API REST'],
  },
  {
    category: 'Ferramentas',
    items: ['Git', 'Docker', 'VS Code', 'Figma', 'Webpack'],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top center+=100px',
            scrub: 1,
            markers: false,
          },
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          duration: 0.8,
        });

        // Efeito de hover
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.05,
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            boxShadow: '0 0 0px rgba(59, 130, 246, 0)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full bg-gradient-to-b from-black to-gray-900 text-white py-20 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Minhas Habilidades
          </h2>
          <p className="text-gray-400 text-lg">
            Tecnologias e ferramentas que domino
          </p>
        </div>

        {/* Grid de skills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {skills.map((skillGroup, groupIndex) => (
            <div
              key={skillGroup.category}
              ref={(el) => {
                if (el) itemsRef.current[groupIndex] = el;
              }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-2xl font-bold text-purple-400 mb-6">
                {skillGroup.category}
              </h3>

              <div className="space-y-3">
                {skillGroup.items.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-purple-500/20 transition-colors duration-300"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sobre mim */}
        <div
          ref={(el) => {
            if (el) itemsRef.current[3] = el;
          }}
          className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 md:p-12 border border-blue-500/30 backdrop-blur-sm"
        >
          <h3 className="text-3xl font-bold text-blue-400 mb-6">Sobre Mim</h3>
          <p className="text-gray-300 leading-relaxed text-lg">
            Sou um desenvolvedor apaixonado por criar experiências web
            incríveis. Com mais de X anos de experiência em desenvolvimento
            full-stack, tenho trabalhado em projetos desafiadores que exigem
            soluções inovadoras e performance otimizada. Meu foco é sempre em
            entregar código limpo, escalável e com excelente experiência do
            usuário.
          </p>
        </div>
      </div>
    </section>
  );
}
