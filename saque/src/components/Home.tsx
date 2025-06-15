import React from 'react';
import { User } from '../types';
import { DollarSign, TrendingUp, Shield, Clock } from 'lucide-react';

interface HomeProps {
  user: User;
}

export default function Home({ user }: HomeProps) {
  const balance = 200;

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Parabéns, {user.name.split(' ')[0]}!
        </h1>
        <p className="text-blue-100 leading-relaxed">
          Será um enorme prazer trabalhar consigo.
        </p>
      </div>

      {/* Balance Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Saldo Disponível</h2>
          <DollarSign className="w-6 h-6 text-green-600" />
        </div>
        <div className="text-4xl font-bold text-green-600 mb-2">
          ${balance} USD
        </div>
        <p className="text-sm text-gray-500">
          Atualizado agora mesmo
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
          <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-gray-800 text-sm mb-1">
            Crescimento
          </h3>
          <p className="text-xs text-gray-600">
            Resultados consistentes
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
          <Shield className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-gray-800 text-sm mb-1">
            Segurança
          </h3>
          <p className="text-xs text-gray-600">
            100% protegido
          </p>
        </div>
      </div>

      {/* Motivational Text */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <Clock className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="font-semibold text-gray-800">Mensagem Importante</h3>
        </div>
        
        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-3">
          <p>
            Você é essencial para nosso crescimento. Trabalhamos com transparência 
            e dedicação, e contamos com sua colaboração para alcançarmos resultados 
            extraordinários juntos.
          </p>
          
          <p>
            Nossa plataforma oferece oportunidades únicas de crescimento financeiro 
            através de investimentos internacionais seguros e regulamentados.
          </p>
          
          <p>
            Estamos comprometidos em fornecer o melhor suporte e as melhores 
            condições para que você possa maximizar seus retornos de forma 
            segura e eficiente.
          </p>
          
          <p>
            Agradecemos pela confiança depositada em nossos serviços e esperamos 
            construir uma parceria duradoura e próspera.
          </p>
        </div>
      </div>
    </div>
  );
}