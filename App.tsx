
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Gamepad2, 
  MonitorOff, 
  Clock, 
  CheckCircle2, 
  Star, 
  ChevronDown, 
  ShieldCheck, 
  Gift, 
  ArrowRight, 
  Eye,
  X,
  Zap,
  Crown,
  Timer,
  TrendingUp
} from 'lucide-react';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);

  useEffect(() => {
    let timer: number;
    if (showUpsell && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showUpsell, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBasicClick = () => {
    setTimeLeft(90);
    setShowUpsell(true);
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      <Header />
      <Hero />
      <ProblemSolution />
      <SampleContent onImageClick={(src) => setSelectedImage(src)} />
      <Benefits />
      <Features />
      <Testimonials />
      <Pricing onBasicClick={handleBasicClick} />
      <FAQ />
      <Footer />

      {/* Lightbox / Modal de Imagem em Tela Cheia */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-sunnyYellow transition-colors z-[110]"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>
          <img 
            src={selectedImage} 
            alt="Visualização em tela cheia" 
            className="max-w-full max-h-full rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Popup de Upsell */}
      {showUpsell && (
        <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-[40px] max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowUpsell(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="bg-vibrantOrange p-6 text-center text-white">
              <div className="flex justify-center mb-2">
                <TrendingUp size={40} className="animate-bounce" />
              </div>
              <h3 className="text-2xl font-heading font-black">OFERTA RELÂMPAGO!</h3>
              <p className="text-white/90">Não leve apenas o básico...</p>
            </div>

            <div className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 text-vibrantOrange font-bold text-xl mb-6">
                <Timer size={24} className="animate-pulse" />
                <span>EXPIRA EM: {formatTime(timeLeft)}</span>
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-4">
                Leve o <span className="text-sunnyYellow bg-slate-900 px-2 py-1 rounded">PLANO PLUS</span> completo agora!
              </h4>

              <div className="space-y-2 mb-8 text-left inline-block mx-auto">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>+230 desenhos no total</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Acesso Vitalício + Atualizações</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Economia de R$ 10,00 extras</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                <p className="text-slate-500 line-through">De R$ 34,90</p>
                <div className="text-4xl font-heading font-black text-slate-900">
                  Por R$ 24,90
                </div>
              </div>

              <button className="w-full bg-sunnyYellow hover:bg-yellow-400 text-slate-900 py-5 rounded-2xl text-xl font-black shadow-lg shadow-yellow-200 transition-all flex items-center justify-center gap-3 mb-4">
                ACEITAR UPGRADE AGORA <ArrowRight />
              </button>

              <button 
                onClick={() => setShowUpsell(false)}
                className="text-slate-400 text-sm hover:underline"
              >
                Não, prefiro continuar com o básico
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Header: React.FC = () => (
  <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-skyBlue/20">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-vibrantOrange rounded-lg flex items-center justify-center text-white font-heading text-2xl">F</div>
        <span className="font-heading text-xl text-slate-900 hidden sm:block">Férias Inesquecíveis</span>
      </div>
      <a 
        href="#oferta" 
        className="bg-sunnyYellow hover:bg-yellow-400 text-slate-900 px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105"
      >
        Quero o Guia!
      </a>
    </div>
  </header>
);

const Hero: React.FC = () => (
  <section className="pt-32 pb-20 hero-gradient px-4">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
      <div className="lg:w-1/2 text-center lg:text-left">
        <span className="bg-vibrantOrange/10 text-vibrantOrange px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
          O guia definitivo para mamães
        </span>
        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-heading text-slate-900 leading-tight">
          Transforme o tédio das férias em <span className="text-vibrantOrange">memórias inesquecíveis</span> sem telas
        </h1>
        
        <div className="mt-8 relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <iframe 
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/XqZsoesa55w" 
            title="Vídeo de Apresentação"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>

        <p className="mt-8 text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
          Guia prático com atividades que estimulam a criatividade e fortalecem o vínculo, prontas para aplicar em apenas 5 minutos.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <a 
            href="#oferta" 
            className="bg-sunnyYellow hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-yellow-200 flex items-center justify-center gap-2 transition-all"
          >
            GARANTIR MINHA VAGA <ArrowRight size={20} />
          </a>
          <div className="flex items-center gap-3 justify-center">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/${i + 20}/40/40`} className="w-10 h-10 rounded-full border-2 border-white" alt="Avatar usuário" />
              ))}
            </div>
            <p className="text-sm text-slate-500"><strong>+1.500</strong> mães conectadas</p>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 relative hidden lg:block">
        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-500">
          <img src="https://i.ibb.co/Q7gJTSrj/capa.jpg" alt="Capa do Guia Férias Inesquecíveis" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-sunnyYellow rounded-full blur-3xl opacity-30 -z-10 animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-skyBlue rounded-full blur-3xl opacity-30 -z-10"></div>
      </div>
    </div>
  </section>
);

const SampleContent: React.FC<{ onImageClick: (src: string) => void }> = ({ onImageClick }) => {
  const images = [
    "https://i.ibb.co/1G2tvmfC/01.jpg",
    "https://i.ibb.co/7x3bghrR/02.jpg",
    "https://i.ibb.co/kshtn7QY/03.jpg",
    "https://i.ibb.co/cKDVPHy1/04.jpg"
  ];

  const duplicatedImages = [...images, ...images, ...images, ...images];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 md:mb-12 text-center">
        <span className="flex items-center justify-center gap-2 text-vibrantOrange font-bold uppercase tracking-widest text-sm mb-4">
          <Eye size={18} /> Espiadinha Exclusiva
        </span>
        <h2 className="text-3xl md:text-4xl font-heading text-slate-900">Veja o que te espera por dentro</h2>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          Páginas ilustradas, lúdicas e extremamente fáceis de seguir. Um material pensado para encantar mães e filhos. Clique para ampliar!
        </p>
      </div>

      <div className="relative flex overflow-hidden mb-4 md:mb-8">
        <div className="flex animate-infinite-scroll whitespace-nowrap py-2">
          {duplicatedImages.map((src, idx) => (
            <div 
              key={`left-${idx}`} 
              onClick={() => onImageClick(src)}
              className="mx-2 md:mx-4 flex-shrink-0 w-44 md:w-80 h-[280px] md:h-[450px] rounded-xl md:rounded-2xl overflow-hidden shadow-lg border-2 md:border-4 border-white transform transition-transform hover:scale-105 cursor-zoom-in relative group"
            >
              <img src={src} alt={`Página do Guia ${idx}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Eye className="text-white" size={32} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex animate-infinite-scroll-reverse whitespace-nowrap py-2">
          {duplicatedImages.map((src, idx) => (
            <div 
              key={`right-${idx}`} 
              onClick={() => onImageClick(src)}
              className="mx-2 md:mx-4 flex-shrink-0 w-44 md:w-80 h-[280px] md:h-[450px] rounded-xl md:rounded-2xl overflow-hidden shadow-lg border-2 md:border-4 border-white transform transition-transform hover:scale-105 cursor-zoom-in relative group"
            >
              <img src={src} alt={`Página do Guia ${idx}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Eye className="text-white" size={32} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProblemSolution: React.FC = () => (
  <section className="py-20 bg-slate-50 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-heading text-slate-900 mb-8">
        Você se sente culpada pelo excesso de telas nessas férias?
      </h2>
      <div className="grid md:grid-cols-2 gap-8 text-left">
        <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
          <h3 className="text-red-600 font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">⚠️</span> A realidade atual:
          </h3>
          <ul className="space-y-3 text-slate-600">
            <li className="flex gap-2"><span>❌</span> Crianças viciadas em tablets e TVs</li>
            <li className="flex gap-2"><span>❌</span> Você exausta e sem tempo para planejar</li>
            <li className="flex gap-2"><span>❌</span> Clima de irritação e tédio em casa</li>
            <li className="flex gap-2"><span>❌</span> Culpa por não estar "presente" de verdade</li>
          </ul>
        </div>
        <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
          <h3 className="text-green-600 font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">✨</span> A Solução Inesquecível:
          </h3>
          <ul className="space-y-3 text-slate-600">
            <li className="flex gap-2"><span>✅</span> Brincadeiras que prendem a atenção</li>
            <li className="flex gap-2"><span>✅</span> Planejamento pronto (zero esforço)</li>
            <li className="flex gap-2"><span>✅</span> Fortalecimento real do vínculo</li>
            <li className="flex gap-2"><span>✅</span> Materiais que você já tem em casa</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Benefits: React.FC = () => {
  const items = [
    { icon: <Gamepad2 className="text-vibrantOrange" />, title: "Desenvolvimento Cognitivo", desc: "Estimule a lógica e criatividade sem precisar de tecnologia cara." },
    { icon: <Heart className="text-vibrantOrange" />, title: "Conexão Emocional", desc: "Crie memórias afetivas que seu filho levará para a vida toda." },
    { icon: <MonitorOff className="text-vibrantOrange" />, title: "Menos Telas", desc: "Reduza o tempo de exposição digital de forma natural e divertida." },
    { icon: <Clock className="text-vibrantOrange" />, title: "Praticidade Total", desc: "Atividades explicadas passo a passo para fazer em 5-10 min." }
  ];

  return (
    <section className="py-20 bg-softBlue px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-heading text-slate-900 mb-16">Os 4 Pilares das Férias Perfeitas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-vibrantOrange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-vibrantOrange group-hover:text-white transition-colors">
                {React.cloneElement(item.icon as React.ReactElement, { className: "group-hover:text-white transition-colors" })}
              </div>
              <h3 className="font-heading text-xl mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features: React.FC = () => (
  <section className="py-20 bg-white px-4">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <img src="https://i.ibb.co/Q7gJTSrj/capa.jpg" alt="Preview da Capa do Material" className="rounded-3xl shadow-2xl rotate-2 transition-transform hover:rotate-0 duration-500" />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-heading text-slate-900 mb-8">O que você vai encontrar no material:</h2>
          <div className="space-y-6">
            {[
              "Calendário de 30 dias de atividades",
              "Lista de compras econômica (materiais simples)",
              "Guia de mediação para mães ocupadas",
              "Desafios em família para o final de semana",
              "Planilha de rotina equilibrada nas férias"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 text-lg text-slate-700">
                <CheckCircle2 className="text-skyBlue shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-sunnyYellow/20 rounded-2xl border-l-4 border-sunnyYellow">
            <p className="font-semibold text-slate-800">BÔNUS EXCLUSIVO: 10 Atividades para dias de chuva (PDF Separado)</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials: React.FC = () => (
  <section className="py-20 bg-slate-50 px-4 overflow-hidden">
    <div className="max-w-7xl mx-auto text-center mb-16">
      <h2 className="text-3xl font-heading mb-4">O que as mamães estão dizendo...</h2>
      <div className="flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="fill-sunnyYellow text-sunnyYellow" />)}
      </div>
    </div>
    <div className="flex gap-8 overflow-x-auto pb-8 snap-x scrollbar-hide">
      {[1, 2, 3].map(i => (
        <div key={i} className="min-w-[320px] bg-white p-8 rounded-3xl shadow-sm snap-center">
          <p className="italic text-slate-600 mb-6">"Nunca imaginei que seria tão simples tirar meu filho do Roblox. O guia salvou minhas férias e nossa casa está muito mais alegre!"</p>
          <div className="flex items-center gap-4">
            <img src={`https://picsum.photos/seed/user${i + 50}/50/50`} className="rounded-full" alt="User avatar" />
            <div>
              <p className="font-bold text-slate-900">Mariana S.</p>
              <p className="text-xs text-slate-500">Mãe do Pedro (6 anos)</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Pricing: React.FC<{ onBasicClick: () => void }> = ({ onBasicClick }) => (
  <section id="oferta" className="py-24 bg-skyBlue px-4 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-20 bg-white rounded-b-[100px]"></div>
    <div className="max-w-7xl mx-auto relative z-10 pt-10">
      <h2 className="text-center text-4xl font-heading text-slate-900 mb-4">Escolha o seu plano</h2>
      <p className="text-center text-slate-700 mb-16 max-w-xl mx-auto">Invista na diversão do seu filho e na sua tranquilidade durante as férias.</p>
      
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Oferta Básica */}
        <div className="bg-white/80 backdrop-blur rounded-[40px] shadow-xl p-8 md:p-10 border-t-8 border-slate-300 transform transition-transform hover:scale-[1.02]">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-slate-400" size={20} />
            <span className="text-slate-500 font-bold text-sm uppercase">Essencial</span>
          </div>
          <h3 className="text-3xl font-heading mb-2">Plano Básico</h3>
          <p className="text-slate-500 mb-8">O empurrãozinho que você precisa.</p>
          
          <div className="mb-8">
            <span className="text-4xl font-heading text-slate-900">R$ 10,90</span>
            <span className="text-slate-500 ml-2">Pagamento Único</span>
          </div>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> <span>10 Desenhos Exclusivos</span></div>
            <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> <span>7 dias de garantia</span></div>
            <div className="flex items-center gap-3 opacity-40"><X size={18} className="text-red-400" /> <span className="line-through">Atualizações mensais</span></div>
            <div className="flex items-center gap-3 opacity-40"><X size={18} className="text-red-400" /> <span className="line-through">Acesso Vitalício</span></div>
          </div>

          <button 
            onClick={onBasicClick}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-2xl text-xl font-bold shadow-lg transition-all"
          >
            COMEÇAR COM O BÁSICO
          </button>
        </div>

        {/* Oferta Plus */}
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-10 border-t-8 border-sunnyYellow relative transform transition-transform hover:scale-[1.05]">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-vibrantOrange text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">
            MAIS VENDIDO ⭐
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Crown className="text-sunnyYellow fill-sunnyYellow" size={20} />
            <span className="text-vibrantOrange font-bold text-sm uppercase">O Completo</span>
          </div>
          <h3 className="text-3xl font-heading mb-2 text-slate-900">Plano Plus</h3>
          <p className="text-slate-500 mb-8">O arsenal completo para férias épicas.</p>
          
          <div className="mb-8">
            <span className="text-4xl font-heading text-vibrantOrange">R$ 34,90</span>
            <span className="text-slate-500 ml-2">Ou 3x R$ 11,63</span>
          </div>

          <div className="grid grid-cols-1 gap-3 mb-10">
            <div className="flex items-center gap-3 font-bold text-slate-900"><CheckCircle2 size={18} className="text-green-500" /> <span>100 Desenhos (Variados)</span></div>
            <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> <span>50 Desenhos Temáticos</span></div>
            <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> <span>30 Desenhos de Heróis</span></div>
            <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> <span>50 Desenhos Bíblicos</span></div>
            <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> <span>Acesso Vitalício</span></div>
            <div className="flex items-center gap-3 text-vibrantOrange font-bold"><Gift size={18} /> <span>Atualizações Mensais Grátis</span></div>
          </div>

          <button className="w-full bg-sunnyYellow hover:bg-yellow-400 text-slate-900 py-5 rounded-2xl text-2xl font-black shadow-lg shadow-yellow-200 transition-all flex items-center justify-center gap-3">
            EU QUERO O PLUS! <ArrowRight />
          </button>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-600">
        <div className="flex items-center gap-2"><ShieldCheck size={20} className="text-skyBlue" /> 7 Dias de Garantia</div>
        <div className="flex items-center gap-2"><ShieldCheck size={20} className="text-skyBlue" /> Compra 100% Segura</div>
        <div className="flex items-center gap-2"><ShieldCheck size={20} className="text-skyBlue" /> Receba na Hora</div>
      </div>
    </div>
  </section>
);

const FAQItem: React.FC<{ q: string, a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left font-bold text-lg hover:text-vibrantOrange transition-colors">
        {q} <ChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="mt-4 text-slate-600 animate-fade-in">{a}</p>}
    </div>
  );
};

const FAQ: React.FC = () => (
  <section className="py-20 bg-white px-4">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-heading text-center mb-12">Dúvidas Frequentes</h2>
      <div className="space-y-2">
        <FAQItem q="O material é físico?" a="Não, o guia é 100% digital em formato PDF. Você recebe o acesso imediatamente após a confirmação do pagamento e pode baixar para imprimir ou usar no celular." />
        <FAQItem q="Para qual idade o guia é indicado?" a="As atividades foram pensadas para crianças de 3 a 10 anos, com adaptações simples sugeridas no material para cada faixa etária." />
        <FAQItem q="Preciso de materiais caros?" a="De jeito nenhum! 90% das atividades utilizam itens que você já tem em casa: papel, tesoura, fita, potes vazios, canetinhas e muita imaginação." />
        <FAQItem q="Como recebo as atualizações do plano Plus?" a="Todo mês, novos desenhos são adicionados à sua área de membros. Você receberá um aviso por e-mail sempre que houver novidades!" />
        <FAQItem q="E se eu não gostar?" a="Nós oferecemos 7 dias de garantia incondicional. Se você sentir que o guia não é para você, basta nos enviar um e-mail e devolvemos cada centavo." />
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 px-4">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-vibrantOrange rounded flex items-center justify-center text-white font-heading">F</div>
        <span className="font-heading text-white">Férias Inesquecíveis</span>
      </div>
      <div className="text-center md:text-right">
        <p className="text-sm">Suporte: suporte@feriasinesqueciveis.com.br</p>
        <p className="text-xs mt-2">© 2024 Férias Inesquecíveis - Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

export default App;
