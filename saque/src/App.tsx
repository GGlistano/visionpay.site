import React, { useState } from 'react';
import { User, TabType, WithdrawalRequest } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useLocalStorage<User | null>('withdrawal_user', null);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [pendingWithdrawal, setPendingWithdrawal] = useLocalStorage<WithdrawalRequest | null>('pending_withdrawal', null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setPendingWithdrawal(null);
    setActiveTab('home');
  };

  const handleWithdrawalRequest = (request: WithdrawalRequest) => {
    setPendingWithdrawal(request);
  };

  if (!user) {
    return <Login onLogin={handleLogin} initialUser={user} />;
  }

  return (
    <Dashboard
      user={user}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={handleLogout}
      onWithdrawalRequest={handleWithdrawalRequest}
      pendingWithdrawal={pendingWithdrawal}
    />
  );
}

export default App;