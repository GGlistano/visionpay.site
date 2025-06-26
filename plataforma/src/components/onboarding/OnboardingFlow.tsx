import React, { useState } from 'react';
import { ChevronRight, Target, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { onboardingQuestions } from '../../utils/mockData';

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { user, updateUser } = useAuth();

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentStep < onboardingQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      updateUser({
        hasCompletedOnboarding: true,
        objective: answers.objective,
        profileAnswers: answers,
        trustScore: (user?.trustScore || 35) + 15 // Bonus for completing onboarding
      });
    }
  };

  const currentQuestion = onboardingQuestions[currentStep];
  const currentAnswer = answers[currentQuestion.id] || '';
  const canProceed = currentAnswer.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Bem-vindo, {user?.name}!
            </h1>
            <p className="text-slate-600">
              Vamos conhecer você melhor para personalizar sua experiência
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">
                Progresso
              </span>
              <span className="text-sm text-slate-500">
                {currentStep + 1} de {onboardingQuestions.length}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / onboardingQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              {currentQuestion.question}
            </h2>

            {currentQuestion.type === 'text' ? (
              <textarea
                value={currentAnswer}
                onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                rows={4}
                required={currentQuestion.required}
              />
            ) : (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(currentQuestion.id, option)}
                    className={`w-full p-4 text-left border rounded-lg transition-all ${
                      currentAnswer === option
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {currentAnswer === option && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {currentStep === onboardingQuestions.length - 1 ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Finalizar
              </>
            ) : (
              <>
                Próxima
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;