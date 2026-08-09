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
    const hasValidLink = Boolean(project_url && project_url.startsWith('http'));

    return (
        <article className="group relative bg-neutral-950/60 border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-white/30 h-full">
            
            {/* Área da Imagem com Filtro Grayscale e Hover Suave */}
            <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                {image_url && image_url !== 'link' ? (
                    <img 
                        src={image_url} 
                        alt={title} 
                        className="w-full h-full object-cover object-center grayscale contrast-125 opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-900 border-b border-white/5">
                        <span className="text-[10px] font-mono tracking-widest text-gray-600 uppercase">
                            NO IMAGE PREVIEW
                        </span>
                    </div>
                )}

                {/* Overlay em gradiente escuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />

                {/* Botão Flutuante de Link no Canto Superior Direito */}
                {hasValidLink && (
                    <a 
                        href={project_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`Ver projeto ${title}`}
                        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-white hover:text-black transition-all duration-300"
                    > 
                        <ArrowUpRight size={16} />
                    </a>
                )}
            </div>

            {/* Conteúdo Editorial */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                    {/* Título e Categoria */}
                    <div className="flex items-start justify-between gap-2">
                        {hasValidLink ? (
                            <a href={project_url} target="_blank" rel="noopener noreferrer" className="inline-block group/title">
                                <h3 className="text-xl md:text-2xl font-black tracking-wider uppercase text-white group-hover/title:text-gray-300 transition-colors">
                                    {title}
                                </h3>
                            </a>
                        ) : (
                            <h3 className="text-xl md:text-2xl font-black tracking-wider uppercase text-white">
                                {title}
                            </h3>
                        )}

                        <span className="shrink-0 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-gray-300 uppercase">
                            {category}
                        </span>
                    </div>

                    {/* Descrição */}
                    <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>

                {/* Rodapé do Card com Linha Guia */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                    <span>PROJECT</span>
                    <span className="w-12 h-[1px] bg-blue-500/50" />
                </div>
            </div>

        </article>
    );
}