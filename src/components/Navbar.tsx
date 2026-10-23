import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  Home as HomeIcon, 
  Shield, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Menu, 
  X,
  Award
} from 'lucide-react';
import { HOUSES, House } from '../data/housesData';
import { sound } from '../utils/audio';

interface NavbarProps {
  activeTab: 'home' | 'quiz' | 'directory' | 'competition' | 'result';
  setActiveTab: (tab: 'home' | 'quiz' | 'directory' | 'competition' | 'result') => void;
  assignedHouseId: string | null;
  onOpenHouseModal?: (house: House) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  assignedHouseId,
  onOpenHouseModal,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const next = !soundEnabled;
    sound.setEnabled(next);
    setSoundEnabled(next);
    if (next) sound.playClick();
  };

  const handleNav = (tab: 'home' | 'quiz' | 'directory' | 'competition') => {
    sound.playClick();
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const assignedHouse = assignedHouseId ? HOUSES[assignedHouseId] : null;

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group text-left transition focus:outline-none"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[2px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <span className="font-cinzel text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300">
                  360
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-cinzel tracking-wider text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition">
                  EQUILIBRIA 360
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 rounded-full">
                  IA & Clima
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                Casas de Inteligencia Artificial
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              onClick={() => handleNav('home')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'home'
                  ? 'bg-slate-800 text-cyan-300 border border-slate-700/80 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span>Inicio</span>
            </button>

            <button
              onClick={() => handleNav('quiz')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'quiz' || activeTab === 'result'
                  ? 'bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white border border-indigo-500/50 shadow-md shadow-indigo-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>Test de Casas</span>
            </button>

            <button
              onClick={() => handleNav('directory')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'directory'
                  ? 'bg-slate-800 text-cyan-300 border border-slate-700/80 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Directorio</span>
            </button>

            <button
              onClick={() => handleNav('competition')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'competition'
                  ? 'bg-slate-800 text-cyan-300 border border-slate-700/80 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Dinámica & Puntos</span>
            </button>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Assigned House Pill if already completed */}
            {assignedHouse && (
              <button
                onClick={() => {
                  sound.playSelect();
                  if (onOpenHouseModal) {
                    onOpenHouseModal(assignedHouse);
                  } else {
                    setActiveTab('result');
                  }
                }}
                className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition shadow-sm hover:scale-105 ${assignedHouse.theme.badgeBg} ${assignedHouse.theme.badgeText}`}
                title="Ver tu casa asignada"
              >
                <img
                  src={assignedHouse.crest}
                  alt={assignedHouse.name}
                  className="w-5 h-5 rounded-full object-cover border border-white/20"
                />
                <span>Tu Casa: {assignedHouse.name.replace('Casa ', '')}</span>
              </button>
            )}

            {/* Sound Toggle Button */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-700/80 transition"
              title={soundEnabled ? 'Silenciar efectos de sonido' : 'Activar efectos de sonido'}
              aria-label="Sound Toggle"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {assignedHouse && (
            <div className={`p-3 rounded-xl border flex items-center gap-3 ${assignedHouse.theme.badgeBg} ${assignedHouse.theme.badgeText} mb-2`}>
              <img
                src={assignedHouse.crest}
                alt={assignedHouse.name}
                className="w-8 h-8 rounded-full object-cover border"
              />
              <div>
                <p className="text-xs font-semibold">Casa Asignada:</p>
                <p className="font-bold text-sm">{assignedHouse.name}</p>
              </div>
            </div>
          )}

          <button
            onClick={() => handleNav('home')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
              activeTab === 'home' ? 'bg-slate-800 text-cyan-300' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span>Inicio</span>
          </button>

          <button
            onClick={() => handleNav('quiz')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
              activeTab === 'quiz' || activeTab === 'result'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Test de Selección de Casas</span>
          </button>

          <button
            onClick={() => handleNav('directory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
              activeTab === 'directory' ? 'bg-slate-800 text-cyan-300' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Directorio de las 5 Casas</span>
          </button>

          <button
            onClick={() => handleNav('competition')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
              activeTab === 'competition' ? 'bg-slate-800 text-cyan-300' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Dinámica de Competencia & Puntos</span>
          </button>
        </div>
      )}
    </header>
  );
};
