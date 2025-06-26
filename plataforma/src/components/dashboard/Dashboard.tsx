import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardHeader from './DashboardHeader';
import BalanceCard from './BalanceCard';
import TrustScoreCard from './TrustScoreCard';
import SurveyList from './SurveyList';
import WithdrawalSection from './WithdrawalSection';
import FAQ from './FAQ';
import Training from './Training';
import Profile from './Profile';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'surveys' | 'withdrawal' | 'faq' | 'training' | 'profile'>('surveys');
  const { user } = useAuth();

  if (!user) return null;

  const tabs = [
    { id: 'surveys', label: 'Pesquisas', icon: '📊' },
    { id: 'withdrawal', label: 'Saque', icon: '💰' },
    { id: 'profile', label: 'Perfil', icon: '👤' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
    { id: 'training', label: 'Treinamento', icon: '🎓' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Stats Cards - Mobile optimized */}
        <div className="grid grid-cols-1 gap-6">
          {/* Mobile: Only show balance card */}
          <div className="md:hidden">
            <BalanceCard />
          </div>
          
          {/* Desktop: Show both cards */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            <BalanceCard />
            <TrustScoreCard />
          </div>
        </div>

        {/* Mobile Trust Score - Simplified */}
        <div className="md:hidden bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Score de Confiança</span>
            <span className="text-lg font-bold text-slate-900">{user.trustScore}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(user.trustScore, 85)}%` }}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-slate-200 relative">
            {/* Scroll indicators for mobile */}
            <div className="md:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 flex items-center justify-center">
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            </div>
            <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
            
            <nav className="flex space-x-4 md:space-x-8 px-6 overflow-x-auto scrollbar-hide">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'border-slate-900 text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 md:p-6">
            {activeTab === 'surveys' && <SurveyList />}
            {activeTab === 'withdrawal' && <WithdrawalSection />}
            {activeTab === 'profile' && <Profile />}
            {activeTab === 'faq' && <FAQ />}
            {activeTab === 'training' && <Training />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;