import { ArrowUpRight } from "lucide-react";

interface ProjectProps {
    title: string;
    category: string;
    description: string;
    image_url?: string;
    project_url?: string;
}

export default function ProjectCard({ title, category, description, image_url, project_url }: ProjectProps) {
    // Validação para garantir que o link é uma URL real
    const hasValidLink = project_url && project_url.startsWith('http');

    return (
        <div className="group relative overflow-hidden rounded-3xl bg-[#141221] border border-white/5 transition-all hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] h-full flex flex-col">
            
            {/* Botão Flutuante de Link */}
            {hasValidLink && (
                <a 
                    href={project_url} 
                    target="_blank" 
                    rel="noopener noreferrer" // Segurança adicional para links externos
                    className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-all hover:scale-110 active:scale-95"
                > 
                    <ArrowUpRight size={20} />
                </a>
            )}

            {/* Área da Imagem */}
            <div className="h-48 w-full overflow-hidden bg-white/5 relative">
                {image_url && image_url !== 'link' ? (
                    <img 
                        src={image_url} 
                        alt={title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
                        <span className="text-white/20 text-sm uppercase tracking-widest">Sem imagem</span>
                    </div>
                )}
            </div>

            {/* Conteúdo */}
            <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-widest text-purple-400 font-bold border border-white/5">
                        {category}
                    </span>
                </div>
                
                <div className="flex-1">
                    {/* Tornando o título clicável também */}
                    {hasValidLink ? (
                        <a href={project_url} target="_blank" rel="noopener noreferrer">
                            <h3 className="text-2xl font-bold mb-3 text-white hover:text-purple-400 transition-colors inline-flex items-center gap-2">
                                {title}
                            </h3>
                        </a>
                    ) : (
                        <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
                    )}
                    
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}