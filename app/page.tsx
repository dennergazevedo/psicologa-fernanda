"use client";

import { useState } from "react";
import Image from "next/image";

// Custom SVG Icons for a premium look (eliminates external dependency overhead)
const Icons = {
  Brain: () => (
    <svg className="w-6 h-6 text-brand-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 8.25h4.5M9.75 11.25h4.5" />
    </svg>
  ),
  Puzzle: () => (
    <svg className="w-6 h-6 text-brand-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
  ),
  TCC: () => (
    <svg className="w-6 h-6 text-brand-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.65-4.135m-2.186 4.614a9.03 9.03 0 0 0-8.344 0m8.344-4.614a4.735 4.735 0 0 0-6.166 0m6.166-3.331a3 3 0 1 0-6 0 3 3 0 0 0 6 0ZM4.5 18.75m-2.25 0a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM21.75 18.75m-2.25 0a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0-2.25h.008v.008H7.5v-.008zm6.75 4.5h.008v.008h-.008v-.008zm0-2.25h.008v.008h-.008V15zm0-2.25h.008v.008h-.008v-.008zm2.25 4.5h.008v.008H16.5v-.008zm0-2.25h.008v.008H16.5V15z" />
    </svg>
  ),
  MapPin: () => (
    <svg className="w-5 h-5 text-brand-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  MapPinLarge: () => (
    <svg className="w-8 h-8 text-brand-rose mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-8 h-8 text-brand-rose mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-5 h-5 text-brand-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.122-4.1-6.924-6.924l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-5 h-5 text-brand-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  Instagram: () => (
    <svg className="w-5 h-5 text-brand-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5 text-brand-rose-light shrink-0 bg-brand-rose rounded-full p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  CheckDark: () => (
    <svg className="w-5 h-5 text-white shrink-0 bg-brand-rose rounded-full p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6 text-brand-coffee" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  X: () => (
    <svg className="w-6 h-6 text-brand-coffee" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("memoria");

  // Contact Form State
  const [formData, setFormData] = useState({
    nome: "",
    servico: "Psicoterapia Individual",
    mensagem: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim()) {
      alert("Por favor, preencha seu nome.");
      return;
    }

    const defaultMsg = formData.mensagem.trim() 
      ? formData.mensagem.trim() 
      : `Olá Fernanda! Gostaria de agendar uma consulta sobre ${formData.servico}.`;

    const fullMessage = `Olá Fernanda! Meu nome é ${formData.nome}. ${defaultMsg} Encontrei seu contato através do seu site.`;
    
    // Redirect to WhatsApp
    const waUrl = `https://wa.me/5531995631699?text=${encodeURIComponent(fullMessage)}`;
    window.open(waUrl, "_blank");
  };

  const directWaLink = "https://wa.me/5531995631699?text=Ol%C3%A1%20Fernanda!%20Gostaria%20de%20solicitar%20mais%20informa%C3%A7%C3%B5es%20sobre%20as%20consultas%20atrav%C3%A9s%20do%20site.";

  const avaliacaoFuncoes = [
    {
      id: "memoria",
      name: "Memória",
      desc: "Processos de codificação, armazenamento e recuperação de informações a curto e longo prazo. Fundamental para identificar lapsos frequentes ou perdas significativas.",
      icon: "🧠"
    },
    {
      id: "atencao",
      name: "Atenção",
      desc: "Habilidade de focar, selecionar e manter a concentração em estímulos ou atividades. Crucial no diagnóstico de TDAH e dificuldades organizacionais.",
      icon: "🎯"
    },
    {
      id: "linguagem",
      name: "Linguagem",
      desc: "Avaliação da capacidade de expressão oral e escrita, vocabulário, compreensão verbal e leitura, essencial para diagnosticar atrasos de aprendizagem.",
      icon: "🗣️"
    },
    {
      id: "executivas",
      name: "Funções Executivas",
      desc: "Controle da auto-organização, planejamento, tomada de decisão, flexibilidade cognitiva e inibição de impulsos. O 'gerente' do nosso cérebro.",
      icon: "⚙️"
    },
    {
      id: "percepcao",
      name: "Percepção",
      desc: "Interpretação e integração de estímulos sensoriais visuais e espaciais. Identifica como o cérebro processa o ambiente físico ao redor.",
      icon: "👁️"
    },
    {
      id: "inteligencia",
      name: "Inteligência",
      desc: "Raciocínio lógico, abstrato, verbal e não-verbal. Medição global de habilidades intelectuais de forma ampla e contextualizada.",
      icon: "💡"
    },
    {
      id: "personalidade",
      name: "Personalidade",
      desc: "Aspectos de comportamento emocional, humor, temperamento e formas de lidar com conflitos internos e relacionamentos.",
      icon: "👤"
    }
  ];

  const fatosSobreMim = [
    { text: "Mãe da Maria Fernanda e do Murilo", color: "bg-brand-rose-light" },
    { text: "Pós-graduada em Neuropsicologia", color: "bg-brand-sand" },
    { text: "Formação em Terapia do Esquema", color: "bg-brand-rose-light" },
    { text: "Apaixonada pela minha profissão", color: "bg-brand-sand" },
    { text: "Acredito que cada pessoa é única, independente de diagnósticos", color: "bg-brand-rose-light/70" },
    { text: "Pós-graduada em Terapia Cognitivo-Comportamental", color: "bg-brand-sand" },
    { text: "Amo música, um bom livro e um bom vinho", color: "bg-brand-rose-light" }
  ];

  return (
    <div className="flex flex-col min-h-screen text-brand-coffee select-none bg-brand-cream">
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-40 bg-brand-cream/80 backdrop-blur-md border-b border-brand-rose/10 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#inicio" className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-brand-coffee">FERNANDA PIRES</span>
            <span className="text-xs uppercase tracking-widest text-brand-rose font-medium mt-0.5">Psicóloga & Neuropsicóloga</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-sm font-medium hover:text-brand-rose transition-colors">Início</a>
            <a href="#sobre" className="text-sm font-medium hover:text-brand-rose transition-colors">Sobre Mim</a>
            <a href="#servicos" className="text-sm font-medium hover:text-brand-rose transition-colors">Atuação</a>
            <a href="#avaliacao" className="text-sm font-medium hover:text-brand-rose transition-colors">Avaliação</a>
            <a href="#contato" className="text-sm font-medium hover:text-brand-rose transition-colors">Contato</a>
          </nav>

          <div className="hidden md:block">
            <a
              href={directWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-brand-rose text-white hover:bg-brand-rose/90 transition-all px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md"
            >
              <Icons.Calendar />
              <span>Agendar Consulta</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden focus:outline-none focus:ring-2 focus:ring-brand-rose/20 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-brand-rose/10 bg-brand-cream/95 backdrop-blur-lg absolute top-full left-0 w-full shadow-lg transition-transform duration-300">
            <div className="flex flex-col px-6 py-6 gap-5">
              <a
                href="#inicio"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-brand-rose transition-colors py-1"
              >
                Início
              </a>
              <a
                href="#sobre"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-brand-rose transition-colors py-1"
              >
                Sobre Mim
              </a>
              <a
                href="#servicos"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-brand-rose transition-colors py-1"
              >
                Atuação
              </a>
              <a
                href="#avaliacao"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-brand-rose transition-colors py-1"
              >
                Avaliação
              </a>
              <a
                href="#contato"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-brand-rose transition-colors py-1"
              >
                Contato
              </a>
              <hr className="border-brand-rose/10 my-2" />
              <a
                href={directWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-brand-rose text-white py-3 rounded-full text-base font-semibold shadow-sm"
              >
                <Icons.Calendar />
                <span>Agendar Consulta</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section id="inicio" className="relative pt-12 pb-20 md:py-32 overflow-hidden bg-gradient-to-b from-brand-cream to-brand-sand/50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="md:col-span-7 flex flex-col items-start gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-rose-light text-brand-coffee-light rounded-full text-xs font-semibold tracking-wider uppercase border border-brand-rose/10 shadow-xs">
              <span className="w-1.5 h-1.5 bg-brand-rose rounded-full animate-pulse"></span>
              Atendimento Presencial & Online
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-coffee leading-[1.1] tracking-tight">
              Cuidando da sua saúde mental com acolhimento e ciência.
            </h1>
            
            <p className="max-w-xl text-lg text-brand-coffee-light/90 leading-relaxed font-sans font-light">
              Avaliação neuropsicológica aprofundada e psicoterapia baseada em Terapia Cognitivo-Comportamental (TCC) para apoiar seu desenvolvimento emocional e cognitivo.
            </p>

            {/* Quick credentials */}
            <div className="flex flex-col gap-2.5 my-2 border-l-2 border-brand-rose/30 pl-4 py-1">
              <span className="text-sm font-semibold tracking-wider uppercase text-brand-coffee-light">Fernanda Pires</span>
              <span className="text-xs text-brand-rose font-semibold">Psicóloga e Neuropsicóloga • CRP 04/63320</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
              <a
                href="#contato"
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand-rose px-7 text-white font-semibold shadow-md hover:bg-brand-rose/90 hover:shadow-lg transition-all"
              >
                <span>Agendar Sessão</span>
                <Icons.ArrowRight />
              </a>
              <a
                href="#avaliacao"
                className="flex h-12 items-center justify-center rounded-full border border-brand-rose/25 bg-white/40 hover:bg-white/80 px-7 font-semibold transition-all hover:border-brand-rose/50"
              >
                Saiba Mais Sobre a Avaliação
              </a>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="md:col-span-5 flex justify-center items-center relative">
            {/* Elegant backgrounds behind portrait */}
            <div className="absolute inset-0 bg-brand-rose-light/50 rounded-full blur-3xl transform scale-75 -translate-y-4"></div>
            
            {/* The main profile picture container */}
            <div className="relative w-80 h-96 sm:w-96 sm:h-[480px] rounded-[40px] overflow-hidden shadow-xl border-4 border-white transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/perfil.webp"
                alt="Dra. Fernanda Pires - Psicóloga e Neuropsicóloga"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 320px, 384px"
              />
              
              {/* Overlay card inside picture */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-lg">
                <p className="text-xs text-brand-rose font-bold uppercase tracking-wider">CRP 04/63320</p>
                <h3 className="font-serif font-bold text-lg text-brand-coffee">Fernanda Pires</h3>
                <p className="text-xs text-brand-coffee-light font-medium mt-0.5">Especialista em TCC, Neuropsicologia e Terapia do Esquema</p>
              </div>
            </div>

            {/* Float badge */}
            <div className="absolute -top-4 -right-4 bg-brand-rose text-white text-xs font-semibold py-3 px-4 rounded-2xl shadow-lg border border-white/20 transform rotate-6 hover:-rotate-3 transition-transform duration-300">
              <p className="text-center font-bold text-sm">Online & Presencial</p>
              <p className="text-center opacity-85 text-[10px] mt-0.5">João Monlevade/MG</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Areas of Focus / Atuação */}
      <section id="servicos" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-rose bg-brand-rose-light/50 px-3 py-1 rounded-full">Especialidades</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-5 text-brand-coffee">
              Cuidados especializados para o seu momento de vida
            </h2>
            <p className="text-brand-coffee-light/80 font-sans leading-relaxed">
              Minha atuação clínica foca no tratamento individualizado através de abordagens de eficácia comprovada cientificamente, promovendo reabilitação, clareza e bem-estar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Neuropsicologia */}
            <div className="bg-brand-cream/40 border border-brand-rose/10 hover:border-brand-rose/30 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-brand-rose-light/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icons.Brain />
                </div>
                <h3 className="font-serif font-bold text-xl mb-3 text-brand-coffee">Avaliação Neuropsicológica</h3>
                <p className="text-brand-coffee-light/95 text-sm leading-relaxed mb-6 font-light">
                  Investigação sistemática e detalhada das funções cognitivas, emocionais e comportamentais para mapear forças e fraquezas intelectuais, auxiliando no diagnóstico preciso de transtornos.
                </p>
              </div>
              <ul className="space-y-2 mt-auto border-t border-brand-rose/10 pt-6">
                <li className="flex items-center gap-2 text-xs font-medium text-brand-coffee-light">
                  <Icons.CheckDark /> Diagnósticos Diferenciais
                </li>
                <li className="flex items-center gap-2 text-xs font-medium text-brand-coffee-light">
                  <Icons.CheckDark /> Mapeamento de Funções Cognitivas
                </li>
              </ul>
            </div>

            {/* Card 2: TCC & Schema */}
            <div className="bg-brand-rose-light/20 border border-brand-rose/15 hover:border-brand-rose/40 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-brand-rose-light/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icons.TCC />
                </div>
                <h3 className="font-serif font-bold text-xl mb-3 text-brand-coffee">Terapia Cognitivo-Comportamental</h3>
                <p className="text-brand-coffee-light/95 text-sm leading-relaxed mb-6 font-light">
                  Abordagem focada na reestruturação de pensamentos disfuncionais e padrões comportamentais. Integrada à Terapia do Esquema para desatar nós emocionais profundos originados na infância.
                </p>
              </div>
              <ul className="space-y-2 mt-auto border-t border-brand-rose/10 pt-6">
                <li className="flex items-center gap-2 text-xs font-medium text-brand-coffee-light">
                  <Icons.CheckDark /> Mudanças Práticas e Direcionadas
                </li>
                <li className="flex items-center gap-2 text-xs font-medium text-brand-coffee-light">
                  <Icons.CheckDark /> Foco em Crenças e Esquemas Centrais
                </li>
              </ul>
            </div>

            {/* Card 3: TDAH & TEA */}
            <div className="bg-brand-cream/40 border border-brand-rose/10 hover:border-brand-rose/30 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-brand-rose-light/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icons.Puzzle />
                </div>
                <h3 className="font-serif font-bold text-xl mb-3 text-brand-coffee">TDAH, TEA & Aprendizagem</h3>
                <p className="text-brand-coffee-light/95 text-sm leading-relaxed mb-6 font-light">
                  Atendimento especializado e focado nas particularidades do Transtorno do Déficit de Atenção com Hiperatividade (TDAH), Transtorno do Espectro Autista (TEA) e outras dificuldades de aprendizagem.
                </p>
              </div>
              <ul className="space-y-2 mt-auto border-t border-brand-rose/10 pt-6">
                <li className="flex items-center gap-2 text-xs font-medium text-brand-coffee-light">
                  <Icons.CheckDark /> Estruturação de Rotinas Saudáveis
                </li>
                <li className="flex items-center gap-2 text-xs font-medium text-brand-coffee-light">
                  <Icons.CheckDark /> Adequação Escolar e de Trabalho
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Neuropsychological Evaluation Section */}
      <section id="avaliacao" className="py-20 md:py-28 bg-brand-sand/30 border-t border-b border-brand-rose/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side explanation */}
            <div className="lg:col-span-5 flex flex-col items-start gap-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-rose bg-brand-rose-light/80 px-3 py-1 rounded-full border border-brand-rose/10">
                Avaliação Neuropsicológica
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-coffee">
                O que é e para que serve a Avaliação Neuropsicológica?
              </h2>
              <p className="text-brand-coffee-light leading-relaxed font-light">
                A avaliação neuropsicológica tem por objetivo identificar e entender problemas relacionados ao funcionamento cognitivo, emocional e comportamental de uma pessoa.
              </p>
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-brand-rose/10 shadow-xs relative">
                <div className="absolute top-4 left-4 text-brand-rose opacity-20 text-3xl font-serif">“</div>
                <p className="text-sm italic text-brand-coffee-light/95 pl-4 relative z-10 leading-relaxed font-light">
                  Ela é realizada por neuropsicólogos especializados e envolve a observação clínica atenta combinada a uma série de testes, tarefas e questionários padronizados cientificamente.
                </p>
              </div>
              <a
                href="#contato"
                className="flex items-center gap-2 text-brand-rose hover:text-brand-coffee font-semibold mt-2 group transition-colors"
              >
                <span>Desejo solicitar uma avaliação</span>
                <Icons.ArrowRight />
              </a>
            </div>

            {/* Right side interactive / visual functions evaluated */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <h3 className="font-serif font-bold text-xl text-brand-coffee text-left border-b border-brand-rose/10 pb-3">
                Funções Cognitivas e Emocionais Mapeadas:
              </h3>
              
              {/* Tab headers */}
              <div className="flex flex-wrap gap-2">
                {avaliacaoFuncoes.map((funcao) => (
                  <button
                    key={funcao.id}
                    onClick={() => setActiveTab(funcao.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      activeTab === funcao.id
                        ? "bg-brand-rose text-white shadow-sm"
                        : "bg-white text-brand-coffee-light hover:bg-brand-rose-light/40 border border-brand-rose/5"
                    }`}
                  >
                    <span className="mr-1.5">{funcao.icon}</span>
                    {funcao.name}
                  </button>
                ))}
              </div>

              {/* Active Tab Panel */}
              <div className="bg-white rounded-3xl p-8 border border-brand-rose/10 shadow-md min-h-[180px] flex flex-col justify-center transition-all duration-300">
                {avaliacaoFuncoes.map((funcao) => {
                  if (funcao.id !== activeTab) return null;
                  return (
                    <div key={funcao.id} className="animate-fade-in flex flex-col md:flex-row gap-5 items-start">
                      <div className="text-4xl bg-brand-rose-light/50 p-4 rounded-2xl shrink-0">
                        {funcao.icon}
                      </div>
                      <div>
                        <h4 className="font-serif text-2xl font-bold text-brand-coffee mb-2">
                          Função Avaliada: {funcao.name}
                        </h4>
                        <p className="text-brand-coffee-light leading-relaxed text-sm font-light">
                          {funcao.desc}
                        </p>
                        <div className="flex gap-2 items-center text-xs font-semibold mt-4 text-brand-rose">
                          <span className="w-1.5 h-1.5 bg-brand-rose rounded-full"></span>
                          Avaliado através de baterias padronizadas nacionais e internacionais
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Sobre Mim (Quem sou eu?) */}
      <section id="sobre" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side Workspace Image */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-brand-rose/5 rounded-[40px] transform rotate-3 scale-105"></div>
              <div className="relative w-full h-[320px] sm:h-[400px] rounded-[40px] overflow-hidden shadow-lg border-4 border-white transition-transform duration-300 hover:scale-[1.01]">
                <Image
                  src="/escritorio.webp"
                  alt="Consultório Dra. Fernanda Pires"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                
                {/* Floating caption */}
                <div className="absolute bottom-4 left-4 bg-brand-coffee/90 backdrop-blur-sm rounded-xl py-2 px-4 border border-white/10 text-white text-xs font-medium">
                  Meu espaço de acolhimento físico em João Monlevade/MG
                </div>
              </div>
            </div>

            {/* Right side Text presentation from the slide */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start gap-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-rose bg-brand-rose-light/50 px-3 py-1 rounded-full">
                Quem Sou Eu?
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-coffee">
                Olá, eu sou a Fernanda Pires
              </h2>
              
              <div className="text-brand-coffee-light space-y-4 font-sans font-light leading-relaxed">
                <p>
                  Sou psicóloga clínica e neuropsicóloga (CRP 04/63320) apaixonada por compreender a complexidade da mente humana. Minha missão é proporcionar um ambiente seguro e científico para guiar pessoas em suas jornadas de autodescoberta e reabilitação.
                </p>
                <p>
                  Através do meu trabalho na <strong>Terapia Cognitivo-Comportamental (TCC)</strong> e na <strong>Terapia do Esquema</strong>, ajudo meus clientes a quebrarem padrões repetitivos de sofrimento e construírem vidas mais conectadas com seus valores reais.
                </p>
              </div>

              {/* Polaroid-style facts grid recreate the layout of the user image */}
              <div className="w-full mt-4">
                <h3 className="font-serif font-bold text-lg text-brand-coffee mb-4">
                  Algumas curiosidades e fatos sobre mim:
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  {fatosSobreMim.map((fato, i) => (
                    <div
                      key={i}
                      className={`px-4 py-3 rounded-2xl border border-brand-rose/10 ${fato.color} shadow-xs text-xs font-medium text-brand-coffee-light/95 flex items-center gap-2 hover:shadow-md hover:scale-[1.02] transition-all duration-300`}
                    >
                      <span className="text-brand-rose text-sm">✦</span>
                      <span>{fato.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Atendimento Modalidades (Online/Presencial) */}
      <section className="py-16 md:py-24 bg-brand-rose-light/10 border-t border-brand-rose/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Presencial */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-brand-rose/10 shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <Icons.MapPinLarge />
                <h3 className="font-serif font-bold text-2xl text-brand-coffee mb-3">Terapia Presencial</h3>
                <p className="text-brand-coffee-light/90 text-sm leading-relaxed mb-6 font-light">
                  Realizada no meu consultório confortável e acolhedor em João Monlevade/MG. Projetado para oferecer máxima discrição, silêncio e um ambiente propício para a introspecção e o alívio emocional.
                </p>
                <div className="space-y-3 border-t border-brand-rose/10 pt-6">
                  <div className="flex items-start gap-3">
                    <Icons.CheckDark />
                    <div className="text-xs text-brand-coffee-light">
                      <p className="font-semibold">Localização Privilegiada</p>
                      <p className="font-light mt-0.5">Fácil acesso em João Monlevade/MG</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icons.CheckDark />
                    <div className="text-xs text-brand-coffee-light">
                      <p className="font-semibold">Equipamentos Completos</p>
                      <p className="font-light mt-0.5">Bateria de testes oficiais para Avaliação Neuropsicológica</p>
                    </div>
                  </div>
                </div>
              </div>
              <a
                href="#contato"
                className="mt-8 inline-flex items-center justify-center bg-brand-rose/10 hover:bg-brand-rose/25 text-brand-coffee font-semibold px-6 py-3 rounded-full text-xs transition-colors"
              >
                Como agendar presencial
              </a>
            </div>

            {/* Online */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-brand-rose/10 shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <Icons.Globe />
                <h3 className="font-serif font-bold text-2xl text-brand-coffee mb-3">Terapia Online</h3>
                <p className="text-brand-coffee-light/90 text-sm leading-relaxed mb-6 font-light">
                  Oferece a flexibilidade de realizar as sessões no conforto da sua casa, de qualquer lugar do Brasil ou exterior. As consultas utilizam chamadas de vídeo criptografadas e seguras, garantindo total sigilo profissional.
                </p>
                <div className="space-y-3 border-t border-brand-rose/10 pt-6">
                  <div className="flex items-start gap-3">
                    <Icons.CheckDark />
                    <div className="text-xs text-brand-coffee-light">
                      <p className="font-semibold">Comodidade e Praticidade</p>
                      <p className="font-light mt-0.5">Sem tempo de deslocamento ou custos extras</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icons.CheckDark />
                    <div className="text-xs text-brand-coffee-light">
                      <p className="font-semibold">Segurança Certificada</p>
                      <p className="font-light mt-0.5">Plataformas em conformidade com as diretrizes do CFP</p>
                    </div>
                  </div>
                </div>
              </div>
              <a
                href="#contato"
                className="mt-8 inline-flex items-center justify-center bg-brand-rose text-white hover:bg-brand-rose/90 font-semibold px-6 py-3 rounded-full text-xs shadow-sm transition-colors"
              >
                Como agendar online
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Contact / CTA & Support Image Section */}
      <section id="contato" className="py-20 md:py-28 bg-brand-cream border-t border-brand-rose/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side text, contact and support image (perfil2.webp) */}
            <div className="lg:col-span-5 flex flex-col gap-8 order-2 lg:order-1">
              
              {/* Contact info list */}
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-rose bg-brand-rose-light/50 px-3 py-1 rounded-full">
                    Dúvidas ou Agendamentos
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-brand-coffee mt-3">
                    Ficou com alguma dúvida? Entre em contato.
                  </h2>
                </div>
                
                <div className="flex flex-col gap-4 text-sm mt-2">
                  <a 
                    href="tel:31995631699" 
                    className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/70 hover:bg-white border border-brand-rose/5 hover:border-brand-rose/10 hover:shadow-xs transition-all text-brand-coffee-light font-medium"
                  >
                    <div className="p-2 bg-brand-rose-light/40 rounded-xl">
                      <Icons.Phone />
                    </div>
                    <div>
                      <p className="text-xs text-brand-rose font-bold uppercase tracking-wider">Telefone</p>
                      <p className="mt-0.5">(31) 99563-1699</p>
                    </div>
                  </a>

                  <a 
                    href="mailto:psifernandapires@gmail.com" 
                    className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/70 hover:bg-white border border-brand-rose/5 hover:border-brand-rose/10 hover:shadow-xs transition-all text-brand-coffee-light font-medium"
                  >
                    <div className="p-2 bg-brand-rose-light/40 rounded-xl">
                      <Icons.Mail />
                    </div>
                    <div>
                      <p className="text-xs text-brand-rose font-bold uppercase tracking-wider">E-mail</p>
                      <p className="mt-0.5 text-xs sm:text-sm">psifernandapires@gmail.com</p>
                    </div>
                  </a>

                  <a 
                    href="https://instagram.com/psi.fernandapires" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/70 hover:bg-white border border-brand-rose/5 hover:border-brand-rose/10 hover:shadow-xs transition-all text-brand-coffee-light font-medium"
                  >
                    <div className="p-2 bg-brand-rose-light/40 rounded-xl">
                      <Icons.Instagram />
                    </div>
                    <div>
                      <p className="text-xs text-brand-rose font-bold uppercase tracking-wider">Instagram</p>
                      <p className="mt-0.5">@psi.fernandapires</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Support Image (perfil2.webp) */}
              <div className="relative w-full h-[220px] rounded-3xl overflow-hidden shadow-md border-4 border-white transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/perfil2.webp"
                  alt="Fernanda Pires - Psicoterapeuta"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                
                {/* Floating credential */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="text-white font-serif font-bold text-base">Fernanda Pires</p>
                  <p className="text-white/80 text-[10px] uppercase tracking-wider mt-0.5">Psicóloga & Neuropsicóloga • CRP 04/63320</p>
                </div>
              </div>

            </div>

            {/* Right side interactive Contact Form */}
            <div className="lg:col-span-7 order-1 lg:order-2 bg-white rounded-[32px] p-8 md:p-10 border border-brand-rose/15 shadow-lg relative">
              
              {/* Soft decorative tag */}
              <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-brand-rose text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full shadow-xs">
                Mensagem Rápida
              </div>

              <h3 className="font-serif font-bold text-2xl text-brand-coffee mb-1">Deseja agendar ou tirar dúvidas?</h3>
              <p className="text-brand-coffee-light/80 text-sm mb-6 leading-relaxed font-light">
                Preencha os campos abaixo e inicie uma conversa diretamente no meu WhatsApp com sua mensagem pronta.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-xs font-bold uppercase tracking-wider text-brand-coffee-light mb-1.5">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Como gostaria de ser chamado(a)?"
                    className="w-full h-12 px-4 rounded-xl border border-brand-rose/15 bg-brand-cream/10 focus:outline-none focus:ring-2 focus:ring-brand-rose/30 focus:border-brand-rose text-sm font-medium transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="servico" className="block text-xs font-bold uppercase tracking-wider text-brand-coffee-light mb-1.5">
                    Serviço de Interesse
                  </label>
                  <select
                    id="servico"
                    name="servico"
                    value={formData.servico}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-xl border border-brand-rose/15 bg-white focus:outline-none focus:ring-2 focus:ring-brand-rose/30 focus:border-brand-rose text-sm font-medium transition-all appearance-none cursor-pointer"
                  >
                    <option value="Psicoterapia Individual">Psicoterapia Individual (TCC)</option>
                    <option value="Avaliação Neuropsicológica">Avaliação Neuropsicológica</option>
                    <option value="Dificuldades de Aprendizagem">Apoio a Dificuldades de Aprendizagem (TDAH/TEA)</option>
                    <option value="Outro assunto">Outras Dúvidas</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-xs font-bold uppercase tracking-wider text-brand-coffee-light mb-1.5">
                    Mensagem Opcional
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Descreva brevemente como posso ajudar ou apenas envie o formulário para conversarmos."
                    rows={4}
                    className="w-full p-4 rounded-xl border border-brand-rose/15 bg-brand-cream/10 focus:outline-none focus:ring-2 focus:ring-brand-rose/30 focus:border-brand-rose text-sm font-medium transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full h-13 flex items-center justify-center gap-2 rounded-xl bg-brand-rose text-white font-semibold shadow-md hover:bg-brand-rose/95 hover:shadow-lg transition-all text-sm cursor-pointer"
                >
                  <Icons.Calendar />
                  <span>Enviar Mensagem por WhatsApp</span>
                </button>
              </form>

              <p className="text-center text-[10px] text-brand-coffee-light/70 mt-4 leading-relaxed">
                Ao clicar, você será redirecionado para o WhatsApp com a mensagem preenchida para iniciar sua conversa.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Footer Section */}
      <footer className="bg-brand-coffee text-brand-cream py-12 border-t border-brand-rose/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 items-start">
            
            <div>
              <p className="font-serif text-xl font-bold tracking-tight mb-2">Fernanda Pires</p>
              <p className="text-xs text-brand-rose-light/80 tracking-wider">Psicóloga & Neuropsicóloga</p>
              <p className="text-xs text-brand-rose-light/60 mt-1">CRP 04/63320</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-brand-rose font-bold mb-4">Informações de Contato</p>
              <ul className="text-xs space-y-2 text-brand-rose-light/80">
                <li>Telefone: (31) 99563-1699</li>
                <li>E-mail: psifernandapires@gmail.com</li>
                <li>João Monlevade - Minas Gerais</li>
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-brand-rose font-bold mb-4">Ética e Segurança</p>
              <p className="text-xs text-brand-rose-light/75 leading-relaxed font-light">
                O atendimento online é regulamentado e autorizado pelo Conselho Federal de Psicologia (CFP). Os dados coletados neste site servem apenas para a triagem inicial via WhatsApp.
              </p>
            </div>

          </div>

          <hr className="border-brand-rose/10 my-6" />

          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-brand-rose-light/60 gap-4 text-center">
            <p>© {new Date().getFullYear()} Fernanda Pires. Todos os direitos reservados.</p>
            <p>Desenvolvido com carinho e acolhimento.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

