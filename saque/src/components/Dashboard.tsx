import React from 'react';
import { TabType, User, WithdrawalRequest } from '../types';
import { Home as HomeIcon, CreditCard, User as UserIcon } from 'lucide-react';
import Home from './Home';
import Withdrawal from './Withdrawal';
import Profile from './Profile';

interface DashboardProps {
  user: User;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
  onWithdrawalRequest: (request: WithdrawalRequest) => void;
  pendingWithdrawal?: WithdrawalRequest;
}

export default function Dashboard({ 
  user, 
  activeTab, 
  onTabChange, 
  onLogout, 
  onWithdrawalRequest,
  pendingWithdrawal 
}: DashboardProps) {
  const tabs = [
    { id: 'home' as TabType, label: 'Início', icon: HomeIcon },
    { id: 'withdrawal' as TabType, label: 'Saque', icon: CreditCard },
    { id: 'profile' as TabType, label: 'Perfil', icon: UserIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home user={user} />;
      case 'withdrawal':
        return <Withdrawal onWithdrawalRequest={onWithdrawalRequest} pendingWithdrawal={pendingWithdrawal} />;
      case 'profile':
        return <Profile user={user} onLogout={onLogout} />;
      default:
        return <Home user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="max-w-md mx-auto">
          <div className="flex justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <div className="w-1 h-1 bg-blue-600 rounded-full mt-1"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}