'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        //Inserindo Dados
        const {error} = await supabase.from('projects').insert({
            text: formData.get("title"),
            category: formData.get('category'),
            description: formData.get('description'),
            image_url: formData.get('image_url'),
        });

        setLoading(false);

        if (error) {
            alert("Erro ao salvar: " + error.message);
        } else {
            alert('Projeto cadastrado com sucesso!');
            (e.target as HTMLFormElement).reset()
        }
    }

    return (
        <main className="min-h-screen bg-[#0B0A14] text-white p-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-10">Painel do Portifólio</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-[#141221] border border-white/10 p-8 rounded-3xl space-y-4 shadow-xl">
                <div>
                    <label className="block text-sm text-gray-400 mb-1" htmlFor="title">Título do Projeto</label>
                    <input name="title" type="text"  className="w-full bg-black/40 border border-white/10 p-3 rounded-xl outline-none focu:border-purple-500" required />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1" htmlFor="category">Categoria: (ex: Javascript, React, Python)</label>
                    <input name="category" type="text" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500" required />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1" htmlFor="description">Descrição</label>
                    <textarea name="description" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500 h-24" id="description"></textarea>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1" htmlFor="image_url">Link da Imagem</label>
                    <input name="image_url" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500" type="text" />
                </div>

                <button 
                    disabled={loading}
                    className="w-full py-4 bg-purple-600 rounded-full font-bold hover:bg-purple-500 transition-all disabled:opacity-50"
                >
                    {loading ? "Processando..." : "Salvar Projeto no Banco"}
                </button>
            </form>
        </main>
    )
}