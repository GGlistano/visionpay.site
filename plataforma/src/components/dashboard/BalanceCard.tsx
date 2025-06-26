import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const BalanceCard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-6 h-6" />
          <h2 className="text-lg font-semibold">Saldo Disponível</h2>
        </div>
        <TrendingUp className="w-5 h-5 opacity-80" />
      </div>
      
      <div className="space-y-2">
        <p className="text-3xl font-bold">
          ${user?.balance?.toFixed(2) || '0.00'} USD
        </p>
        <p className="text-green-100 text-sm">
          {user?.surveysCompleted || 0} pesquisas completadas
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-green-400">
        <div className="flex justify-between text-sm">
          <span className="text-green-100">Este mês</span>
          <span className="font-medium">+${(user?.balance || 0) > 100 ? '45.25' : '12.75'}</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;