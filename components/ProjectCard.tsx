import { ArrowUpRight } from "lucide-react";

interface ProjectProps {
    title: string;
    category: string;
    description: string;
    image_url?: string;
}

export default function ProjectCard ({ title, category, description, image_url}: ProjectProps) {
    return (
    <div className="group relative overflow-hidden rounded-3xl bg-[#141221] border border-white/5 transition-all hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] h-full flex flex-col">
      
      {/* Área da Imagem */}
      <div className="h-48 w-full overflow-hidden bg-white/5 relative">
        {image_url ? (
          <img 
            src={image_url} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
            <span className="text-white/20 text-sm uppercase">Sem imagem</span>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-widest text-gray-400 border border-white/5">
            {category}
          </span>
          <ArrowUpRight className="text-gray-500 group-hover:text-purple-400 transition-colors" />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}