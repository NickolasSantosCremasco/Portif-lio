'use client'

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Trash2 } from "lucide-react";

interface Project {
    id:number;
    text:string;
    category: string
}

export default function AdminPage() {
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState<Project[]>([])

    async function fetchProjects() {
        const {data} = await supabase
            .from('projects')
            .select('*')
            .order('id', {ascending:false});

        if (data) setProjects(data)
    }

    //Carrega lista assim que abre a página
    useEffect(() => {
        fetchProjects();
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const imageFile = formData.get('image_file') as File;
        let imageUrl = "";

        if (imageFile && imageFile.size > 0) {
          const fileExt = imageFile.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${fileName}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('project-images')
            .upload(filePath, imageFile);

          if(uploadError) {
            alert('Erro no upload da imagem:' + uploadError.message);
            setLoading(false);
            return;
          }

          const { data: publicUrlData } = supabase.storage
            .from('project-images')
            .getPublicUrl(filePath)

          imageUrl = publicUrlData.publicUrl
        }

        const {error: dbError } = await supabase.from('projects').insert({
          text:formData.get('title'),
          category: formData.get('category'),
          description: formData.get('description'),
          image_url: imageUrl,
        });

        setLoading(false);

        if (dbError) {
            alert("Erro ao salvar: " + dbError.message);
        } else {
            alert('Projeto cadastrado com sucesso!');
            (e.target as HTMLFormElement).reset()
            fetchProjects(); //atualiza lista lá embaixo
        }
    }

    async function handleDelete(id: number) {
        const confirm = window.confirm('Tem certeza que quer apagar este projeto?');
        if (!confirm) return;

        const {error} = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            alert("Erro ao Deletar:" + error.message);
        } else {
            setProjects(projects.filter((project) => project.id !== id))
        }
    }

    return (
    <main className="min-h-screen bg-[#0B0A14] text-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-10 text-purple-500">Painel do Portfólio</h1>
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* --- LADO ESQUERDO: FORMULÁRIO --- */}
        <div className="bg-[#141221] border border-white/10 p-8 rounded-3xl h-fit">
          <h2 className="text-xl font-bold mb-6">Novo Projeto</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400">Título</label>
              <input name="title" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500" required />
            </div>
            <div>
              <label className="text-xs text-gray-400">Categoria</label>
              <input name="category" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400">Descrição</label>
              <textarea name="description" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500 h-24" />
            </div>
            
            <div>
              <label className="text-xs text-gray-400">Link do Projeto (Demo/Github)</label>
              <input type="url" name="project_url" placeholder="https://..." className="w-full bg-black/40 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500" />
            </div>
            
            <div>
              <label className="text-xs text-gray-400">Imagem do Projeto</label>
              <input name="image_file" type="file" accept="image/*" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500" />
            </div>

            <button 
              disabled={loading}
              className="w-full py-4 bg-purple-600 rounded-full font-bold hover:bg-purple-500 transition-all disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Cadastrar"}
            </button>
          </form>
        </div>

        {/* --- LADO DIREITO: LISTA DE PROJETOS --- */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-6">Projetos Existentes</h2>
          
          {projects.length === 0 && <p className="text-gray-500">Nenhum projeto cadastrado.</p>}

          {projects.map((project) => (
            <div key={project.id} className="bg-[#141221] border border-white/5 p-4 rounded-2xl flex justify-between items-center group hover:border-purple-500/30 transition">
              <div>
                <h3 className="font-bold">{project.text}</h3>
                <span className="text-xs text-gray-400 uppercase tracking-wider">{project.category}</span>
              </div>
              
              <button 
                onClick={() => handleDelete(project.id)}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                title="Deletar projeto"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}