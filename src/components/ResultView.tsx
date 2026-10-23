import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  RotateCcw, 
  Trophy, 
  Share2, 
  Download, 
  Check, 
  Quote, 
  Target, 
  ArrowRight,
  Shield,
  Layers,
  Award,
  BookOpen,
  User,
  Printer,
  Loader2
} from 'lucide-react';
import { HOUSES, HOUSES_LIST, House } from '../data/housesData';
import { sound } from '../utils/audio';
import { downloadCredentialImage } from '../utils/downloadBadge';

interface ResultViewProps {
  winningHouseId: string;
  scores: Record<string, number>;
  onRetakeQuiz: () => void;
  onExploreHouse: (house: House) => void;
  onGoToCompetition: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  winningHouseId,
  scores,
  onRetakeQuiz,
  onExploreHouse,
  onGoToCompetition,
}) => {
  const [studentName, setStudentName] = useState(() => {
    try {
      return localStorage.getItem('eq360_student_name') || 'Estudiante';
    } catch {
      return 'Estudiante';
    }
  });
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const credentialRef = useRef<HTMLDivElement>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setStudentName(val);
    try {
      localStorage.setItem('eq360_student_name', val);
    } catch {
      // Ignore
    }
  };

  const house = HOUSES[winningHouseId] || HOUSES.drakarys;
  const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0) || 7;

  useEffect(() => {
    // Play sound and trigger confetti celebration
    sound.playFanfare();

    try {
      // Confetti cannon
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#6366f1', '#eab308', '#ef4444', '#10b981'],
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 400);

      return () => clearTimeout(timer);
    } catch {
      // Canvas confetti may fail in restricted environments
    }
  }, [winningHouseId]);

  const handleCopyBadge = () => {
    sound.playSelect();
    const textToCopy = `🏛️ ¡He sido asignado a la ${house.name} en el Club Equilibria 360!\n` +
      `🐾 Figura: ${house.figure}\n` +
      `✨ Talento: ${house.primaryTalent} (${house.frequentRole})\n` +
      `📜 Lema: "${house.motto}"\n` +
      `🌱 Curso: Inteligencia Artificial aplicada al Medio Ambiente`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleDownloadBadge = async () => {
    sound.playSelect();
    setIsDownloading(true);
    try {
      await downloadCredentialImage(credentialRef.current, house, studentName);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error al descargar credencial:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 animate-fade-in">
      
      {/* Top Banner Callout */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>¡El Oráculo de Equilibria 360 ha decidido!</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-cinzel text-white tracking-wide">
          Perteneces a la <span className={house.theme.textColor}>{house.name}</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Tus respuestas reflejan una sintonía indiscutible con el espíritu de {house.figure.toLowerCase()} y su visión para la inteligencia artificial ecológica.
        </p>
      </div>

      {/* Main Champion Crest Card */}
      <div className={`glass-panel rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl relative overflow-hidden mb-10 ${house.theme.borderGlow}`}>
        
        {/* Ambient colored background lights */}
        <div className={`absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none ${house.theme.badgeBg}`} />
        <div className={`absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none ${house.theme.badgeBg}`} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Emblem Artwork */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative group">
              <div className={`w-56 h-56 sm:w-64 sm:h-64 rounded-3xl p-1 bg-gradient-to-tr ${house.theme.gradientFrom} ${house.theme.gradientTo} shadow-2xl ${house.theme.borderGlow} transition-transform duration-300 group-hover:scale-105`}>
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-950">
                  <img
                    src={house.crest}
                    alt={house.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-3 inset-x-0 flex justify-center">
                <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-lg ${house.theme.badgeBg} ${house.theme.badgeText}`}>
                  Figura: {house.figure}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                Talento: {house.primaryTalent}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                Rol: {house.frequentRole}
              </span>
            </div>
          </div>

          {/* House Details & Why Match */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
                Lema Oficial de la Casa
              </span>
              <p className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1 leading-snug">
                “{house.motto}”
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>¿Por qué haces match con {house.name}?</span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-justify">
                {house.whyMatch}
              </p>
            </div>

            {/* Ideal Quote Pill */}
            <div className={`p-4 rounded-xl border ${house.theme.badgeBg} flex items-center gap-3`}>
              <Quote className={`w-5 h-5 shrink-0 ${house.theme.textColor}`} />
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-white block">Tu frase insignia en el aula:</span>
                <span className={`italic font-semibold ${house.theme.textColor}`}>
                  {house.idealPhrase}
                </span>
              </div>
            </div>

            {/* Skills Pills */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Habilidades con las que brillarás:
              </span>
              <div className="flex flex-wrap gap-2">
                {house.skills.slice(0, 4).map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-300"
                  >
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  onExploreHouse(house);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Ver Ficha Completa</span>
              </button>
              
              <button
                onClick={() => {
                  sound.playClick();
                  onGoToCompetition();
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-90 text-slate-950 text-xs sm:text-sm font-black flex items-center gap-2 transition shadow-md shadow-amber-500/20"
              >
                <Trophy className="w-4 h-4" />
                <span>Ver Dinámica de Puntos</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Affinity Breakdown Across All 5 Houses */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 mb-10 shadow-xl">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-cinzel font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Tu Espectro de Afinidad Vocacional
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              En Equilibria 360 ningún estudiante es unidimensional. Revisa cómo se distribuyen tus talentos secundarios:
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Total {totalPoints} preguntas evaluadas
          </span>
        </div>

        <div className="space-y-4 mt-6">
          {HOUSES_LIST.map((h) => {
            const houseScore = scores[h.id] || 0;
            const percentage = Math.round((houseScore / totalPoints) * 100);
            const isWinner = h.id === winningHouseId;

            return (
              <div key={h.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2 font-semibold">
                    <img
                      src={h.crest}
                      alt={h.name}
                      className="w-5 h-5 rounded-full object-cover border border-white/20"
                    />
                    <span className={isWinner ? `${h.theme.textColor} font-bold` : 'text-slate-300'}>
                      {h.name} ({h.figure})
                    </span>
                    {isWinner && (
                      <span className="px-2 py-0.2 text-[10px] uppercase font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                        Principal
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-slate-300 font-bold">
                    {houseScore} pts ({percentage}%)
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isWinner
                        ? `bg-gradient-to-r ${h.theme.gradientFrom} ${h.theme.gradientTo}`
                        : 'bg-slate-700'
                    }`}
                    style={{ width: `${Math.max(percentage, 5)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Printable / Shareable Digital Student Credential */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 mb-10 shadow-xl">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-cinzel font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Carnet Digital de Casa
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Personaliza tu credencial de estudiante para el curso de Inteligencia Artificial & Medio Ambiente:
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleDownloadBadge}
              disabled={isDownloading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition disabled:opacity-50 cursor-pointer"
              title="Descargar credencial oficial en alta resolución (PNG)"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : downloadSuccess ? (
                <Check className="w-4 h-4 text-emerald-300" />
              ) : (
                <Download className="w-4 h-4 text-white" />
              )}
              <span>{isDownloading ? 'Generando...' : downloadSuccess ? '¡Descargado!' : 'Descargar Credencial'}</span>
            </button>

            <button
              onClick={handleCopyBadge}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition cursor-pointer"
              title="Copiar texto de asignación"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Compartir'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition cursor-pointer"
              title="Imprimir credencial"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
          </div>
        </div>

        {/* Student Name Input */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={studentName}
              onChange={handleNameChange}
              placeholder="Escribe tu nombre y apellido..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>
          <span className="text-xs text-slate-400">
            El nombre se actualiza en tiempo real en la credencial y en el archivo descargado.
          </span>
        </div>

        {/* The Digital Credential Card */}
        <div 
          ref={credentialRef}
          className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-slate-700 shadow-2xl relative overflow-hidden ${house.theme.borderGlow}`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/20 p-0.5 bg-slate-950 shrink-0">
                <img
                  src={house.crest}
                  alt={house.name}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Club Equilibria 360 • Credencial Oficial
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white font-cinzel mt-1">
                  {studentName || 'Estudiante'}
                </h4>
                <p className={`text-sm font-bold ${house.theme.textColor}`}>
                  Miembro de la {house.name} ({house.figure})
                </p>
                <p className="text-xs text-slate-400 mt-1 italic">
                  "{house.motto}"
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 space-y-1 w-full sm:w-auto">
              <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                Rol Oficial
              </p>
              <p className="text-sm font-bold text-white">
                {house.frequentRole}
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                ID: EQ360-{house.id.toUpperCase()}-2026
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Retake test button */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            sound.playClick();
            onRetakeQuiz();
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Repetir el Test de Selección</span>
        </button>
      </div>

    </div>
  );
};
