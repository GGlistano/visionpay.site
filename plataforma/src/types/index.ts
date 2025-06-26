export interface User {
  id: string;
  name: string;
  username: string;
  phone: string;
  country: string;
  registeredAt: Date;
  lastLogin: Date;
  balance: number;
  trustScore: number;
  hasCompletedOnboarding: boolean;
  objective?: string;
  profileAnswers?: Record<string, string>;
  dailyLoginStreak: number;
  surveysCompleted: number;
  paymentMethods?: {
    paypal: { email: string; verified: boolean; verificationDate?: Date };
    mpesa: { name: string; phone: string; verified: boolean; verificationDate?: Date };
    emola: { name: string; phone: string; verified: boolean; verificationDate?: Date };
    bankAccount: { nib: string; holderName: string; verified: boolean; verificationDate?: Date };
  };
}

export interface Survey {
  id: string;
  companyName: string;
  logoUrl: string;
  reward: number;
  title: string;
  description: string;
  questions: Question[];
  estimatedTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'text';
  question: string;
  options?: string[];
  required: boolean;
}

export interface SurveyResponse {
  surveyId: string;
  userId: string;
  answers: Record<string, string>;
  completedAt: Date;
  reward: number;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, phone: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isLoading: boolean;
}

export interface RegisterData {
  name: string;
  username: string;
  phone: string;
  country: string;
  password: string;
}