/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { ToastContainer } from './components/layout/ToastContainer';

import { HomeSection } from './components/home/HomeSection';
import { BodyExplorerSection } from './components/explorer/BodyExplorerSection';
import { OrganLibrarySection } from './components/library/OrganLibrarySection';
import { BodySystemsSection } from './components/systems/BodySystemsSection';
import { QuizArenaSection } from './components/quiz/QuizArenaSection';
import { DailyChallengeSection } from './components/daily/DailyChallengeSection';
import { AchievementsSection } from './components/achievements/AchievementsSection';
import { ProgressDashboardSection } from './components/progress/ProgressDashboardSection';

import { OrganId, QuizCategory } from './types';

function MainApp() {
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Cross-section state navigation
  const [explorerOrganId, setExplorerOrganId] = useState<OrganId>('brain');
  const [systemsInitialId, setSystemsInitialId] = useState<string | undefined>(undefined);
  const [quizPresetCategory, setQuizPresetCategory] = useState<QuizCategory>('all');

  // Scroll to top smoothly when changing sections
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  const navigateTo = (section: string) => {
    setCurrentSection(section);
  };

  const handleSelectOrganToExplore = (organId: OrganId) => {
    setExplorerOrganId(organId);
    setCurrentSection('explore');
  };

  const handleSelectSystemToExplore = (systemId: string) => {
    setSystemsInitialId(systemId);
    setCurrentSection('systems');
  };

  const handleStartCategoryQuiz = (category: string) => {
    setQuizPresetCategory(category as QuizCategory);
    setCurrentSection('quiz');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF3E0] text-[#1D1A33] selection:bg-[#DFF59B] selection:text-[#1D1A33]">
      {/* Top Navigation */}
      <Navbar
        currentSection={currentSection}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-8 sm:py-10">
        {currentSection === 'home' && (
          <HomeSection
            onNavigate={navigateTo}
            onSelectOrganToExplore={handleSelectOrganToExplore}
            onSelectSystemToExplore={handleSelectSystemToExplore}
          />
        )}

        {currentSection === 'explore' && (
          <BodyExplorerSection
            initialOrganId={explorerOrganId}
            onExploreSystem={handleSelectSystemToExplore}
          />
        )}

        {currentSection === 'library' && (
          <OrganLibrarySection
            onSelectOrganToExplore={handleSelectOrganToExplore}
          />
        )}

        {currentSection === 'systems' && (
          <BodySystemsSection
            initialSystemId={systemsInitialId}
            onSelectOrganToExplore={handleSelectOrganToExplore}
            onStartCategoryQuiz={handleStartCategoryQuiz}
          />
        )}

        {currentSection === 'quiz' && (
          <QuizArenaSection
            presetCategory={quizPresetCategory}
            onReturnToExplorer={() => setCurrentSection('explore')}
          />
        )}

        {currentSection === 'daily' && (
          <DailyChallengeSection
            onReturnToHome={() => setCurrentSection('home')}
          />
        )}

        {currentSection === 'achievements' && (
          <AchievementsSection />
        )}

        {currentSection === 'progress' && (
          <ProgressDashboardSection
            onNavigateToExplorer={() => setCurrentSection('explore')}
            onNavigateToQuizzes={() => {
              setQuizPresetCategory('all');
              setCurrentSection('quiz');
            }}
          />
        )}
      </main>

      {/* Search & Discover Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectOrgan={handleSelectOrganToExplore}
        onSelectSystem={handleSelectSystemToExplore}
      />

      {/* Real-time Achievement & Level-Up Toasts */}
      <ToastContainer />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <MainApp />
    </ProgressProvider>
  );
}
