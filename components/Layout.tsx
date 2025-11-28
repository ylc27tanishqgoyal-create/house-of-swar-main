import React from 'react';
import { ViewState } from '../types';
import { ShoppingBag, Music, BookOpen, PenTool, Home, User, Bell } from 'lucide-react';
import { Sitar } from './Sitar';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  userName?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, userName }) => {

  const navItems = [
    { label: 'Home', view: ViewState.HOME, icon: Home },
    { label: 'Shop', view: ViewState.STORE, icon: ShoppingBag },
    { label: 'Raag', view: ViewState.RAGA_EXPLORER, icon: Music },
    { label: 'Learn', view: ViewState.LEARNING, icon: BookOpen },
    { label: 'Care', view: ViewState.MAINTENANCE, icon: PenTool },
  ];

  // Helper to determine header title
  const getTitle = () => {
    switch (currentView) {
      case ViewState.HOME: return "House of Swar";
      case ViewState.STORE: return "Collection";
      case ViewState.PRODUCT_DETAIL: return "Details";
      case ViewState.RAGA_EXPLORER: return "Raag Explorer";
      case ViewState.LEARNING: return "Learn";
      case ViewState.MAINTENANCE: return "Care Hub";
      default: return "House of Swar";
    }
  };

  return (
    <div className="w-full max-w-md h-[100dvh] bg-gradient-to-br from-midnight to-charcoal flex flex-col shadow-2xl overflow-hidden relative border-x border-white/5 mx-auto">
      <div className="grain-overlay"></div>

      {/* Mobile Top Bar */}
      <header className="h-14 bg-midnight/95 backdrop-blur border-b border-white/10 flex items-center justify-between px-4 shrink-0 z-30">
        <div className="flex items-center gap-3">
          {currentView === ViewState.HOME ? (
            <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
              <Sitar className="text-gold-400" size={16} />
            </div>
          ) : null}
          <h1 className="font-display text-lg text-gold-100 font-bold tracking-wide">
            {getTitle()}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {userName && currentView === ViewState.HOME && (
            <button
              onClick={() => setView(ViewState.PROFILE)}
              className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center text-gold-400 text-xs font-bold hover:bg-gold-500/30 transition-colors"
            >
              {userName.charAt(0)}
            </button>
          )}
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative bg-midnight">
        {children}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="h-20 glass-nav border-t border-gold-500/20 shrink-0 flex items-center justify-around px-2 z-30 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.label}
              onClick={() => setView(item.view)}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all active:scale-95 ${isActive ? 'text-gold-400' : 'text-slate-500'
                }`}
            >
              <div className={`relative p-2 rounded-full transition-all duration-500 ${isActive ? 'bg-gold-500/10 shadow-[0_0_15px_rgba(212,175,55,0.3)]' : ''}`}>
                <item.icon
                  size={22}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={`transition-all duration-300 ${isActive ? 'text-gold-400 -translate-y-1' : 'text-slate-400'}`}
                />
              </div>
              <span className={`text-[9px] uppercase tracking-widest font-bold ${isActive ? 'opacity-100' : 'opacity-0 scale-0'} transition-all duration-300`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  );
};