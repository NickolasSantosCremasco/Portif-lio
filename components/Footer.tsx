import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0B0A14] border-t border-white/10 pt-20 pb-10 overflow-hidden">
      
      {/* Luz de fundo decorativa (Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Coluna 1: Branding */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-lg mb-4">
              NC
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Desenvolvendo experiências digitais que unem a lógica do código à beleza do design. Vamos construir algo incrível juntos?
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide">Menu</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-purple-400 transition-colors">Sobre Mim</a></li>
              <li><a href="#projects" className="hover:text-purple-400 transition-colors">Projetos</a></li>
              <li><a href="/admin" className="hover:text-purple-400 transition-colors">Área Admin</a></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide">Conecte-se</h4>
            <div className="flex gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white hover:border-purple-500/50 transition-all hover:scale-110"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-blue-400 hover:border-blue-500/50 transition-all hover:scale-110"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:seuemail@exemplo.com" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-purple-400 hover:border-purple-500/50 transition-all hover:scale-110"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © {currentYear} Nickolas Cremasco. Todos os direitos reservados.
          </p>
          
          <div className="flex items-center gap-6">
             <p className="text-xs text-gray-600 flex items-center gap-1">
                Feito com <span className="text-purple-500 animate-pulse">❤</span> em Next.js
             </p>
             
             {/* Botão de Voltar ao Topo */}
             <a 
               href="#" 
               className="group flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors"
             >
               Voltar ao Topo
               <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
}