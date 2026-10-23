import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Trophy, 
  Leaf, 
  BrainCircuit, 
  ShieldCheck, 
  Users, 
  Quote, 
  Cpu, 
  Globe2, 
  Zap,
  CheckCircle2
} from 'lucide-react';
import { HOUSES_LIST, House } from '../data/housesData';
import { sound } from '../utils/audio';

interface HomeViewProps {
  onStartQuiz: () => void;
  onExploreDirectory: () => void;
  onOpenCompetition: () => void;
  onOpenHouseModal: (house: House) => void;
  assignedHouseId: string | null;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartQuiz,
  onExploreDirectory,
  onOpenCompetition,
  onOpenHouseModal,
  assignedHouseId,
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto pt-4 sm:pt-10">
        
        {/* Ambient background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[550px] sm:h-[550px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-purple-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Super Title Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 shadow-lg shadow-emerald-500/5">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>Club Equilibria 360 • IA & Medio Ambiente</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-cinzel text-white tracking-tight leading-[1.15]">
          Descubre tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">Casa Legendaria</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Bienvenido al curso de <strong className="text-white">Inteligencia Artificial aplicada al Medio Ambiente</strong>. Participa en el test interactivo, descubre tu arquetipo de talento y compite junto a tu casa para coronarse como la <strong className="text-amber-300">Casa Maestra</strong>.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              sound.playSelect();
              onStartQuiz();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black text-base shadow-xl shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
          >
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
            <span>Descubre tu Casa</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onExploreDirectory();
            }}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-base transition flex items-center justify-center gap-2"
          >
            <Compass className="w-5 h-5 text-cyan-400" />
            <span>Ver las 5 Casas</span>
          </button>
        </div>

        {/* Quick Highlights Counter Bar */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-6 rounded-3xl glass-panel border border-slate-800 text-left">
          <div className="p-2 sm:p-3">
            <span className="font-cinzel text-2xl sm:text-3xl font-black text-cyan-400 block">5</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-300">Casas Legendarias</span>
            <span className="text-[11px] text-slate-500 block">Dragón, León, Águila, Grifo y Serpiente</span>
          </div>
          <div className="p-2 sm:p-3 border-l border-slate-800">
            <span className="font-cinzel text-2xl sm:text-3xl font-black text-indigo-400 block">100%</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-300">Inteligencia Artificial</span>
            <span className="text-[11px] text-slate-500 block">Prompts, modelos y visión artificial</span>
          </div>
          <div className="p-2 sm:p-3 sm:border-l border-slate-800">
            <span className="font-cinzel text-2xl sm:text-3xl font-black text-emerald-400 block">360°</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-300">Impacto Ambiental</span>
            <span className="text-[11px] text-slate-500 block">Clima, bosques, agua y biodiversidad</span>
          </div>
          <div className="p-2 sm:p-3 border-l border-slate-800">
            <span className="font-cinzel text-2xl sm:text-3xl font-black text-amber-400 block">1</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-300">Casa Maestra</span>
            <span className="text-[11px] text-slate-500 block">El honor supremo de la temporada</span>
          </div>
        </div>

      </section>

      {/* The 5 Houses Showcase Carousel / Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400">
              Ecosistema de Talentos
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-cinzel text-white mt-1">
              Las 5 Casas del Club Equilibria 360
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onExploreDirectory();
            }}
            className="text-xs sm:text-sm font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition"
          >
            <span>Explorar directorio completo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid of 5 Houses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {HOUSES_LIST.map((house) => {
            const isAssigned = assignedHouseId === house.id;

            return (
              <div
                key={house.id}
                onClick={() => {
                  sound.playClick();
                  onOpenHouseModal(house);
                }}
                className={`group cursor-pointer glass-card rounded-3xl p-5 border border-slate-800/80 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden ${house.theme.borderGlow}`}
              >
                {/* Top colored highlight line */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${house.theme.gradientFrom} ${house.theme.gradientTo}`} />

                <div>
                  {/* Crest Artwork */}
                  <div className={`w-full aspect-square rounded-2xl overflow-hidden border border-white/20 p-0.5 bg-slate-950 shadow-lg ${house.theme.borderGlow} mb-4 relative`}>
                    <img
                      src={house.crest}
                      alt={house.name}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                    />
                    {isAssigned && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-md">
                        ¡Tu Casa!
                      </span>
                    )}
                  </div>

                  {/* Figure & Name */}
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border mb-1.5 ${house.theme.badgeBg} ${house.theme.badgeText}`}>
                    {house.figure}
                  </span>

                  <h3 className="font-cinzel text-lg font-black text-white group-hover:text-cyan-300 transition">
                    {house.name}
                  </h3>

                  <p className={`text-[11px] font-bold ${house.theme.textColor}`}>
                    {house.subtitle}
                  </p>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    “{house.motto}”
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">{house.primaryTalent}</span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Why Houses in an AI & Environment Course */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl mb-8">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
            Metodología de Aprendizaje
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-cinzel text-white mt-1">
            ¿Por qué un sistema de Casas para la Inteligencia Artificial?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Resolver el cambio climático y proteger los recursos naturales con IA requiere perfiles diversos trabajando en perfecta sinergia. Ningún algoritmo triunfa sin una visión creadora, un liderazgo firme, datos precisos, integraciones robustas y optimización meticulosa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 w-fit">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">IA Práctica con Propósito</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              No estudiamos teoría abstracta: creamos modelos de visión artificial, generadores climáticos y automatizaciones aplicadas a problemas ambientales reales.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 w-fit">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Equipos Multidisciplinarios</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cada casa aporta un talento indispensable. Aprenderás a complementarte con creadores, líderes, analistas, integradores y especialistas en prompts.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit">
              <Trophy className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Competencia Gamificada</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Puntos semanales por participación, código verde, prompts efectivos y defensa de proyectos para conquistar el título de Casa Maestra.
            </p>
          </div>
        </div>
      </section>

      {/* Environmental AI Projects Spotlight */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400">
            Casos de Uso Real
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-cinzel text-white mt-1">
            Soluciones que construiremos en el Curso
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            La Inteligencia Artificial al servicio de la Tierra: proyectos que abordan desafíos de biodiversidad, agua y emisiones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Visión Satelital contra la Deforestación',
              tag: 'Visión Artificial',
              color: 'text-red-400',
              border: 'border-red-500/30',
              desc: 'Identificación de pérdida de cobertura boscosa en tiempo real cruzando imágenes satelitales y redes neuronales convolucionales.',
            },
            {
              title: 'Predicción de Sequías y Estrés Hídrico',
              tag: 'Analítica Predictiva',
              color: 'text-cyan-400',
              border: 'border-cyan-500/30',
              desc: 'Modelado de caudales en cuencas hidrográficas para alertar tempranamente a comunidades rurales y prevenir desabastecimiento.',
            },
            {
              title: 'Estaciones IoT con Clasificación de Flora',
              tag: 'Hardware + IA',
              color: 'text-teal-400',
              border: 'border-teal-500/30',
              desc: 'Sensores de bajo costo conectados a APIs multimodales para catalogar especies vegetales y monitorear plagas invasoras.',
            },
            {
              title: 'Ingeniería de Prompts para Auditoría de CO2',
              tag: 'LLMs & Automatización',
              color: 'text-purple-400',
              border: 'border-purple-500/30',
              desc: 'Pipelines automatizados que procesan consumos energéticos y redactan informes técnicos con recomendaciones ecológicas.',
            },
          ].map((item, idx) => (
            <div key={idx} className={`p-5 rounded-2xl bg-slate-900/60 border ${item.border} space-y-2`}>
              <span className={`text-[10px] font-extrabold uppercase tracking-wider ${item.color}`}>
                {item.tag}
              </span>
              <h4 className="font-bold text-sm sm:text-base text-white">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Interactive Banner */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-700/80 text-center relative overflow-hidden bg-gradient-to-r from-cyan-950/40 via-indigo-950/50 to-purple-950/40 shadow-2xl">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 p-0.5 mx-auto shadow-xl shadow-indigo-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-amber-300 animate-spin-slow" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-cinzel text-white">
            ¿Listo para descubrir tu verdadera Casa?
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Solo toma 3 minutos. Responde con honestidad y prepárate para representar a tu estandarte en el Club Equilibria 360.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                sound.playSelect();
                onStartQuiz();
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black text-base shadow-xl shadow-indigo-500/30 transition transform hover:scale-105 inline-flex items-center gap-3"
            >
              <span>Comenzar Test Vocacional</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
