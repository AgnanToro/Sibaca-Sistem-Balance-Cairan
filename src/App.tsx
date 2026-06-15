import { useState } from 'react';
import LandingPage from './components/LandingPage';
import CalculatorPage from './components/CalculatorPage';
import HistoryPage from './components/HistoryPage';
import { supabase } from './utils/supabase';


export default function App() {
  const [view, setView] = useState<'landing' | 'calculator' | 'history'>('landing');

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onStart={() => setView('calculator')} />
      ) : view === 'calculator' ? (
        <CalculatorPage onBack={() => setView('landing')} onNavigateHistory={() => setView('history')} />
      ) : (
        <HistoryPage onBack={() => setView('calculator')} />
      )}
    </>
  );
}
