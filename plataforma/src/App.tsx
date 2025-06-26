import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import Dashboard from './components/dashboard/Dashboard';

const AppContent: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show auth forms
  if (!user) {
    return authMode === 'login' ? (
      <LoginForm onSwitchToRegister={() => setAuthMode('register')} />
    ) : (
      <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
    );
  }

  // User needs onboarding
  if (!user.hasCompletedOnboarding) {
    return <OnboardingFlow />;
  }

  // Show main dashboard
  return <Dashboard />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;