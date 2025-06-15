import React, { useState } from 'react';
import { PaymentMethod, AccountDetails, WithdrawalRequest } from '../types';
import { DollarSign, CreditCard, Smartphone, Building, ArrowRight, CheckCircle, Clock } from 'lucide-react';

interface WithdrawalProps {
  onWithdrawalRequest: (request: WithdrawalRequest) => void;
  pendingWithdrawal?: WithdrawalRequest;
}

export default function Withdrawal({ onWithdrawalRequest, pendingWithdrawal }: WithdrawalProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'pending'>('form');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa');
  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    accountNumber: '',
    accountHolder: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const balance = 200;

  const paymentMethods = [
    { id: 'mpesa' as PaymentMethod, name: 'Mpesa', icon: Smartphone, type: 'mobile' },
    { id: 'emola' as PaymentMethod, name: 'Emola', icon: Smartphone, type: 'mobile' },
    { id: 'mkesh' as PaymentMethod, name: 'Mkesh', icon: Smartphone, type: 'mobile' },
    { id: 'bci' as PaymentMethod, name: 'Conta BCI', icon: Building, type: 'bank' },
    { id: 'millennium' as PaymentMethod, name: 'Millennium Bim', icon: Building, type: 'bank' },
  ];

  const selectedMethod = paymentMethods.find(m => m.id === paymentMethod);
  const isMobileWallet = selectedMethod?.type === 'mobile';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!country.trim() || !accountDetails.accountNumber.trim() || !accountDetails.accountHolder.trim()) {
      return;
    }

    setIsLoading(true);
    setStep('processing');

    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 3000));

    const request: WithdrawalRequest = {
      id: Date.now().toString(),
      amount: balance,
      country: country.trim(),
      paymentMethod,
      accountDetails,
      status: 'pending',
      createdAt: new Date()
    };

    onWithdrawalRequest(request);
    setStep('pending');
    setIsLoading(false);
  };

  if (pendingWithdrawal && step === 'form') {
    setStep('pending');
  }

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Processando seus dados...
          </h2>
          <p className="text-gray-600">
            Aguarde enquanto verificamos suas informações
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
        </div>
      </div>
    );
  }

  if (step === 'pending') {
    return (
      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-8 h-8 text-yellow-600 mr-3" />
            <h2 className="text-xl font-bold text-yellow-800">
              Saque Pendente
            </h2>
          </div>
          
          <div className="bg-white rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Valor:</span>
              <span className="font-bold text-lg">${balance} USD</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Método:</span>
              <span className="font-semibold">{selectedMethod?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status:</span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Em Análise
              </span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-semibold text-blue-800 mb-2">
              Informação Importante
            </h3>
            <p className="text-blue-700 text-sm leading-relaxed">
              Seu pedido está sob análise conforme a <strong>lei nº 356/2023</strong> que 
              regulamenta saques internacionais. O processamento pode levar de 24 a 72 horas 
              úteis. Em breve será liberado.
            </p>
          </div>
        </div>

        <button
          onClick={() => setStep('form')}
          className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
        >
          Fazer Novo Pedido
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Balance Display */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm mb-1">Saldo Disponível</p>
            <p className="text-3xl font-bold">${balance} USD</p>
          </div>
          <DollarSign className="w-10 h-10 text-green-200" />
        </div>
      </div>

      {/* Withdrawal Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
          Solicitar Saque
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              País
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Digite seu país"
              required
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Método de Pagamento
            </label>
            <div className="grid grid-cols-1 gap-3">
              {paymentMethods.map((method) => (
                <label key={method.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="sr-only"
                  />
                  <div className={`flex items-center p-4 border-2 rounded-xl transition-all ${
                    paymentMethod === method.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <method.icon className={`w-6 h-6 mr-3 ${
                      paymentMethod === method.id ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <span className={`font-medium ${
                      paymentMethod === method.id ? 'text-blue-800' : 'text-gray-700'
                    }`}>
                      {method.name}
                    </span>
                    {paymentMethod === method.id && (
                      <CheckCircle className="w-5 h-5 text-blue-600 ml-auto" />
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isMobileWallet ? 'Número do Celular' : 'NIB'}
              </label>
              <input
                type="text"
                value={accountDetails.accountNumber}
                onChange={(e) => setAccountDetails(prev => ({
                  ...prev,
                  accountNumber: e.target.value
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder={isMobileWallet ? "+258 XX XXX XXXX" : "Digite o NIB"}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Titular
              </label>
              <input
                type="text"
                value={accountDetails.accountHolder}
                onChange={(e) => setAccountDetails(prev => ({
                  ...prev,
                  accountHolder: e.target.value
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Nome completo do titular"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all duration-200 flex items-center justify-center group"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processando...
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}