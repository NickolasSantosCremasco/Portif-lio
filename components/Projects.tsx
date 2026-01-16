'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Projeto 1',
    description: 'Uma aplicação web responsiva com animações suaves',
    tags: ['React', 'GSAP', 'Tailwind'],
    links: {
      demo: '#',
      github: '#',
    },
  },
  {
    id: 2,
    title: 'Projeto 2',
    description: 'E-commerce moderno com funcionalidades avançadas',
    tags: ['Next.js', 'TypeScript', 'Stripe'],
    links: {
      demo: '#',
      github: '#',
    },
  },
  {
    id: 3,
    title: 'Projeto 3',
    description: 'Dashboard interativo com dados em tempo real',
    tags: ['React', 'WebSocket', 'D3.js'],
    links: {
      demo: '#',
      github: '#',
    },
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;

    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top center+=100px',
          end: 'center center',
          scrub: 1,
          markers: false,
        },
        opacity: 0,
        y: 100,
        duration: 1,
      });

      // Efeito hover com GSAP
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="projects"
      className="min-h-screen w-full bg-black text-white py-20 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Meus Projetos
          </h2>
          <p className="text-gray-400 text-lg">
            Trabalhos que demonstram minhas habilidades e experiência
          </p>
        </div>

        {/* Grid de projetos */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-lg"
            >
              {/* Imagem placeholder com gradiente */}
              <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-600 group-hover:text-gray-500 transition-colors">
                    {project.id}
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4">
                  <a
                    href={project.links.demo}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                  <a
                    href={project.links.github}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Código
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
