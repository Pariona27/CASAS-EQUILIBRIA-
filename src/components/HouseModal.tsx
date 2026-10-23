import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Award, 
  Quote, 
  Target, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Lightbulb, 
  Zap,
  ArrowRight,
  Download,
  Loader2,
  Check
} from 'lucide-react';
import { House } from '../data/housesData';
import { sound } from '../utils/audio';
import { downloadCredentialImage } from '../utils/downloadBadge';

interface HouseModalProps {
  house: House | null;
  onClose: () => void;
  onTakeQuiz: () => void;
  isUserAssigned?: boolean;
}

export const HouseModal: React.FC<HouseModalProps> = ({
  house,
  onClose,
  onTakeQuiz,
  isUserAssigned = false,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!house) return null;

  const handleDownload = async () => {
    sound.playSelect();
    setIsDownloading(true);
    const studentName = localStorage.getItem('eq360_student_name') || 'Estudiante';
    try {
      await downloadCredentialImage(null, house, studentName);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error downloading credential from modal:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar with Ambient Gradient */}
        <div className={`relative px-6 py-6 sm:px-8 sm:py-8 bg-gradient-to-r ${house.theme.gradientFrom}/30 ${house.theme.gradientTo}/20 border-b border-slate-800`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Crest Thumbnail */}
              <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/20 p-0.5 bg-slate-950 shadow-xl ${house.theme.borderGlow} shrink-0`}>
                <img
                  src={house.crest}
                  alt={house.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${house.theme.badgeBg} ${house.theme.badgeText}`}>
                    Figura: {house.figure}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                    Talento: {house.primaryTalent}
                  </span>
                  {isUserAssigned && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                      ¡Tu Casa!
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-4xl font-black font-cinzel text-white mt-1.5 tracking-wide">
                  {house.name}
                </h2>
                <p className="text-sm sm:text-base font-semibold text-slate-300 italic">
                  "{house.subtitle}"
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition border border-slate-700"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 divide-y divide-slate-800/80 text-slate-300 text-sm sm:text-base">
          
          {/* Motto and Key Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
              <Quote className={`w-6 h-6 shrink-0 mt-0.5 ${house.theme.textColor}`} />
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-slate-400 block mb-1">
                  Lema Oficial
                </span>
                <p className="font-cinzel text-base sm:text-lg font-bold text-white leading-relaxed">
                  “{house.motto}”
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
              <Target className={`w-6 h-6 shrink-0 mt-0.5 ${house.theme.textColor}`} />
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-slate-400 block mb-1">
                  Rol Frecuente en Proyectos
                </span>
                <p className="font-bold text-base sm:text-lg text-white">
                  {house.frequentRole}
                </p>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="pt-6">
            <h3 className="font-cinzel text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className={`w-5 h-5 ${house.theme.textColor}`} />
              Identidad y Filosofía
            </h3>
            <p className="leading-relaxed text-slate-300 text-justify">
              {house.description}
            </p>

            {/* Ideal Quote Box */}
            <div className={`mt-4 p-4 rounded-xl border ${house.theme.badgeBg} flex items-center gap-3`}>
              <Lightbulb className={`w-5 h-5 shrink-0 ${house.theme.textColor}`} />
              <div className="text-sm">
                <span className="font-bold text-white block">Ideal para estudiantes que dicen:</span>
                <span className={`italic font-medium ${house.theme.textColor}`}>
                  {house.idealPhrase}
                </span>
              </div>
            </div>
          </div>

          {/* Student Profile Traits */}
          <div className="pt-6">
            <h3 className="font-cinzel text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Layers className={`w-5 h-5 ${house.theme.textColor}`} />
              Perfil del Integrante
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {house.profile.map((trait, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-1 ${house.theme.textColor}`} />
                  <span className="text-sm text-slate-300 font-medium">{trait}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Skills */}
          <div className="pt-6">
            <h3 className="font-cinzel text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Award className={`w-5 h-5 ${house.theme.textColor}`} />
              Habilidades Principales
            </h3>
            <div className="flex flex-wrap gap-2">
              {house.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border ${house.theme.badgeBg} ${house.theme.badgeText}`}
                >
                  ✦ {skill}
                </span>
              ))}
            </div>
          </div>

          {/* AI & Environment Projects */}
          <div className="pt-6">
            <h3 className="font-cinzel text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Cpu className={`w-5 h-5 ${house.theme.textColor}`} />
              Proyectos Típicos de IA & Medio Ambiente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {house.aiProjects.map((proj, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Zap className={`w-4 h-4 ${house.theme.textColor}`} />
                    <h4 className="font-bold text-sm text-white">{proj.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 sm:px-8 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400 text-center sm:text-left">
            ¿Sientes que este perfil conecta con tu forma de pensar y actuar?
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
            {isUserAssigned && (
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
                title="Descargar credencial de tu casa en formato PNG"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                ) : downloadSuccess ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Download className="w-4 h-4 text-cyan-400" />
                )}
                <span>{isDownloading ? 'Generando...' : downloadSuccess ? '¡Descargado!' : 'Descargar Credencial'}</span>
              </button>
            )}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                sound.playSelect();
                onClose();
                onTakeQuiz();
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 transition flex items-center justify-center gap-2"
            >
              <span>Hacer el Test de Selección</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
