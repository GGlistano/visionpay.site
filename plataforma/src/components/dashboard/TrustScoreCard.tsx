import React from 'react';
import { Shield, Star, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/userService';

const TrustScoreCard: React.FC = () => {
  const { user } = useAuth();
  const trustScore = user?.trustScore || 35;
  const surveysCompleted = user?.surveysCompleted || 0;
  const daysActive = user ? userService.calculateDaysActive(user.registeredAt) : 1;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const canReach85Today = () => {
    // Score de 85% só pode ser atingido no 3º dia ou depois
    return daysActive >= 3 && surveysCompleted >= 15;
  };

  const getDaysUntil85 = () => {
    if (daysActive >= 3) return 0;
    return 3 - daysActive;
  };

  const getSurveysNeededFor85 = () => {
    if (surveysCompleted >= 15) return 0;
    return 15 - surveysCompleted;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">Score de Confiança</h2>
        </div>
        <Star className="w-5 h-5 text-slate-400" />
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-2xl font-bold ${getScoreColor(trustScore)}`}>
              {trustScore}%
            </span>
            <span className="text-sm text-slate-500">
              {trustScore >= 85 ? 'Liberado' : 'Em construção'}
            </span>
          </div>
          
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(trustScore)}`}
              style={{ width: `${Math.min(trustScore, 85)}%` }}
            />
          </div>
        </div>

        <div className="text-sm text-slate-600">
          <p className="mb-2">Como aumentar seu score:</p>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <Plus className="w-3 h-3 text-green-500" />
              <span>+10% por login diário</span>
            </li>
            <li className="flex items-center gap-2">
              <Plus className="w-3 h-3 text-green-500" />
              <span>+2-5% por pesquisa completada</span>
            </li>
            <li className="flex items-center gap-2">
              <Plus className="w-3 h-3 text-green-500" />
              <span>+5% por assistir conteúdo</span>
            </li>
          </ul>
        </div>

        {trustScore < 85 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-orange-800 text-sm">
              <strong>Para liberar saques:</strong><br/>
              {getDaysUntil85() > 0 && (
                <>Aguarde mais {getDaysUntil85()} dia(s) de atividade (Dia {daysActive}/3)<br/></>
              )}
              {getSurveysNeededFor85() > 0 && (
                <>Complete mais {getSurveysNeededFor85()} pesquisas ({surveysCompleted}/15)<br/></>
              )}
              {getDaysUntil85() === 0 && getSurveysNeededFor85() === 0 && (
                <>Continue ativo para atingir 85%</>
              )}
            </p>
          </div>
        )}

        {trustScore >= 85 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-800 text-sm">
              <strong>🎉 Parabéns!</strong> Saques liberados!
            </p>
          </div>
        )}

        <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
          <strong>Nota:</strong> O score máximo de 85% só pode ser atingido após pelo menos 3 dias de atividade consistente na plataforma.
        </div>
      </div>
    </div>
  );
};

export default TrustScoreCard;