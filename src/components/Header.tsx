import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onStartQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onStartQuiz,
}) => {
  const navItems = [
    { id: 'anatomi', label: 'Anatomi' },
    { id: 'sila', label: 'Lima Sila' },
    { id: 'puzzle', label: 'Susun Perisai' },
    { id: 'sejarah', label: 'Sejarah' },
    { id: 'lagu', label: 'Lagu Mars' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('anatomi')}
          className="text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-amber-700 transition-colors cursor-pointer text-left font-serif-patriotic"
        >
          Jelajah Garuda Pancasila
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
                activeTab === item.id
                  ? 'text-amber-800 border-amber-600 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 border-transparent hover:border-stone-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onStartQuiz}
            className="px-4 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            Uji Pemahaman Kuis
          </button>
        </div>
      </div>

      {/* Mobile nav bar row for small screens */}
      <div className="flex md:hidden overflow-x-auto px-4 py-2 border-t border-stone-100 bg-stone-50 gap-4 text-xs font-medium scrollbar-none">
        {navItems.map((item) => (
          <button
            key={`mob-${item.id}`}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap shrink-0 py-1 ${
              activeTab === item.id
                ? 'text-amber-800 font-bold border-b border-amber-700'
                : 'text-stone-500'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
