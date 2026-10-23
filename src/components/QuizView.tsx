import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle, 
  HelpCircle,
  ShieldCheck,
  BrainCircuit,
  Compass
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizOption } from '../data/quizQuestions';
import { HOUSES } from '../data/housesData';
import { sound } from '../utils/audio';

interface QuizViewProps {
  onComplete: (scores: Record<string, number>, winnerId: string) => void;
  onExploreDirectory: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onComplete, onExploreDirectory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, QuizOption>>({});
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const selectedOption = answers[currentQ.id];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (option: QuizOption) => {
    sound.playSelect();
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: option,
    }));
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      // Calculate scores
      const scores: Record<string, number> = {
        drakarys: 0,
        leons: 0,
        altair: 0,
        gryphos: 0,
        serpentis: 0,
      };

      Object.values(answers).forEach((ans) => {
        if (ans && ans.houseId) {
          scores[ans.houseId] = (scores[ans.houseId] || 0) + 1;
        }
      });

      // Find winner with highest score
      let highestHouse = 'drakarys';
      let maxScore = -1;

      Object.entries(scores).forEach(([houseId, score]) => {
        if (score > maxScore) {
          maxScore = score;
          highestHouse = houseId;
        }
      });

      // If tie, the 6th question (Mantra) or last question breaks ties naturally
      const tieBreaker = answers[6] || answers[7];
      if (tieBreaker && scores[tieBreaker.houseId] === maxScore) {
        highestHouse = tieBreaker.houseId;
      }

      onComplete(scores, highestHouse);
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    sound.playClick();
    if (window.confirm('¿Deseas reiniciar el test desde la primera pregunta?')) {
      setCurrentIndex(0);
      setAnswers({});
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Top Header Card */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
          <BrainCircuit className="w-4 h-4 text-cyan-400" />
          <span>Test Vocacional de Inteligencia Artificial</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black font-cinzel text-white tracking-wide">
          Descubre tu Casa en Equilibria 360
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Responde según tu estilo natural de pensar, resolver problemas y crear tecnología para el planeta. El oráculo asignará tu afinidad elemental.
        </p>
      </div>

      {/* Progress & Stepper Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 mb-8 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-400 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">Pregunta {currentIndex + 1}</span>
            <span>de {totalQuestions}</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-cyan-400 font-medium">{currentQ.category}</span>
          </div>
          <span className="text-cyan-400 font-bold">{progressPercent}% Completado</span>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out shadow-sm shadow-indigo-500/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step dots */}
        <div className="grid grid-cols-7 gap-2 mt-3 pt-1">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const isCompleted = answers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => {
                  sound.playClick();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  isCurrent
                    ? 'bg-cyan-400 shadow-sm shadow-cyan-400/80 ring-2 ring-cyan-400/40'
                    : isCompleted
                    ? 'bg-indigo-500'
                    : 'bg-slate-800'
                }`}
                title={`Ir a pregunta ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800/90 shadow-2xl relative overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />
        
        {/* Category & Context Box */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
            <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-3 py-1 rounded-lg">
              {currentQ.category}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Opción Múltiple (1 elección)
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug mt-2">
            {currentQ.question}
          </h2>

          <div className="mt-3 flex items-start gap-2.5 text-xs sm:text-sm text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span><strong className="text-slate-300">Contexto:</strong> {currentQ.context}</span>
          </div>
        </div>

        {/* Options List */}
        <div className="space-y-3.5 my-6">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption?.id === option.id;
            const targetHouse = HOUSES[option.houseId];

            return (
              <div
                key={option.id}
                onClick={() => handleSelectOption(option)}
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption(null)}
                className={`group cursor-pointer relative p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                  isSelected
                    ? 'bg-slate-800/95 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500/50'
                    : 'bg-slate-900/60 hover:bg-slate-800/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Radio Circle / Badge */}
                <div className="shrink-0 mt-0.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-500/50 scale-105'
                        : 'border-slate-600 bg-slate-950 text-slate-500 group-hover:border-slate-400'
                    }`}
                  >
                    {isSelected ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-[11px] font-bold">{String.fromCharCode(65 + idx)}</span>
                    )}
                  </div>
                </div>

                {/* Option Content */}
                <div className="flex-1">
                  <p className={`text-sm sm:text-base font-semibold leading-relaxed transition ${
                    isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                  }`}>
                    {option.text}
                  </p>
                  <p className="text-xs sm:text-xs text-slate-400 mt-1 font-medium leading-normal">
                    {option.subtext}
                  </p>
                </div>

                {/* Subtle indicator hint on hover/select */}
                {isSelected && (
                  <div className="hidden sm:flex items-center gap-1.5 self-center text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Seleccionada</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-semibold transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>
            )}

            {Object.keys(answers).length > 0 && (
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition"
                title="Reiniciar cuestionario"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            )}
          </div>

          <div className="w-full sm:w-auto">
            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-lg transition-all duration-200 ${
                selectedOption
                  ? currentIndex === totalQuestions - 1
                    ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white shadow-rose-500/30 animate-pulse'
                    : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-indigo-500/30'
                  : 'bg-slate-800 text-slate-500 border border-slate-800 cursor-not-allowed opacity-60'
              }`}
            >
              {currentIndex === totalQuestions - 1 ? (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Revelar mi Casa Legendaria</span>
                </>
              ) : (
                <>
                  <span>Siguiente Pregunta</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Hint */}
      <div className="mt-8 text-center">
        <p className="text-xs text-slate-500">
          ¿Prefieres leer los perfiles antes de responder?{' '}
          <button
            onClick={onExploreDirectory}
            className="text-cyan-400 hover:text-cyan-300 underline font-semibold transition"
          >
            Explora el Directorio de las 5 Casas aquí
          </button>
        </p>
      </div>

    </div>
  );
};
