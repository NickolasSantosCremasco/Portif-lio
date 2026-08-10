'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'pt' | 'en'

// 🌐 Dicionário de Traduções do Site
export const translations = {
  pt: {
    nav: {
      home: 'Home',
      about: 'Sobre',
      resume: 'Resume',
      projects: 'Projetos',
    },
    hero: {
      role: 'Desenvolvedor Full Stack',
      description: 'Desenvolvedor Full Stack especializado na criação de aplicações web de alta performance, interfaces modernas e arquiteturas robustas.',
      resumeBtn: 'Resume',
      portfolioBtn: 'Portfolio',
    },
    about: {
      title: 'ABOUT',
      location: 'São Paulo, SP — Brasil',
      p1: 'Desenvolvedor Fullstack focado na construção de aplicações web de alta performance, unindo a arquitetura consistente do backend ao design minimalista e responsivo no frontend.',
      p2: 'Especializado no ecossistema Next.js, Python e bancos de dados relacionais (PostgreSQL/MySQL), busco transformar requisitos complexos em código limpo e experiências imersivas.',
    },
    portfolio: {
      title: 'PORTFOLIO',
      subtitle: 'PROJETOS EM DESTAQUE E EXPERIÊNCIAS',
      loading: 'Carregando Projetos do Banco...',
      projectLabel: 'PROJECT',
      noImage: 'SEM PRÉVIA DE IMAGEM',
    },
    contact: {
      title: 'CONTACT',
      description: 'Sou um Desenvolvedor Fullstack focado na criação de aplicações web responsivas e de alta performance. Sinta-se à vontade para entrar em contato se quiser colaborar, tirar dúvidas ou apenas dizer oi.',
      emailLabel: 'EMAIL',
      phoneLabel: 'TELEFONE',
      locationLabel: 'LOCALIZAÇÃO',
      nameField: 'NOME',
      namePlaceholder: 'Seu Nome',
      subjectField: 'ASSUNTO',
      subjectPlaceholder: 'Novo Projeto',
      messageField: 'MENSAGEM',
      messagePlaceholder: 'Sua Mensagem...',
      sendBtn: 'ENVIAR MENSAGEM',
      sendingBtn: 'ENVIANDO...',
      successMsg: 'MENSAGEM ENVIADA COM SUCESSO!',
    },
    footer: {
      rights: 'TODOS OS DIREITOS RESERVADOS.',
      backToTop: 'VOLTAR AO TOPO',
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      resume: 'Resume',
      projects: 'Projects',
    },
    hero: {
      role: 'Full Stack Developer',
      description: 'Full Stack Developer specializing in building high-performance web applications, modern interfaces, and scalable architectures.',
      resumeBtn: 'Resume',
      portfolioBtn: 'Portfolio',
    },
    about: {
      title: 'ABOUT',
      location: 'São Paulo, SP — Brazil',
      p1: 'Fullstack Developer focused on building high-performance web applications, combining robust backend architecture with minimalist and responsive frontend design.',
      p2: 'Specialized in the Next.js ecosystem, Python, and relational databases (PostgreSQL/MySQL), aiming to translate complex requirements into clean code and immersive experiences.',
    },
    portfolio: {
      title: 'PORTFOLIO',
      subtitle: 'FEATURED PROJECTS & EXPERIENCES',
      loading: 'Loading Projects from Database...',
      projectLabel: 'PROJECT',
      noImage: 'NO IMAGE PREVIEW',
    },
    contact: {
      title: 'CONTACT',
      description: 'I am a Fullstack Developer focused on creating high-performance, responsive web applications. Feel free to reach out if you’d like to collaborate, have a question, or just want to say hi.',
      emailLabel: 'EMAIL',
      phoneLabel: 'PHONE',
      locationLabel: 'LOCATION',
      nameField: 'NAME',
      namePlaceholder: 'Your Name',
      subjectField: 'SUBJECT',
      subjectPlaceholder: 'New Project',
      messageField: 'MESSAGE',
      messagePlaceholder: 'Your Message...',
      sendBtn: 'SEND MESSAGE',
      sendingBtn: 'SENDING...',
      successMsg: 'MESSAGE SENT SUCCESSFULLY!',
    },
    footer: {
      rights: 'ALL RIGHTS RESERVED.',
      backToTop: 'BACK TO TOP',
    }
  }
}

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: typeof translations.pt
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt')

  // 1. Carrega o idioma salvo no localStorage ao montar o componente
  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio_lang') as Language
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // 2. Função para alternar e salvar a preferência
  const toggleLanguage = () => {
    setLanguage((prev) => {
      const nextLang: Language = prev === 'pt' ? 'en' : 'pt'
      localStorage.setItem('portfolio_lang', nextLang)
      return nextLang
    })
  }

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de um LanguageProvider')
  }
  return context
}