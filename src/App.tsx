import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { DirectoryView } from './components/DirectoryView';
import { CompetitionView } from './components/CompetitionView';
import { HouseModal } from './components/HouseModal';
import { HOUSES, House } from './data/housesData';
import { Leaf, Sparkles, Heart, Shield } from 'lucide-react';
import { sound } from './utils/audio';

type TabType = 'home' | 'quiz' | 'directory' | 'competition' | 'result';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [assignedHouseId, setAssignedHouseId] = useState<string | null>(null);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({
    drakarys: 0,
    leons: 0,
    altair: 0,
    gryphos: 0,
    serpentis: 0,
  });
  const [selectedHouseForModal, setSelectedHouseForModal] = useState<House | null>(null);

  // Load saved state from localStorage if available
  useEffect(() => {
    try {
      const savedHouse = localStorage.getItem('eq360_assigned_house');
      const savedScores = localStorage.getItem('eq360_quiz_scores');
      if (savedHouse && HOUSES[savedHouse]) {
        setAssignedHouseId(savedHouse);
      }
      if (savedScores) {
        setQuizScores(JSON.parse(savedScores));
      }
    } catch {
      // Ignore localStorage error
    }
  }, []);

  // Handle Quiz Completion
  const handleQuizComplete = (scores: Record<string, number>, winnerId: string) => {
    setQuizScores(scores);
    setAssignedHouseId(winnerId);
    try {
      localStorage.setItem('eq360_assigned_house', winnerId);
      localStorage.setItem('eq360_quiz_scores', JSON.stringify(scores));
    } catch {
      // Ignore
    }
    setActiveTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeQuiz = () => {
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenHouseModal = (house: House) => {
    setSelectedHouseForModal(house);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        assignedHouseId={assignedHouseId}
        onOpenHouseModal={handleOpenHouseModal}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onStartQuiz={() => {
              setActiveTab('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreDirectory={() => {
              setActiveTab('directory');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCompetition={() => {
              setActiveTab('competition');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenHouseModal={handleOpenHouseModal}
            assignedHouseId={assignedHouseId}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            onComplete={handleQuizComplete}
            onExploreDirectory={() => {
              setActiveTab('directory');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'result' && (
          <ResultView
            winningHouseId={assignedHouseId || 'drakarys'}
            scores={quizScores}
            onRetakeQuiz={handleRetakeQuiz}
            onExploreHouse={handleOpenHouseModal}
            onGoToCompetition={() => {
              setActiveTab('competition');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'directory' && (
          <DirectoryView
            onSelectHouse={handleOpenHouseModal}
            onTakeQuiz={() => {
              setActiveTab('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            assignedHouseId={assignedHouseId}
          />
        )}

        {activeTab === 'competition' && <CompetitionView />}
      </main>

      {/* Detail House Modal */}
      <HouseModal
        house={selectedHouseForModal}
        onClose={() => setSelectedHouseForModal(null)}
        onTakeQuiz={() => {
          setSelectedHouseForModal(null);
          setActiveTab('quiz');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isUserAssigned={selectedHouseForModal?.id === assignedHouseId}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 mt-16 text-slate-400 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[2px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-cinzel font-black text-cyan-300">
                  360
                </div>
              </div>
              <div>
                <p className="font-cinzel font-bold text-white tracking-wide text-sm">
                  Club Equilibria 360
                </p>
                <p className="text-xs text-slate-500">
                  Curso de Inteligencia Artificial aplicada al Medio Ambiente
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-6 text-xs font-semibold text-slate-300">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-cyan-400 transition"
              >
                Inicio
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('quiz');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-cyan-400 transition"
              >
                Test de Selección
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('directory');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-cyan-400 transition"
              >
                Directorio
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('competition');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-cyan-400 transition"
              >
                Dinámica de Puntos
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>Tecnología verde y modelos de IA para el futuro del planeta.</span>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
            <p>© 2026 Club Equilibria 360. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1">
              <span>Construido para formar a los líderes de la IA Ecológica</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
