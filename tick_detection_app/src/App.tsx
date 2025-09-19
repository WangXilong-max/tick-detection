import { useState } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { TickIdentificationPage } from './components/TickIdentificationPage';
import { RiskMapsPage } from './components/RiskMapsPage';
import { SeasonalTickRiskMapPage } from './components/SeasonalTickRiskMapPage';
import { AnimalPresencePage } from './components/AnimalPresencePage';
import { VegetationDensityPage } from './components/VegetationDensityPage';
import { EmergencyProtocolPage } from './components/EmergencyProtocolPage';

import { Navigation } from './components/Navigation';
import { TopBar } from './components/TopBar';

export default function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleModalStateChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onNavigate={handleNavigate} />;
      case 'identification':
        return <TickIdentificationPage onNavigate={handleNavigate} onModalStateChange={handleModalStateChange} />;
      case 'riskmaps':
        return <RiskMapsPage onNavigate={handleNavigate} />;
      case 'seasonal-risk-map':
        return <SeasonalTickRiskMapPage onNavigate={handleNavigate} />;
      case 'animal-presence':
        return <AnimalPresencePage onNavigate={handleNavigate} />;
      case 'vegetation-density':
        return <VegetationDensityPage onNavigate={handleNavigate} />;
      case 'emergency':
        return <EmergencyProtocolPage onNavigate={handleNavigate} />;
      default:
        return <WelcomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* Phone Container */}
      <div className="relative w-full max-w-sm mx-auto z-10">
        {/* Phone Frame */}
        <div className="bg-black rounded-[2.5rem] p-2 shadow-2xl">
          {/* Screen */}
          <div className="bg-background rounded-[2rem] relative overflow-hidden">
            {/* Status Bar */}
            <div className="bg-background px-6 py-2 flex justify-between items-center text-sm border-b border-border/20">
              <div className="flex items-center space-x-1">
                <span className="text-xs">9:41</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="flex space-x-0.5">
                  <div className="w-1 h-1 bg-foreground rounded-full"></div>
                  <div className="w-1 h-1 bg-foreground rounded-full"></div>
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                </div>
                <div className="w-6 h-3 border border-foreground rounded-sm relative">
                  <div className="w-3 h-1.5 bg-foreground rounded-sm absolute top-0.5 left-0.5"></div>
                  <div className="w-0.5 h-1 bg-foreground rounded-r absolute top-1 -right-0.5"></div>
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className="h-[640px] flex flex-col">
              {/* TopBar - hidden on welcome page */}
              {currentPage !== 'welcome' && (
                <TopBar currentPage={currentPage} onNavigate={handleNavigate} />
              )}

              {/* Main Content */}
              <main 
                className="flex-1 overflow-y-auto"
                style={{ 
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {renderCurrentPage()}
              </main>

              {/* Bottom Navigation - hidden on welcome page */}
              {currentPage !== 'welcome' && (
                <div className="relative">
                  <Navigation 
                    currentPage={currentPage} 
                    onNavigate={handleNavigate}
                    dimmed={isModalOpen}
                  />
                </div>
              )}
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Global styles for webkit scrollbar */}
      <style dangerouslySetInnerHTML={{
        __html: `
          main::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
    </div>
  );
}