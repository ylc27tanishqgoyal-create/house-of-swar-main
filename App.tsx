import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Store } from './pages/Store';
import { ProductDetail } from './pages/ProductDetail';
import { RagaExplorer } from './pages/RagaExplorer';
import { Learning } from './pages/Learning';
import { Care } from './pages/Care';
import { Login } from './components/Login';
import { Profile } from './pages/Profile';
import { ViewState } from './types';
import { FEATURED_INSTRUMENTS } from './constants';

interface User {
  name: string;
  mobile: string;
  email: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [autoPlayRagaId, setAutoPlayRagaId] = useState<string | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(ViewState.HOME);
  };

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setCurrentView(ViewState.PRODUCT_DETAIL);
  };

  const handleNavigateToRaga = (ragaId: string) => {
    setAutoPlayRagaId(ragaId);
    setCurrentView(ViewState.RAGA_EXPLORER);
  };

  // Login Gate
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Hero setView={setCurrentView} userName={user.name} />;
      case ViewState.STORE:
        return <Store onSelectInstrument={handleProductSelect} />;
      case ViewState.PRODUCT_DETAIL: {
        const product = FEATURED_INSTRUMENTS.find(i => i.id === selectedProductId);
        if (!product) return <Store onSelectInstrument={handleProductSelect} />;
        return <ProductDetail instrument={product} onBack={() => setCurrentView(ViewState.STORE)} />;
      }
      case ViewState.RAGA_EXPLORER:
        return <RagaExplorer autoPlayRagaId={autoPlayRagaId} />;
      case ViewState.LEARNING:
        return <Learning onNavigateToRaga={handleNavigateToRaga} />;
      case ViewState.MAINTENANCE:
        return <Care user={user} />;
      case ViewState.PROFILE:
        return <Profile user={user} onBack={() => setCurrentView(ViewState.HOME)} onLogout={handleLogout} />;
      default:
        return <Hero setView={setCurrentView} userName={user.name} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView} userName={user.name}>
      {renderContent()}
    </Layout>
  );
}