import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Eye, 
  Quote, 
  Target, 
  ArrowRight, 
  Compass, 
  Check, 
  Award,
  Zap,
  SlidersHorizontal
} from 'lucide-react';
import { HOUSES_LIST, House } from '../data/housesData';
import { sound } from '../utils/audio';

interface DirectoryViewProps {
  onSelectHouse: (house: House) => void;
  onTakeQuiz: () => void;
  assignedHouseId: string | null;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  onSelectHouse,
  onTakeQuiz,
  assignedHouseId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'innovacion' | 'liderazgo' | 'analisis' | 'integracion' | 'optimizacion'>('all');

  const filteredHouses = HOUSES_LIST.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.figure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.primaryTalent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.frequentRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.idealPhrase.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedFilter === 'innovacion') return h.id === 'drakarys';
    if (selectedFilter === 'liderazgo') return h.id === 'leons';
    if (selectedFilter === 'analisis') return h.id === 'altair';
    if (selectedFilter === 'integracion') return h.id === 'gryphos';
    if (selectedFilter === 'optimizacion') return h.id === 'serpentis';

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>Directorio Oficial de Casas</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-cinzel text-white tracking-wide">
          Las 5 Casas del Club Equilibria 360
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
          Cada casa representa un arquetipo indispensable dentro del curso de <strong className="text-slate-200">Inteligencia Artificial aplicada al Medio Ambiente</strong>. Explora sus identidades, talentos y proyectos para descubrir dónde encajas mejor.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 mb-10 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por casa, figura, talento o habilidad..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
          />
        </div>

        {/* Talent Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
          <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1 hidden lg:flex">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Talento:
          </span>

          {[
            { id: 'all', label: 'Todas' },
            { id: 'innovacion', label: 'Innovación (Dragón)' },
            { id: 'liderazgo', label: 'Liderazgo (León)' },
            { id: 'analisis', label: 'Análisis (Águila)' },
            { id: 'integracion', label: 'Integración (Grifo)' },
            { id: 'optimizacion', label: 'Optimización (Serpiente)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sound.playClick();
                setSelectedFilter(item.id as typeof selectedFilter);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedFilter === item.id
                  ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

      </div>

      {/* Houses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
        {filteredHouses.map((house) => {
          const isUserAssigned = assignedHouseId === house.id;

          return (
            <div
              key={house.id}
              className={`glass-card rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden ${house.theme.borderGlow}`}
            >
              {/* Ambient colored gradient on top edge */}
              <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${house.theme.gradientFrom} ${house.theme.gradientTo}`} />
              
              <div>
                {/* Header: Crest and Figure Badge */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/20 p-0.5 bg-slate-950 shadow-lg ${house.theme.borderGlow} shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                    <img
                      src={house.crest}
                      alt={house.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <div className="text-right">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${house.theme.badgeBg} ${house.theme.badgeText}`}>
                      Figura: {house.figure}
                    </span>
                    {isUserAssigned && (
                      <div className="mt-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          <Check className="w-3 h-3" />
                          Tu Casa
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Name & Subtitle */}
                <h3 className="text-2xl font-black font-cinzel text-white group-hover:text-cyan-300 transition">
                  {house.name}
                </h3>
                <p className={`text-xs font-bold uppercase tracking-wider ${house.theme.textColor} mt-0.5`}>
                  {house.subtitle}
                </p>

                {/* Motto */}
                <div className="my-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5">
                  <Quote className={`w-4 h-4 shrink-0 mt-0.5 ${house.theme.textColor}`} />
                  <p className="font-cinzel text-xs sm:text-sm font-semibold text-slate-200 italic leading-snug">
                    “{house.motto}”
                  </p>
                </div>

                {/* Talento & Rol */}
                <div className="space-y-1.5 text-xs mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Talento Principal:</span>
                    <span className="text-white font-bold">{house.primaryTalent}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Rol Frecuente:</span>
                    <span className="text-slate-200 font-semibold">{house.frequentRole}</span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  {house.shortDescription}
                </p>

                {/* Ideal Phrase */}
                <div className={`p-2.5 rounded-xl border ${house.theme.badgeBg} mb-5`}>
                  <p className="text-[11px] font-semibold text-slate-300">
                    <strong className="text-white">Frase ideal:</strong>{' '}
                    <span className={`italic ${house.theme.textColor}`}>{house.idealPhrase}</span>
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    sound.playClick();
                    onSelectHouse(house);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs sm:text-sm font-bold transition group-hover:border-cyan-500/40"
                >
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>Ver Ficha Completa & Proyectos</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Comparison Matrix Table */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl overflow-hidden mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="font-cinzel text-xl font-bold text-white">
            Matriz Comparativa de Identidad de las 5 Casas
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Un resumen rápido de los roles y talentos de cada casa en el desarrollo de soluciones ambientales con IA:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4">Casa</th>
                <th className="py-3 px-4">Figura</th>
                <th className="py-3 px-4">Talento Principal</th>
                <th className="py-3 px-4">Rol Frecuente</th>
                <th className="py-3 px-4">Frase Ideal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {HOUSES_LIST.map((h) => (
                <tr
                  key={h.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectHouse(h);
                  }}
                  className="hover:bg-slate-800/40 cursor-pointer transition"
                >
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2.5">
                    <img
                      src={h.crest}
                      alt={h.name}
                      className="w-7 h-7 rounded-lg object-cover border border-white/20"
                    />
                    <span>{h.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-medium">{h.figure}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${h.theme.badgeBg} ${h.theme.badgeText}`}>
                      {h.primaryTalent}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">{h.frequentRole}</td>
                  <td className="py-3.5 px-4 text-slate-400 italic font-mono text-xs max-w-xs truncate">
                    {h.idealPhrase}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Bottom Banner */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 text-center relative overflow-hidden bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-cyan-950/40 shadow-2xl">
        <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3 animate-pulse" />
        <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-white">
          ¿Aún no sabes a qué Casa perteneces?
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Toma el cuestionario interactivo de 7 preguntas y descubre tu afinidad vocacional en el curso de Inteligencia Artificial para el Medio Ambiente.
        </p>
        <div className="mt-6">
          <button
            onClick={() => {
              sound.playSelect();
              onTakeQuiz();
            }}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:opacity-90 text-white font-bold text-base shadow-xl shadow-indigo-500/30 transition transform hover:scale-105 inline-flex items-center gap-2"
          >
            <span>Hacer el Test de Selección Ahora</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
};
