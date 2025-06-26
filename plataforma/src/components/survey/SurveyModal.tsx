import React, { useState, useEffect } from 'react';
import { X, Clock, CheckCircle, DollarSign, Loader } from 'lucide-react';
import { Survey } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface SurveyModalProps {
  survey: Survey;
  onClose: () => void;
  onComplete: () => void;
}

const SurveyModal: React.FC<SurveyModalProps> = ({ survey, onClose, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(60); // 1 minute minimum
  const [isComplete, setIsComplete] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { user, updateUser } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setCanSubmit(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Função para tocar som de dinheiro
  const playMoneySound = () => {
    try {
      // Criar múltiplos sons de "cha-ching" para um efeito mais rico
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Som principal de dinheiro (frequências que lembram moedas)
      const playTone = (frequency: number, duration: number, delay: number = 0) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + duration);
        }, delay);
      };

      // Sequência de sons que simula "cha-ching" de dinheiro
      playTone(800, 0.1, 0);     // Primeiro "cha"
      playTone(600, 0.1, 100);   // Segundo tom
      playTone(900, 0.15, 200);  // "ching" mais alto
      playTone(700, 0.2, 350);   // Ressonância final
      
      // Som adicional de "cascata" de moedas
      for (let i = 0; i < 5; i++) {
        playTone(400 + Math.random() * 200, 0.05, 500 + i * 50);
      }
      
    } catch (error) {
      console.log('Áudio não suportado neste navegador');
    }
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = async () => {
    if (currentQuestion < survey.questions.length - 1) {
      // Show processing animation between questions
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 second delay
      setIsProcessing(false);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    
    // Show final processing
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
    setIsProcessing(false);
    
    // Calculate trust score increase based on surveys completed
    const currentSurveys = user?.surveysCompleted || 0;
    const newSurveyCount = currentSurveys + 1;
    
    // Progressive trust score: need 15+ surveys to reach 85%
    let trustScoreIncrease = 0;
    if (newSurveyCount <= 15) {
      // First 15 surveys give more significant increases
      trustScoreIncrease = Math.floor((50 / 15) * Math.random() + 2); // 2-5% per survey
    } else {
      // After 15 surveys, smaller increases
      trustScoreIncrease = Math.floor(Math.random() * 2 + 1); // 1-2% per survey
    }
    
    const newTrustScore = Math.min(100, (user?.trustScore || 35) + trustScoreIncrease);
    
    // Update user balance and stats in Firestore
    await updateUser({
      balance: (user?.balance || 200) + survey.reward,
      surveysCompleted: newSurveyCount,
      trustScore: newTrustScore
    });

    // Save survey response locally
    const responses = JSON.parse(localStorage.getItem('survey_responses') || '[]');
    responses.push({
      surveyId: survey.id,
      userId: user?.id,
      answers,
      completedAt: new Date(),
      reward: survey.reward
    });
    localStorage.setItem('survey_responses', JSON.stringify(responses));

    // 🎵 TOCAR SOM DE DINHEIRO! 🎵
    playMoneySound();

    setIsComplete(true);
    
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  const question = survey.questions[currentQuestion];
  const currentAnswer = answers[question.id] || '';
  const canProceed = currentAnswer.length > 0;

  if (isProcessing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full text-center">
          <Loader className="w-10 md:w-12 h-10 md:h-12 text-slate-900 mx-auto mb-4 animate-spin" />
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
            Avaliando sua resposta...
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            Processando dados e validando informações
          </p>
          <div className="mt-4 w-full bg-slate-200 rounded-full h-2">
            <div className="bg-slate-900 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full text-center relative overflow-hidden">
          {/* Efeito visual de celebração */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 opacity-10 animate-pulse"></div>
          
          <div className="relative z-10">
            <CheckCircle className="w-12 md:w-16 h-12 md:h-16 text-green-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
              🎉 Pesquisa Concluída! 🎉
            </h2>
            <p className="text-slate-600 mb-4 text-sm md:text-base">
              Parabéns! Você ganhou:
            </p>
            
            {/* Valor com animação especial */}
            <div className="text-2xl md:text-3xl font-bold text-green-600 flex items-center justify-center gap-2 mb-4 animate-pulse">
              <DollarSign className="w-6 md:w-8 h-6 md:h-8 animate-bounce" />
              <span className="bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
                {survey.reward.toFixed(2)} USD
              </span>
              <span className="text-yellow-500 animate-spin">💰</span>
            </div>
            
            <p className="text-xs md:text-sm text-slate-500 mb-4">
              💸 O valor foi adicionado ao seu saldo automaticamente 💸
            </p>
            
            <div className="bg-gradient-to-r from-green-50 to-yellow-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-800 text-xs md:text-sm">
                <strong>🏆 Score de Confiança:</strong> +{Math.floor(Math.random() * 4 + 2)}%
              </p>
            </div>
            
            {/* Emojis de celebração */}
            <div className="mt-4 text-2xl">
              💵 🎊 💰 🎉 💸
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3 md:space-x-4">
            <img
              src={survey.logoUrl}
              alt={survey.companyName}
              className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-base md:text-lg font-semibold text-slate-900">{survey.title}</h2>
              <p className="text-slate-600 text-xs md:text-sm">{survey.companyName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Progress */}
        <div className="p-4 md:p-6 pb-2 md:pb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm font-medium text-slate-700">
              Pergunta {currentQuestion + 1} de {survey.questions.length}
            </span>
            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500">
              <Clock className="w-3 h-3 md:w-4 md:h-4" />
              {timeRemaining > 0 ? `${timeRemaining}s` : 'Pronto'}
            </div>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-slate-900 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / survey.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="px-4 md:px-6 pb-4 md:pb-6">
          <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-4 md:mb-6">
            {question.question}
          </h3>

          {question.type === 'multiple-choice' ? (
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, option)}
                  className={`w-full p-3 md:p-4 text-left border rounded-lg transition-all text-sm md:text-base ${
                    currentAnswer === option
                      ? 'border-slate-900 bg-slate-50 text-slate-900'
                      : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {currentAnswer === option && (
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-slate-900" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <textarea
              value={currentAnswer}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              placeholder="Digite sua resposta aqui..."
              className="w-full p-3 md:p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all resize-none text-sm md:text-base"
              rows={4}
              required={question.required}
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center p-4 md:p-6 border-t border-slate-200">
          <div className="text-xs md:text-sm text-slate-500">
            {!canSubmit && timeRemaining > 0 && (
              <span>Aguarde {timeRemaining}s para continuar</span>
            )}
          </div>
          
          <button
            onClick={handleNext}
            disabled={!canProceed || (!canSubmit && currentQuestion === survey.questions.length - 1)}
            className="bg-slate-900 text-white px-4 md:px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            {currentQuestion === survey.questions.length - 1 ? 'Finalizar' : 'Próxima'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyModal;