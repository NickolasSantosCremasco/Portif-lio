'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center+=100px',
          scrub: 1,
          markers: false,
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
      });

      // Animar inputs do formulário
      gsap.from(inputsRef.current, {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.3,
      });

      gsap.from(textareaRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        delay: 0.5,
      });

      // Animar ícones sociais
      gsap.from(socialRef.current?.children, {
        opacity: 0,
        scale: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.7,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Animação de envio
    if (formRef.current) {
      const button = formRef.current.querySelector('button');
      if (button) {
        gsap.to(button, {
          scale: 0.95,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        });
      }
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen w-full bg-black text-white py-20 px-4 md:px-8"
    >
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto"
      >
        {/* Título */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Vamos Conversar?
          </h2>
          <p className="text-gray-400 text-lg">
            Tem um projeto em mente ou quer conhecer meu trabalho? Entre em
            contato!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="block text-gray-300 font-medium">Nome</label>
              <input
                ref={(el) => {
                  if (el) inputsRef.current[0] = el;
                }}
                type="text"
                placeholder="Seu nome"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500 transition-colors duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300 font-medium">Email</label>
              <input
                ref={(el) => {
                  if (el) inputsRef.current[1] = el;
                }}
                type="email"
                placeholder="seu@email.com"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500 transition-colors duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300 font-medium">Assunto</label>
              <input
                ref={(el) => {
                  if (el) inputsRef.current[2] = el;
                }}
                type="text"
                placeholder="Qual é o assunto?"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500 transition-colors duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300 font-medium">Mensagem</label>
              <textarea
                ref={textareaRef}
                placeholder="Conte-me sobre seu projeto..."
                rows={5}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500 transition-colors duration-300 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 text-white"
            >
              Enviar Mensagem
            </button>
          </form>

          {/* Informações de contato */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Email */}
            <a
              href="mailto:seu@email.com"
              className="flex items-start gap-4 p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-green-500 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <Mail className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Email</h3>
                <p className="text-gray-400">seu@email.com</p>
              </div>
            </a>

            {/* Redes Sociais */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Redes Sociais
              </h3>
              <div
                ref={socialRef}
                className="flex gap-4"
              >
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
                  title="GitHub"
                >
                  <Github className="w-6 h-6 text-white" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
                  title="LinkedIn"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-all duration-300 transform hover:scale-110"
                  title="Twitter"
                >
                  <Twitter className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/30">
              <p className="text-gray-300">
                Estou sempre aberto a novas oportunidades e projetos
                interessantes. Vamos trabalhar juntos?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
