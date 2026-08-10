'use client'

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black text-white border-t border-white/10 py-8 px-8 md:px-16 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* 1. Direitos Autorais e Branding Traduzido */}
        <div className="flex items-center space-x-4">
          <span className="text-xs font-bold tracking-widest text-white uppercase">
            NC
          </span>
          <span className="text-gray-600">|</span>
          <p className="text-xs text-gray-400 tracking-wider uppercase">
            © {currentYear} NICKOLAS CREMASCO. {t.footer.rights}
          </p>
        </div>

        {/* 2. Redes Sociais Minimalistas */}
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
            href="mailto:nickolas.cremasco@exemplo.com" 
            className="hover:text-white transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* 3. Botão de Voltar ao Topo Traduzido */}
        <a 
          href="#" 
          onClick={scrollToTop}
          className="group flex items-center gap-2 text-xs font-medium tracking-widest text-gray-400 hover:text-white transition-colors uppercase"
        >
          <span>{t.footer.backToTop}</span>
          <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform duration-300" />
        </a>

      </div>
    </footer>
  );
}