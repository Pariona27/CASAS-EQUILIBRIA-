import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Sparkles, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  Zap, 
  Cpu, 
  RotateCcw, 
  Plus, 
  Crown, 
  Users, 
  Leaf, 
  Code, 
  MessageSquare,
  Presentation
} from 'lucide-react';
import { HOUSES, HOUSES_LIST, House } from '../data/housesData';
import { sound } from '../utils/audio';

interface ActivityPreset {
  id: string;
  name: string;
  points: number;
  category: string;
  icon: React.ReactNode;
  description: string;
}

const INITIAL_HOUSE_POINTS: Record<string, number> = {
  drakarys: 380,
  leons: 365,
  altair: 350,
  gryphos: 340,
  serpentis: 355,
};

export const CompetitionView: React.FC = () => {
  const [housePoints, setHousePoints] = useState<Record<string, number>>(INITIAL_HOUSE_POINTS);
  const [selectedHouseId, setSelectedHouseId] = useState<string>('drakarys');
  const [selectedActivityId, setSelectedActivityId] = useState<string>('app');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [logHistory, setLogHistory] = useState<Array<{ id: number; houseName: string; activity: string; points: number; time: string }>>([
    { id: 1, houseName: 'Casa Drakarys', activity: 'Desarrollo de App Web de Reforestación', points: 50, time: 'Hace 10 min' },
    { id: 2, houseName: 'Casa Serpentis', activity: 'Ingeniería de Prompts para Auditoría de CO2', points: 25, time: 'Hace 25 min' },
    { id: 3, houseName: 'Casa Leons', activity: 'Defensa y Pitch Ambiental ante Jurado', points: 40, time: 'Hace 1 hora' },
    { id: 4, houseName: 'Casa Altair', activity: 'Análisis Satelital Predictivo de Cuencas', points: 30, time: 'Hace 2 horas' },
  ]);

  const activityPresets: ActivityPreset[] = [
    {
      id: 'app',
      name: 'Desarrollo de App, Web o Automatización',
      points: 50,
      category: 'Desarrollo Técnico',
      icon: <Code className="w-4 h-4 text-cyan-400" />,
      description: 'Creación de plataformas funcionales integradas con modelos de IA para resolver problemas ecológicos.',
    },
    {
      id: 'impact',
      name: 'Innovación e Impacto Ambiental Medible',
      points: 45,
      category: 'Impacto Real',
      icon: <Leaf className="w-4 h-4 text-emerald-400" />,
      description: 'Soluciones que demuestran reducción de huella de carbono, protección de especies o ahorro hídrico.',
    },
    {
      id: 'pitch',
      name: 'Presentación y Defensa de Proyectos',
      points: 40,
      category: 'Comunicación',
      icon: <Presentation className="w-4 h-4 text-amber-400" />,
      description: 'Elaboración de pitch convincente, manejo de preguntas del jurado y defensa ética del modelo.',
    },
    {
      id: 'challenge',
      name: 'Resolución de Retos Semanales con IA',
      points: 30,
      category: 'Resolución Práctica',
      icon: <Zap className="w-4 h-4 text-yellow-400" />,
      description: 'Superación exitosa de desafíos de laboratorio (detección de plagas, clasificación de residuos, etc.).',
    },
    {
      id: 'prompts',
      name: 'Creación y Refinamiento de Prompts',
      points: 25,
      category: 'Ingeniería de Prompts',
      icon: <MessageSquare className="w-4 h-4 text-purple-400" />,
      description: 'Formulación de cadenas de prompts eficaces, sin alucinaciones y altamente reproducibles.',
    },
    {
      id: 'collab',
      name: 'Trabajo Colaborativo y Apoyo Inter-Casas',
      points: 20,
      category: 'Comunidad',
      icon: <Users className="w-4 h-4 text-blue-400" />,
      description: 'Sinergia grupal, feedback constructivo y mentoría compartida entre estudiantes.',
    },
    {
      id: 'participation',
      name: 'Participación Activa en Clases y Talleres',
      points: 10,
      category: 'Compromiso',
      icon: <Sparkles className="w-4 h-4 text-pink-400" />,
      description: 'Intervenciones valiosas, asistencia puntual y contribución a debates éticos de IA.',
    },
  ];

  // Sort houses by points descending
  const rankedHouses = Object.entries(housePoints)
    .map(([id, pts]) => ({ house: HOUSES[id], points: pts }))
    .sort((a, b) => b.points - a.points);

  const maxPoints = Math.max(...Object.values(housePoints), 400);

  const handleAddPoints = () => {
    const act = activityPresets.find((a) => a.id === selectedActivityId) || activityPresets[0];
    const targetHouse = HOUSES[selectedHouseId];
    if (!targetHouse) return;

    sound.playSelect();

    setHousePoints((prev) => ({
      ...prev,
      [selectedHouseId]: (prev[selectedHouseId] || 0) + act.points,
    }));

    setLogHistory((prev) => [
      {
        id: Date.now(),
        houseName: targetHouse.name,
        activity: act.name + (customNotes ? ` (${customNotes})` : ''),
        points: act.points,
        time: 'Justo ahora',
      },
      ...prev.slice(0, 9),
    ]);

    setCustomNotes('');

    try {
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.7 },
      });
    } catch {
      // Ignore
    }
  };

  const handleResetPoints = () => {
    sound.playClick();
    if (window.confirm('¿Deseas restablecer los puntos de la temporada a los valores iniciales de muestra?')) {
      setHousePoints(INITIAL_HOUSE_POINTS);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Competencia Oficial del Club</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-cinzel text-white tracking-wide">
          Camino a la Casa Maestra
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
          Las 5 casas compiten mediante la creación de proyectos tecnológicos, resolución de retos de IA, debates y soluciones de impacto ambiental. Al final del curso, una de ellas será coronada como la <strong className="text-amber-300">Casa Maestra de la Inteligencia Artificial de Equilibria 360</strong>.
        </p>
      </div>

      {/* The Supreme Prize Showcase Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl relative overflow-hidden mb-12 bg-gradient-to-r from-amber-950/20 via-slate-900 to-indigo-950/30">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-3 flex justify-center">
            <div className="relative">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-600 p-1 shadow-2xl shadow-amber-500/30 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[22px] flex flex-col items-center justify-center p-3 text-center">
                  <Crown className="w-12 h-12 text-amber-400 animate-bounce" />
                  <span className="text-[10px] font-black font-cinzel text-amber-300 uppercase tracking-widest mt-1">
                    Casa Maestra
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-9 space-y-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
              El Reconocimiento Supremo
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-white">
              Título: Casa Maestra de la Inteligencia Artificial
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
              Al finalizar el curso, la casa con mayor puntaje acumulado y mejor desempeño en la defensa del proyecto final obtendrá la distinción de Casa Maestra. Cada uno de sus integrantes recibirá el diploma con mención de excelencia en IA Verde, su insignia dorada y el patrocinio de su prototipo ecológico ante la red de aliados de Equilibria 360.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Leaderboard & Points Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Leaderboard Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Tabla de Posiciones en Vivo
                </h3>
              </div>
              <button
                onClick={handleResetPoints}
                className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 transition"
                title="Restablecer puntos iniciales"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
            </div>

            {/* List of ranked houses */}
            <div className="space-y-4">
              {rankedHouses.map((item, index) => {
                const house = item.house;
                const points = item.points;
                const percent = Math.round((points / maxPoints) * 100);

                let rankBadge = (
                  <span className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center border border-slate-700">
                    {index + 1}°
                  </span>
                );

                if (index === 0) {
                  rankBadge = (
                    <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg shadow-amber-500/30">
                      1°
                    </span>
                  );
                } else if (index === 1) {
                  rankBadge = (
                    <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-slate-300 to-slate-400 text-slate-950 font-black text-xs flex items-center justify-center">
                      2°
                    </span>
                  );
                } else if (index === 2) {
                  rankBadge = (
                    <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-700 to-amber-800 text-amber-100 font-black text-xs flex items-center justify-center">
                      3°
                    </span>
                  );
                }

                return (
                  <div
                    key={house.id}
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      index === 0
                        ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {rankBadge}
                        <img
                          src={house.crest}
                          alt={house.name}
                          className="w-10 h-10 rounded-xl object-cover border border-white/20 shadow-md"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white text-sm sm:text-base">
                              {house.name}
                            </h4>
                            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                              ({house.figure})
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 block font-medium">
                            Talento: {house.primaryTalent}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-base sm:text-lg font-black text-white">
                          {points}{' '}
                          <span className="text-xs font-semibold text-slate-400">pts</span>
                        </span>
                        {index === 0 && (
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-400">
                            Líder Actual
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800/80">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          index === 0
                            ? 'bg-gradient-to-r from-amber-400 to-yellow-500'
                            : `bg-gradient-to-r ${house.theme.gradientFrom} ${house.theme.gradientTo}`
                        }`}
                        style={{ width: `${Math.min(percent, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interactive Points Simulator (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h3 className="font-cinzel text-xl font-bold text-white">
                Simulador de Registro de Puntos
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Prueba cómo los retos y logros impactan el ranking en tiempo real durante el curso:
            </p>

            <div className="space-y-4">
              
              {/* Select House */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                  1. Seleccionar Casa
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {HOUSES_LIST.map((h) => {
                    const isSelected = selectedHouseId === h.id;
                    return (
                      <button
                        key={h.id}
                        onClick={() => {
                          sound.playClick();
                          setSelectedHouseId(h.id);
                        }}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition ${
                          isSelected
                            ? `${h.theme.badgeBg} border-indigo-500 shadow-sm shadow-indigo-500/30 ring-1 ring-indigo-500`
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                        }`}
                        title={h.name}
                      >
                        <img
                          src={h.crest}
                          alt={h.name}
                          className="w-7 h-7 rounded-lg object-cover"
                        />
                        <span className="text-[10px] font-bold text-slate-300 truncate w-full text-center">
                          {h.shortName || h.name.replace('Casa ', '')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Select Activity */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                  2. Actividad o Reto Realizado
                </label>
                <select
                  value={selectedActivityId}
                  onChange={(e) => setSelectedActivityId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 transition"
                >
                  {activityPresets.map((act) => (
                    <option key={act.id} value={act.id}>
                      +{act.points} pts — {act.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional detail */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                  3. Detalle Opcional del Logro
                </label>
                <input
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Ej: Detección de especies con Gemini Vision"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              {/* Submit Points Button */}
              <button
                onClick={handleAddPoints}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Asignar Puntos a {HOUSES[selectedHouseId]?.name}</span>
              </button>

            </div>

            {/* Recent Log History */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Historial Reciente de Puntos:
              </span>
              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {logHistory.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">{log.houseName}</span>
                      <span className="text-slate-400 text-[11px] truncate max-w-[200px] block">
                        {log.activity}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-emerald-400">+{log.points} pts</span>
                      <span className="text-[10px] text-slate-500 block">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 7 Ways to Earn Points Cards */}
      <div className="mb-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="font-cinzel text-2xl font-bold text-white">
            Criterios Oficiales de Acumulación de Puntos
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Cada casa acumula puntos a lo largo del curso a través de 7 dimensiones de impacto:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {activityPresets.map((act) => (
            <div
              key={act.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  {act.icon}
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  +{act.points} pts
                </span>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block mb-0.5">
                  {act.category}
                </span>
                <h4 className="font-bold text-sm sm:text-base text-white">
                  {act.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Phases Timeline */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400">
            Cronograma de Competencia
          </span>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1">
            Las 4 Fases de la Competencia
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: '01',
              title: 'Selección e Integración',
              desc: 'Test vocacional, asignación de casas, conformación de escuadras y designación de capitanes.',
            },
            {
              step: '02',
              title: 'Retos Semanales de IA',
              desc: 'Laboratorios de visión por computadora, prompt engineering avanzado y análisis de datos ecológicos.',
            },
            {
              step: '03',
              title: 'Hackathon Verde',
              desc: 'Desarrollo intensivo del prototipo tecnológico: creación de apps, webs y modelos de gemelos digitales.',
            },
            {
              step: '04',
              title: 'Gran Pitch & Coronación',
              desc: 'Defensa pública ante el comité ambiental y proclamación de la Casa Maestra de Equilibria 360.',
            },
          ].map((phase, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 relative">
              <span className="font-cinzel text-2xl font-black text-slate-700 block mb-2">
                Fase {phase.step}
              </span>
              <h4 className="font-bold text-sm text-white mb-1.5">{phase.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{phase.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
