"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react'; 
import { supabase } from '@/lib/supabase';


function AdminContent() {
    const searchParams = useSearchParams();
    const key = searchParams.get('key');
    const [loading, setLoading] = useState(false);

    const isAuthorized = key === process.env.NEXT_PUBLIC_ADMIN_KEY;

    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B0A14] text-white">
                <h1 className="text-xl font-bold opacity-30 tracking-widest uppercase">Acesso Restrito 🔒</h1>
            </div>
        );
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const imageFile = formData.get('image_file') as File;
        let imageUrl = "";

        // Lógica de Upload
        if (imageFile && imageFile.size > 0) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('project-images')
                .upload(filePath, imageFile);

            if (uploadError) {
                alert("Erro no upload: " + uploadError.message);
                setLoading(false);
                return;
            }

            const { data: publicUrlData } = supabase.storage
                .from('project-images')
                .getPublicUrl(filePath);
            
            imageUrl = publicUrlData.publicUrl;
        }

        // Lógica de Banco de Dados
        const { error: dbError } = await supabase.from('projects').insert({
            text: formData.get("title"),
            category: formData.get('category'),
            description: formData.get('description'),
            image_url: imageUrl,
            project_url: formData.get('project_url'),
        });

        setLoading(false);

        if (dbError) {
            alert("Erro ao salvar: " + dbError.message);
        } else {
            alert('Projeto cadastrado com sucesso!');
            (e.target as HTMLFormElement).reset();
        }
    }

  
    return (
        <main className="min-h-screen bg-[#0B0A14] text-white p-6 md:p-20 pt-32">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
                    Painel Administrativo
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-6 bg-[#141221] p-8 rounded-3xl border border-white/5 shadow-2xl">
                    
                    {/* Campos do formulário */}
                    <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Título do Projeto</label>
                        <input name="title" required className="w-full bg-black/40 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500 transition-colors" placeholder="Ex: E-commerce Nike" />
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Categoria</label>
                        <input name="category" required className="w-full bg-black/40 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500 transition-colors" placeholder="Ex: Next.js | Tailwind" />
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Link do Projeto</label>
                        <input name="project_url" type="url" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500 transition-colors" placeholder="https://..." />
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Descrição</label>
                        <textarea name="description" required rows={4} className="w-full bg-black/40 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500 transition-colors" placeholder="Detalhes do projeto..." />
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Imagem de Capa</label>
                        <input type="file" name="image_file" accept="image/*" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 transition-all cursor-pointer text-sm text-gray-400" />
                    </div>

                    <button 
                        disabled={loading}
                        className="w-full py-4 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Enviando...' : 'Publicar Projeto'}
                    </button>
                </form>
            </div>
        </main>
    );
}

// 2. Este é o componente que o Next.js vai ver. Ele "protege" o AdminContent com Suspense
export default function AdminPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0B0A14] text-white">Carregando painel...</div>}>
            <AdminContent />
        </Suspense>
    );
}