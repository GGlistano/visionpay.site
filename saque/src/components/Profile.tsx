import React from 'react';
import { User } from '../types';
import { User as UserIcon, Phone, Calendar, Shield, LogOut } from 'lucide-react';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

export default function Profile({ user, onLogout }: ProfileProps) {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-blue-100">Membro desde hoje</p>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Informações Pessoais
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <UserIcon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Nome Completo</p>
                <p className="font-medium text-gray-800">{user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Número de Celular</p>
                <p className="font-medium text-gray-800">{user.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Data de Cadastro</p>
                <p className="font-medium text-gray-800">
                  {new Date().toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Status da Conta
          </h3>
          
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Conta Verificada</p>
              <p className="text-sm text-gray-500">Sua conta está ativa e segura</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full bg-red-50 text-red-600 py-3 px-4 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sair da Conta
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-800 mb-3">
          Informações Importantes
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Mantenha seus dados sempre atualizados</p>
          <p>• Entre em contato conosco em caso de dúvidas</p>
          <p>• Sua segurança é nossa prioridade</p>
        </div>
      </div>
    </div>
  );
}