import React, { useState, useEffect } from 'react';
import { Clock, Building, DollarSign, Play, Loader } from 'lucide-react';
import { mockSurveys } from '../../utils/mockData';
import { Survey } from '../../types';
import SurveyModal from '../survey/SurveyModal';

const SurveyList: React.FC = () => {
  const [availableSurveys, setAvailableSurveys] = useState<Survey[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [cooldownEnd, setCooldownEnd] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSurveys, setShowSurveys] = useState(false);
  const [hasLoadedSurveys, setHasLoadedSurveys] = useState(false);

  useEffect(() => {
    checkSurveyAvailability();
  }, []);

  const checkSurveyAvailability = () => {
    const cooldowns = JSON.parse(localStorage.getItem('survey_cooldowns') || '{}');
    const completedSurveys = JSON.parse(localStorage.getItem('survey_responses') || '[]');
    const loadedSurveys = JSON.parse(localStorage.getItem('loaded_surveys') || '[]');
    
    const completedIds = completedSurveys.map((response: any) => response.surveyId);
    const now = new Date();
    
    // Check if user is in cooldown
    if (cooldowns.nextAvailable) {
      const nextAvailable = new Date(cooldowns.nextAvailable);
      if (now < nextAvailable) {
        setCooldownEnd(nextAvailable);
        setAvailableSurveys([]);
        setShowSurveys(false);
        setHasLoadedSurveys(false);
        return;
      }
    }
    
    // Se já carregou pesquisas nesta sessão, usar as mesmas
    if (loadedSurveys.length > 0) {
      // Filtrar pesquisas já completadas das carregadas
      const remainingSurveys = loadedSurveys.filter((survey: Survey) => 
        !completedIds.includes(survey.id)
      );
      
      if (remainingSurveys.length > 0) {
        setAvailableSurveys(remainingSurveys);
        setShowSurveys(true);
        setHasLoadedSurveys(true);
        setCooldownEnd(null);
        return;
      } else {
        // Todas as pesquisas carregadas foram completadas - ativar cooldown
        const cooldownHours = Math.floor(Math.random() * 16) + 8; // 8-24 hours
        const nextAvailable = new Date(Date.now() + cooldownHours * 60 * 60 * 1000);
        
        localStorage.setItem('survey_cooldowns', JSON.stringify({
          nextAvailable: nextAvailable.toISOString()
        }));
        localStorage.removeItem('loaded_surveys');
        
        setCooldownEnd(nextAvailable);
        setAvailableSurveys([]);
        setShowSurveys(false);
        setHasLoadedSurveys(false);
        return;
      }
    }
    
    // Filter out completed surveys and get available ones
    const availableSurveyPool = mockSurveys.filter(survey => !completedIds.includes(survey.id));
    
    if (availableSurveyPool.length === 0) {
      // All surveys completed, show cooldown message
      const nextReset = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      setCooldownEnd(nextReset);
      setAvailableSurveys([]);
      setShowSurveys(false);
      setHasLoadedSurveys(false);
      return;
    }
    
    // Show 3-5 random surveys from available pool
    const shuffled = [...availableSurveyPool].sort(() => 0.5 - Math.random());
    const numberOfSurveys = Math.floor(Math.random() * 3) + 3; // 3-5 surveys
    const selectedSurveys = shuffled.slice(0, Math.min(numberOfSurveys, availableSurveyPool.length));
    
    setAvailableSurveys(selectedSurveys);
    setCooldownEnd(null);
    setShowSurveys(false);
    setHasLoadedSurveys(false);
  };

  const handleLoadSurveys = async () => {
    setIsLoading(true);
    
    // Simulate loading surveys
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Salvar as pesquisas carregadas no localStorage
    localStorage.setItem('loaded_surveys', JSON.stringify(availableSurveys));
    
    setIsLoading(false);
    setShowSurveys(true);
    setHasLoadedSurveys(true);
  };

  const handleSurveyComplete = (survey: Survey) => {
    // Remove completed survey from available list
    const updatedSurveys = availableSurveys.filter(s => s.id !== survey.id);
    setAvailableSurveys(updatedSurveys);
    
    // Atualizar as pesquisas salvas no localStorage
    localStorage.setItem('loaded_surveys', JSON.stringify(updatedSurveys));
    
    // If no more surveys available, set cooldown
    if (updatedSurveys.length === 0) {
      const cooldownHours = Math.floor(Math.random() * 16) + 8; // 8-24 hours
      const nextAvailable = new Date(Date.now() + cooldownHours * 60 * 60 * 1000);
      
      localStorage.setItem('survey_cooldowns', JSON.stringify({
        nextAvailable: nextAvailable.toISOString()
      }));
      
      // Limpar pesquisas carregadas
      localStorage.removeItem('loaded_surveys');
      
      setCooldownEnd(nextAvailable);
      setShowSurveys(false);
      setHasLoadedSurveys(false);
    }
    
    setSelectedSurvey(null);
  };

  const formatTimeRemaining = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    
    if (diff <= 0) {
      // Limpar dados quando cooldown termina
      localStorage.removeItem('loaded_surveys');
      checkSurveyAvailability();
      return '';
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 md:py-12">
        <Loader className="w-12 md:w-16 h-12 md:h-16 text-slate-900 mx-auto mb-4 animate-spin" />
        <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
          Carregando pesquisas para você
        </h3>
        <p className="text-slate-600 mb-4 text-sm md:text-base">
          Por favor, responda com seriedade e honestidade
        </p>
        <div className="w-full max-w-md mx-auto bg-slate-200 rounded-full h-2">
          <div className="bg-slate-900 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
        </div>
      </div>
    );
  }

  if (cooldownEnd) {
    const completedSurveys = JSON.parse(localStorage.getItem('survey_responses') || '[]');
    const isAllCompleted = completedSurveys.length >= mockSurveys.length;
    
    return (
      <div className="text-center py-8 md:py-12">
        <Clock className="w-12 md:w-16 h-12 md:h-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
          {isAllCompleted ? 'Parabéns! Todas as pesquisas concluídas' : 'Aguarde as próximas empresas'}
        </h3>
        <p className="text-slate-600 mb-4 text-sm md:text-base px-4">
          {isAllCompleted 
            ? 'Você completou todas as pesquisas disponíveis. Novas empresas enviarão pesquisas em breve.'
            : 'As próximas empresas que vão te mandar pesquisas estarão disponíveis em:'
          }
        </p>
        {!isAllCompleted && (
          <div className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            {formatTimeRemaining(cooldownEnd)}
          </div>
        )}
        <p className="text-xs md:text-sm text-slate-500 px-4">
          {isAllCompleted 
            ? 'Continue fazendo login diariamente para manter seu score de confiança!'
            : 'As empresas enviam pesquisas em lotes programados para garantir qualidade das respostas.'
          }
        </p>
      </div>
    );
  }

  if (!showSurveys && availableSurveys.length > 0 && !hasLoadedSurveys) {
    return (
      <div className="text-center py-8 md:py-12">
        <div className="w-12 md:w-16 h-12 md:h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Play className="w-6 md:w-8 h-6 md:h-8 text-white" />
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
          Pesquisas Disponíveis
        </h3>
        <p className="text-slate-600 mb-6 text-sm md:text-base px-4">
          {availableSurveys.length} empresas enviaram pesquisas para você
        </p>
        <button
          onClick={handleLoadSurveys}
          className="bg-slate-900 text-white px-6 md:px-8 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 mx-auto text-sm md:text-base"
        >
          <Play className="w-4 md:w-5 h-4 md:h-5" />
          Responder Pesquisas
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-slate-900">
          Pesquisas Disponíveis
        </h2>
        <span className="text-xs md:text-sm text-slate-500">
          {availableSurveys.length} pesquisas
        </span>
      </div>

      <div className="grid gap-3 md:gap-4">
        {availableSurveys.map(survey => (
          <div
            key={survey.id}
            className="bg-white border border-slate-200 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start space-x-3 md:space-x-4 flex-1 min-w-0">
                <img
                  src={survey.logoUrl}
                  alt={survey.companyName}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 text-sm md:text-base truncate">{survey.title}</h3>
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-xs md:text-sm text-slate-600 mt-1 space-y-1 md:space-y-0">
                    <span className="flex items-center gap-1">
                      <Building className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span className="truncate">{survey.companyName}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      {survey.estimatedTime} min
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs md:text-sm mt-2 line-clamp-2">{survey.description}</p>
                </div>
              </div>
              
              <div className="text-right flex-shrink-0">
                <div className="flex items-center text-green-600 font-bold mb-2 text-sm md:text-base">
                  <DollarSign className="w-3 h-3 md:w-4 md:h-4" />
                  {survey.reward.toFixed(2)}
                </div>
                <button
                  onClick={() => setSelectedSurvey(survey)}
                  className="bg-slate-900 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 text-xs md:text-sm"
                >
                  <Play className="w-3 h-3 md:w-4 md:h-4" />
                  Responder
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSurvey && (
        <SurveyModal
          survey={selectedSurvey}
          onClose={() => setSelectedSurvey(null)}
          onComplete={() => handleSurveyComplete(selectedSurvey)}
        />
      )}
    </div>
  );
};

export default SurveyList;