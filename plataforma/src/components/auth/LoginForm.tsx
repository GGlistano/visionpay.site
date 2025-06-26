import React, { useState } from 'react';
import { Phone, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!phone) {
      setError('Por favor, digite seu número de telefone');
      return;
    }

    console.log('Iniciando login com telefone:', phone);
    
    try {
      const success = await login('', phone); // Username não é mais necessário
      
      console.log('Resultado do login:', success);
      
      if (!success) {
        setError('Número não encontrado no sistema. Verifique o número.');
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      setError('Erro de conexão. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Entrar na Plataforma</h1>
            <p className="text-slate-600">Digite seu número de telefone para acessar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Número de Telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                  placeholder="+258 84 123 4567"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Use o número cadastrado no sistema
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Ainda não tem conta?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-slate-900 font-medium hover:underline"
              >
                Cadastre-se aqui
              </button>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">
              O sistema irá buscar seus dados automaticamente pelo telefone
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;