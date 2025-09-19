import logoImage from '../assets/logo.png';

interface TopBarProps {
  currentPage: string;
  onNavigate?: (page: string) => void;
}

export function TopBar({ currentPage, onNavigate }: TopBarProps) {
  const getPageTitle = (page: string) => {
    switch (page) {
      case 'identification':
        return 'Tick Identification';
      case 'riskmaps':
        return 'Trail Risk Assessment';
      case 'seasonal-risk-map':
        return 'Seasonal Tick Risk Map';
      case 'animal-presence':
        return 'Animal Presence';
      case 'vegetation-density':
        return 'Vegetation Density Risk Levels';
      case 'emergency':
        return 'Emergency Protocols';
      default:
        return 'Tick Identification';
    }
  };

  const isSubPage = ['seasonal-risk-map', 'animal-presence', 'vegetation-density'].includes(currentPage);

  return (
    <div className="bg-white border-b border-gray-200/50 px-6 py-4 flex items-center relative">
      {/* Logo - fixed on the left */}
      <div className="absolute left-6 flex items-center">
        <img 
          src={logoImage} 
          alt="Logo" 
          className="h-8 w-8 object-contain"
        />
      </div>
      
      {/* Center content area */}
      <div className="flex-1 flex items-center justify-center">
        {isSubPage && onNavigate && (
          <button 
            onClick={() => onNavigate('riskmaps')}
            className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className={`text-lg text-gray-900 ${isSubPage ? '' : 'text-center'}`}>
          {getPageTitle(currentPage)}
        </h1>
      </div>
    </div>
  );
}