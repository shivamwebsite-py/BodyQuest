import React, { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { sound } from '../../utils/audio';
import {
  Menu,
  X,
  Volume2,
  VolumeX,
  Search,
  Compass,
  Layers,
  Activity,
  Trophy,
  Calendar,
  Award,
  Crown,
  Home
} from 'lucide-react';

interface NavbarProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state, toggleSound, levelInfo } = useProgress();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore Body', icon: Compass },
    { id: 'library', label: 'Organ Library', icon: Layers },
    { id: 'systems', label: 'Body Systems', icon: Activity },
    { id: 'quiz', label: 'Quiz Arena', icon: Trophy },
    { id: 'daily', label: 'Daily Challenge', icon: Calendar },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'progress', label: 'My Progress', icon: Crown },
  ];

  const handleNavClick = (id: string) => {
    sound.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBF3E0]/95 border-b border-[#E8DEC4] backdrop-blur-md transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF9A4D] via-[#F9A9CF] to-[#DFF59B] flex items-center justify-center text-[#1D1A33] shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-xs font-black">✻</span>
          </div>
          <div>
            <span className="text-xl font-normal font-serif-editorial text-[#1D1A33] tracking-tight">
              Body<span className="italic">Quest</span>
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-white/80 p-1 rounded-full border border-[#E8DEC4] shadow-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#1D1A33] text-white shadow-sm'
                    : 'text-[#5A5672] hover:text-[#1D1A33] hover:bg-[#FBF3E0]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Global Search Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSearch();
            }}
            aria-label="Search Organs and Systems"
            className="p-2 rounded-full bg-white hover:bg-[#F3EAD3] text-[#1D1A33] border border-[#E8DEC4] transition-colors shadow-sm cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            aria-label={state.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
            className="p-2 rounded-full bg-white hover:bg-[#F3EAD3] text-[#1D1A33] border border-[#E8DEC4] transition-colors shadow-sm cursor-pointer"
          >
            {state.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#2E5A14]" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Player Level Badge */}
          <button
            onClick={() => handleNavClick('progress')}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DFF59B] text-[#1D1A33] hover:bg-[#D4ED8A] transition-all shadow-sm cursor-pointer"
          >
            <div className="w-2 h-2 rounded-full bg-[#2E5A14]" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold">
                {levelInfo.current}
              </span>
              <span className="text-[11px] font-mono text-[#2E5A14] font-bold">
                {state.totalXp} XP
              </span>
            </div>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle navigation menu"
            className="xl:hidden p-2 rounded-full bg-white hover:bg-[#F3EAD3] text-[#1D1A33] border border-[#E8DEC4] transition-colors shadow-sm cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#E8DEC4] px-4 py-4 space-y-1 shadow-soft">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full px-4 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#1D1A33] text-white'
                    : 'text-[#1D1A33] hover:bg-[#FBF3E0]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#F0E6D0] flex items-center justify-between px-2 text-xs font-bold text-[#5A5672]">
            <span>Rank: {levelInfo.current}</span>
            <span className="text-[#FF9A4D]">{state.totalXp} XP</span>
          </div>
        </div>
      )}
    </header>
  );
};
