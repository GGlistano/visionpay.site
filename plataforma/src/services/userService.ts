import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { User, RegisterData } from '../types';

export const userService = {
  // Buscar usuário apenas por telefone
  async getUserByPhone(phone: string): Promise<User | null> {
    try {
      console.log('Buscando usuário com telefone:', phone);
      
      const usersRef = collection(db, 'usuarios');
      
      // Tentar buscar com o telefone exato
      let q = query(usersRef, where('phone', '==', phone));
      let querySnapshot = await getDocs(q);
      
      // Se não encontrar, tentar buscar com campo 'telefone'
      if (querySnapshot.empty) {
        q = query(usersRef, where('telefone', '==', phone));
        querySnapshot = await getDocs(q);
      }
      
      // Se ainda não encontrar, tentar buscar removendo espaços e caracteres especiais
      if (querySnapshot.empty) {
        const cleanPhone = phone.replace(/\s+/g, '').replace(/[^\d+]/g, '');
        q = query(usersRef, where('phone', '==', cleanPhone));
        querySnapshot = await getDocs(q);
      }
      
      // Se ainda não encontrar, tentar com campo 'telefone' limpo
      if (querySnapshot.empty) {
        const cleanPhone = phone.replace(/\s+/g, '').replace(/[^\d+]/g, '');
        q = query(usersRef, where('telefone', '==', cleanPhone));
        querySnapshot = await getDocs(q);
      }
      
      if (querySnapshot.empty) {
        console.log('Nenhum usuário encontrado com o telefone:', phone);
        return null;
      }
      
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      
      console.log('Usuário encontrado:', userData);
      
      return {
        id: userDoc.id,
        name: userData.name || userData.nome || 'Usuário',
        username: userData.username || userData.usuario || userData.name || userData.nome || 'user',
        phone: userData.phone || userData.telefone,
        country: userData.country || userData.pais || 'Moçambique',
        registeredAt: userData.registeredAt ? userData.registeredAt.toDate() : userData.createdAt ? userData.createdAt.toDate() : new Date(),
        lastLogin: userData.lastLogin ? userData.lastLogin.toDate() : new Date(),
        balance: userData.balance || userData.saldo || 200,
        trustScore: userData.trustScore || userData.scoreConfianca || 35,
        hasCompletedOnboarding: userData.hasCompletedOnboarding || false,
        objective: userData.objective || userData.objetivo,
        profileAnswers: userData.profileAnswers || {},
        dailyLoginStreak: userData.dailyLoginStreak || userData.sequenciaLogin || 1,
        surveysCompleted: userData.surveysCompleted || userData.pesquisasCompletas || 0,
        paymentMethods: userData.paymentMethods || {
          paypal: { email: '', verified: false },
          mpesa: { name: '', phone: '', verified: false },
          emola: { name: '', phone: '', verified: false },
          bankAccount: { nib: '', holderName: '', verified: false }
        }
      };
    } catch (error) {
      console.error('Erro ao buscar usuário por telefone:', error);
      return null;
    }
  },

  // Buscar usuário por ID
  async getUserById(userId: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(db, 'usuarios', userId));
      
      if (!userDoc.exists()) {
        return null;
      }
      
      const userData = userDoc.data();
      
      return {
        id: userDoc.id,
        name: userData.name || userData.nome || 'Usuário',
        username: userData.username || userData.usuario || userData.name || userData.nome || 'user',
        phone: userData.phone || userData.telefone,
        country: userData.country || userData.pais || 'Moçambique',
        registeredAt: userData.registeredAt ? userData.registeredAt.toDate() : userData.createdAt ? userData.createdAt.toDate() : new Date(),
        lastLogin: userData.lastLogin ? userData.lastLogin.toDate() : new Date(),
        balance: userData.balance || userData.saldo || 200,
        trustScore: userData.trustScore || userData.scoreConfianca || 35,
        hasCompletedOnboarding: userData.hasCompletedOnboarding || false,
        objective: userData.objective || userData.objetivo,
        profileAnswers: userData.profileAnswers || {},
        dailyLoginStreak: userData.dailyLoginStreak || userData.sequenciaLogin || 1,
        surveysCompleted: userData.surveysCompleted || userData.pesquisasCompletas || 0,
        paymentMethods: userData.paymentMethods || {
          paypal: { email: '', verified: false },
          mpesa: { name: '', phone: '', verified: false },
          emola: { name: '', phone: '', verified: false },
          bankAccount: { nib: '', holderName: '', verified: false }
        }
      };
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      return null;
    }
  },

  // Criar novo usuário
  async createUser(userData: RegisterData): Promise<User | null> {
    try {
      // Verificar se telefone já existe
      const existingUser = await this.getUserByPhone(userData.phone);
      if (existingUser) {
        throw new Error('Número de telefone já cadastrado');
      }

      const now = new Date();
      const newUser: Omit<User, 'id'> = {
        name: userData.name,
        username: userData.username,
        phone: userData.phone,
        country: userData.country,
        registeredAt: now,
        lastLogin: now,
        balance: 200, // Saldo inicial de $200
        trustScore: 35,
        hasCompletedOnboarding: false,
        dailyLoginStreak: 1,
        surveysCompleted: 0,
        paymentMethods: {
          paypal: { email: '', verified: false },
          mpesa: { name: '', phone: '', verified: false },
          emola: { name: '', phone: '', verified: false },
          bankAccount: { nib: '', holderName: '', verified: false }
        }
      };

      const docRef = doc(collection(db, 'usuarios'));
      await setDoc(docRef, newUser);

      return {
        id: docRef.id,
        ...newUser
      };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return null;
    }
  },

  // Atualizar usuário
  async updateUser(userId: string, updates: Partial<User>): Promise<boolean> {
    try {
      const userRef = doc(db, 'usuarios', userId);
      
      // Converter datas para Timestamp se necessário
      const updateData = { ...updates };
      if (updateData.lastLogin) {
        updateData.lastLogin = updateData.lastLogin;
      }
      if (updateData.registeredAt) {
        updateData.registeredAt = updateData.registeredAt;
      }

      await updateDoc(userRef, updateData);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return false;
    }
  },

  // Calcular dias ativos baseado na data de registro
  calculateDaysActive(registeredAt: Date): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - registeredAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
};