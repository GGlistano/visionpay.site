import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, RegisterData } from '../types';
import { userService } from '../services/userService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUserId = localStorage.getItem('survey_user_id');
    if (storedUserId) {
      loadUser(storedUserId);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadUser = async (userId: string) => {
    try {
      const userData = await userService.getUserById(userId);
      if (userData) {
        setUser(userData);
      } else {
        localStorage.removeItem('survey_user_id');
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      localStorage.removeItem('survey_user_id');
    }
    setIsLoading(false);
  };

  const login = async (username: string, phone: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      console.log('Tentando login com telefone:', phone);
      
      // Buscar usuário apenas por telefone
      const userData = await userService.getUserByPhone(phone);
      
      console.log('Resultado da busca:', userData);
      
      if (!userData) {
        console.log('Usuário não encontrado');
        setIsLoading(false);
        return false;
      }

      // Update last login and daily streak
      const now = new Date();
      const lastLogin = new Date(userData.lastLogin);
      const timeDiff = now.getTime() - lastLogin.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      
      let updates: Partial<User> = {
        lastLogin: now
      };

      if (daysDiff === 1) {
        updates.dailyLoginStreak = userData.dailyLoginStreak + 1;
        updates.trustScore = Math.min(100, userData.trustScore + 10);
        
        // Add login notification
        const notifications = JSON.parse(localStorage.getItem('user_notifications') || '[]');
        notifications.unshift({
          id: Date.now(),
          type: 'general',
          title: 'Login Diário Realizado',
          message: `Parabéns! Você manteve sua sequência de ${updates.dailyLoginStreak} dias. +10% no Score de Confiança.`,
          timestamp: new Date(),
          read: false
        });
        localStorage.setItem('user_notifications', JSON.stringify(notifications));
      } else if (daysDiff > 1) {
        updates.dailyLoginStreak = 1;
      }

      // Update user in Firestore
      const updateSuccess = await userService.updateUser(userData.id, updates);
      
      if (!updateSuccess) {
        console.log('Erro ao atualizar dados do usuário');
        setIsLoading(false);
        return false;
      }
      
      // Update local user data
      const updatedUser = { ...userData, ...updates };
      setUser(updatedUser);
      localStorage.setItem('survey_user_id', userData.id);
      
      // Clear the load button flag for returning users
      localStorage.removeItem('has_shown_load_button');
      
      console.log('Login realizado com sucesso');
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const newUser = await userService.createUser(userData);
      
      if (!newUser) {
        setIsLoading(false);
        return false;
      }
      
      setUser(newUser);
      localStorage.setItem('survey_user_id', newUser.id);
      
      // Clear the load button flag for new users
      localStorage.removeItem('has_shown_load_button');
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Erro no registro:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('survey_user_id');
    localStorage.removeItem('survey_responses');
    localStorage.removeItem('survey_cooldowns');
    localStorage.removeItem('user_notifications');
    localStorage.removeItem('has_shown_load_button');
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      // Update in Firestore
      await userService.updateUser(user.id, updates);
      
      // Update local state
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUser,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};