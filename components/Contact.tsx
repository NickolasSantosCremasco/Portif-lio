'use client'

import { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Phone, MapPin, ArrowUpRight, CheckCircle, Loader2, AlertCircle } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const { t } = useLanguage() // 🌐 Consumindo o dicionário de tradução

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    })

    tl.from('.contact-title-block', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.contact-info-item', {
      opacity: 0,
      x: -20,
      duration: 0.6,
      stagger: 0.15
    }, '-=0.4')
    .from('.contact-card', {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)',
      duration: 1,
      ease: 'power2.out'
    }, '-=0.6')
  }, { scope: sectionRef })

  // 🚀 Função para enviar o formulário via API do Web3Forms
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    const form = e.currentTarget
    const formData = new FormData(form)

    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        form.reset() // Limpa os campos após o envio
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setErrorMessage(data.message || "Ocorreu um erro ao enviar. Tente novamente.")
      }
    } catch {
      setErrorMessage("Erro de conexão. Verifique sua rede e tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section 
      ref={sectionRef} 
      id="contact"
      className="relative min-h-screen bg-black text-white py-24 px-8 md:px-16 flex items-center overflow-hidden border-t border-white/10 select-none"
    >
      {/* Luzes sutis no fundo (Glow) */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-purple-900/20 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* 📌 Lado Esquerdo: Textos e Informações de Contato Traduzidos */}
        <div className="lg:col-span-6 space-y-10">
          <div className="contact-title-block space-y-3">
            <h2 className="text-5xl md:text-6xl font-black tracking-widest uppercase text-white leading-none">
              {t.contact.title}
            </h2>
            <div className="w-12 h-[2px] bg-blue-500" />
            <p className="text-xs md:text-sm text-gray-400 font-mono tracking-wider pt-1">
              nickolas.cremasco@exemplo.com
            </p>
            <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed max-w-lg pt-4">
              {t.contact.description}
            </p>
          </div>

          {/* Lista de Contatos */}
          <div className="space-y-6 pt-2">
            <div className="contact-info-item flex items-center space-x-4">
              <div className="p-3 border border-white/10 rounded-full bg-white/5 text-blue-400">
                <Mail size={18} />
              </div>
              <div>
                <span className="block text-[10px] text-gray-500 tracking-widest uppercase font-mono">
                  {t.contact.emailLabel}
                </span>
                <a href="mailto:nickolas.cremasco@exemplo.com" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">
                  nickolas.cremasco@exemplo.com
                </a>
              </div>
            </div>

            <div className="contact-info-item flex items-center space-x-4">
              <div className="p-3 border border-white/10 rounded-full bg-white/5 text-gray-400">
                <Phone size={18} />
              </div>
              <div>
                <span className="block text-[10px] text-gray-500 tracking-widest uppercase font-mono">
                  {t.contact.phoneLabel}
                </span>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">
                  +55 (11) 99999-9999
                </a>
              </div>
            </div>

            <div className="contact-info-item flex items-center space-x-4">
              <div className="p-3 border border-white/10 rounded-full bg-white/5 text-gray-400">
                <MapPin size={18} />
              </div>
              <div>
                <span className="block text-[10px] text-gray-500 tracking-widest uppercase font-mono">
                  {t.contact.locationLabel}
                </span>
                <span className="text-sm font-medium text-gray-200">
                  São Paulo, SP — Brasil
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ✉️ Lado Direito: Card do Formulário Traduzido */}
        <div className="lg:col-span-6">
          <div className="contact-card bg-neutral-900/40 border border-white/10 p-8 md:p-10 rounded-xl backdrop-blur-md shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Campo Nome */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-[11px] font-mono tracking-widest text-gray-300 uppercase">
                  {t.contact.nameField}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder={t.contact.namePlaceholder}
                  className="bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder-gray-600 focus:border-white focus:outline-hidden transition-colors"
                />
              </div>

              {/* Campo Email */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-[11px] font-mono tracking-widest text-gray-300 uppercase">
                  {t.contact.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  className="bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder-gray-600 focus:border-white focus:outline-hidden transition-colors"
                />
              </div>

              {/* Campo Assunto */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="subject" className="text-[11px] font-mono tracking-widest text-gray-300 uppercase">
                  {t.contact.subjectField}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder={t.contact.subjectPlaceholder}
                  className="bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder-gray-600 focus:border-white focus:outline-hidden transition-colors"
                />
              </div>

              {/* Campo Mensagem */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="text-[11px] font-mono tracking-widest text-gray-300 uppercase">
                  {t.contact.messageField}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  placeholder={t.contact.messagePlaceholder}
                  className="bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder-gray-600 focus:border-white focus:outline-hidden transition-colors resize-none"
                />
              </div>

              {/* Botão Enviar */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold tracking-widest uppercase text-white border border-gray-500 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span>{t.contact.sendingBtn}</span>
                      <Loader2 size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>{t.contact.sendBtn}</span>
                      <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>

              {/* Mensagem de Sucesso */}
              {submitted && (
                <div className="flex items-center justify-center space-x-2 text-emerald-400 text-xs font-mono tracking-wider pt-2">
                  <CheckCircle size={16} />
                  <span>{t.contact.successMsg}</span>
                </div>
              )}

              {/* Mensagem de Erro */}
              {errorMessage && (
                <div className="flex items-center justify-center space-x-2 text-rose-400 text-xs font-mono tracking-wider pt-2">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}