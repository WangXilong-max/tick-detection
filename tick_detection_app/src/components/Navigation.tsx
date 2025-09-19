interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  dimmed?: boolean;
}

export function Navigation({ currentPage, onNavigate, dimmed = false }: NavigationProps) {
  const navItems = [
    {
      id: 'riskmaps',
      label: 'Trail',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      id: 'identification',
      label: 'Detect',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      id: 'emergency',
      label: 'Emergency',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    }
  ];

  return (
    <div className={`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200/50 transition-opacity ${
      dimmed ? 'opacity-50' : 'opacity-100'
    }`}>
      <div className="grid grid-cols-3 h-20">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => !dimmed && onNavigate(item.id)}
            disabled={dimmed}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              currentPage === item.id || (currentPage.includes('identification') && item.id === 'identification')
                ? 'text-blue-600'
                : 'text-gray-400 hover:text-gray-600'
            } ${dimmed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className={`transition-colors ${
              currentPage === item.id || (currentPage.includes('identification') && item.id === 'identification') ? 'text-blue-600' : 'text-gray-400'
            }`}>
              {item.icon}
            </div>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}