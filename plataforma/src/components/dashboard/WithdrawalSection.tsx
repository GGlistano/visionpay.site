import React, { useState } from 'react';
import { CreditCard, AlertCircle, CheckCircle, Clock, Smartphone, Building2, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const WithdrawalSection: React.FC = () => {
  const [withdrawalStatus, setWithdrawalStatus] = useState<'none' | 'processing'>('none');
  const [selectedMethod, setSelectedMethod] = useState<'paypal' | 'mpesa' | 'emola' | 'bank' | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const { user, updateUser } = useAuth();
  
  const trustScore = user?.trustScore || 35;
  const canWithdraw = trustScore >= 85;
  const balance = user?.balance || 200;

  const handleWithdrawal = () => {
    if (canWithdraw && balance >= 10 && selectedMethod) {
      setWithdrawalStatus('processing');
    }
  };

  const handleProfileUpdate = (method: string, data: any) => {
    const updatedPaymentMethods = {
      ...user?.paymentMethods,
      [method]: {
        ...data,
        verified: false,
        verificationDate: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 hours from now
      }
    };
    
    updateUser({ paymentMethods: updatedPaymentMethods });
  };

  const PaymentMethodForm = ({ method }: { method: string }) => {
    const [formData, setFormData] = useState<any>({});
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleProfileUpdate(method, formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {method === 'paypal' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              E-mail PayPal
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500"
              placeholder="seu@email.com"
              required
            />
          </div>
        )}
        
        {(method === 'mpesa' || method === 'emola') && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nome do Titular
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500"
                placeholder="Nome completo"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Número de Telefone
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500"
                placeholder="+258 84 123 4567"
                required
              />
            </div>
          </>
        )}
        
        {method === 'bankAccount' && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                NIB (Número de Identificação Bancária)
              </label>
              <input
                type="text"
                value={formData.nib || ''}
                onChange={(e) => setFormData({...formData, nib: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500"
                placeholder="0000 0000 0000 0000 0000 0000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nome do Titular da Conta
              </label>
              <input
                type="text"
                value={formData.holderName || ''}
                onChange={(e) => setFormData({...formData, holderName: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500"
                placeholder="Nome completo conforme no banco"
                required
              />
            </div>
          </>
        )}
        
        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors"
        >
          Salvar Dados
        </button>
      </form>
    );
  };

  const getMethodStatus = (method: string) => {
    const methodData = user?.paymentMethods?.[method as keyof typeof user.paymentMethods];
    if (!methodData) return 'not_configured';
    
    if (methodData.verified) return 'verified';
    
    if (methodData.verificationDate) {
      const now = new Date();
      const verificationDate = new Date(methodData.verificationDate);
      if (now >= verificationDate) {
        // Auto-verify after 8 hours
        handleProfileUpdate(method, { ...methodData, verified: true });
        return 'verified';
      }
      return 'processing';
    }
    
    return 'not_configured';
  };

  if (showProfile) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Métodos de Pagamento</h2>
          <button
            onClick={() => setShowProfile(false)}
            className="text-slate-600 hover:text-slate-900"
          >
            Voltar aos Saques
          </button>
        </div>

        <div className="grid gap-6">
          {/* PayPal */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-slate-600" />
                <h3 className="font-semibold text-slate-900">PayPal</h3>
              </div>
              <div className="flex items-center space-x-2">
                {getMethodStatus('paypal') === 'verified' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {getMethodStatus('paypal') === 'processing' && (
                  <Clock className="w-5 h-5 text-orange-500" />
                )}
                <span className="text-sm text-slate-600">
                  {getMethodStatus('paypal') === 'verified' && 'Verificado'}
                  {getMethodStatus('paypal') === 'processing' && 'Em verificação'}
                  {getMethodStatus('paypal') === 'not_configured' && 'Não configurado'}
                </span>
              </div>
            </div>
            {getMethodStatus('paypal') !== 'verified' && (
              <PaymentMethodForm method="paypal" />
            )}
          </div>

          {/* M-Pesa */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-6 h-6 text-slate-600" />
                <h3 className="font-semibold text-slate-900">M-Pesa</h3>
              </div>
              <div className="flex items-center space-x-2">
                {getMethodStatus('mpesa') === 'verified' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {getMethodStatus('mpesa') === 'processing' && (
                  <Clock className="w-5 h-5 text-orange-500" />
                )}
                <span className="text-sm text-slate-600">
                  {getMethodStatus('mpesa') === 'verified' && 'Verificado'}
                  {getMethodStatus('mpesa') === 'processing' && 'Em verificação'}
                  {getMethodStatus('mpesa') === 'not_configured' && 'Não configurado'}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Saldo em USD será convertido para Metical na taxa atual
            </p>
            {getMethodStatus('mpesa') !== 'verified' && (
              <PaymentMethodForm method="mpesa" />
            )}
          </div>

          {/* E-Mola */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-6 h-6 text-slate-600" />
                <h3 className="font-semibold text-slate-900">E-Mola</h3>
              </div>
              <div className="flex items-center space-x-2">
                {getMethodStatus('emola') === 'verified' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {getMethodStatus('emola') === 'processing' && (
                  <Clock className="w-5 h-5 text-orange-500" />
                )}
                <span className="text-sm text-slate-600">
                  {getMethodStatus('emola') === 'verified' && 'Verificado'}
                  {getMethodStatus('emola') === 'processing' && 'Em verificação'}
                  {getMethodStatus('emola') === 'not_configured' && 'Não configurado'}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Saldo em USD será convertido para Metical na taxa atual
            </p>
            {getMethodStatus('emola') !== 'verified' && (
              <PaymentMethodForm method="emola" />
            )}
          </div>

          {/* Conta Bancária */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Building2 className="w-6 h-6 text-slate-600" />
                <h3 className="font-semibold text-slate-900">Conta Bancária</h3>
              </div>
              <div className="flex items-center space-x-2">
                {getMethodStatus('bankAccount') === 'verified' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {getMethodStatus('bankAccount') === 'processing' && (
                  <Clock className="w-5 h-5 text-orange-500" />
                )}
                <span className="text-sm text-slate-600">
                  {getMethodStatus('bankAccount') === 'verified' && 'Verificado'}
                  {getMethodStatus('bankAccount') === 'processing' && 'Em verificação'}
                  {getMethodStatus('bankAccount') === 'not_configured' && 'Não configurado'}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Transferência bancária direta - saldo convertido para Metical
            </p>
            {getMethodStatus('bankAccount') !== 'verified' && (
              <PaymentMethodForm method="bankAccount" />
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Verificação Manual:</strong> Todos os métodos de pagamento passam por verificação manual que leva até 8 horas. 
            Isso garante a segurança das suas transações.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Solicitar Saque</h2>
        <p className="text-slate-600">
          Saque seus ganhos de forma segura e rápida
        </p>
      </div>

      {/* Balance Display */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
        <h3 className="text-lg font-semibold mb-2">Saldo Disponível</h3>
        <p className="text-3xl font-bold">${balance.toFixed(2)} USD</p>
        <p className="text-green-100 text-sm mt-2">
          ≈ {(balance * 63.5).toFixed(2)} MZN (taxa aproximada)
        </p>
      </div>

      {/* Trust Score Check */}
      {!canWithdraw && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-orange-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-800 mb-2">
                Score de Confiança Insuficiente
              </h3>
              <p className="text-orange-700 mb-4">
                Seu Score ainda está abaixo de 85%. Complete pelo menos 15 pesquisas para liberar seu saque.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-orange-700">Progresso atual</span>
                  <span className="text-sm font-medium text-orange-800">{trustScore}%</span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${trustScore}%` }}
                  />
                </div>
                <p className="text-xs text-orange-600">
                  Pesquisas completadas: {user?.surveysCompleted || 0}/15
                </p>
              </div>
              <div className="mt-4 p-4 bg-orange-100 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Por que isso é necessário?</strong><br/>
                  Isso nos ajuda a validar que você é um parceiro legítimo, não um usuário que só quer sacar e sumir. 
                  É uma medida de segurança que protege tanto você quanto nossa plataforma.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Options */}
      {canWithdraw && (
        <div className="space-y-4">
          {withdrawalStatus === 'none' && (
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Métodos de Saque</h3>
                <button
                  onClick={() => setShowProfile(true)}
                  className="text-slate-600 hover:text-slate-900 text-sm flex items-center gap-1"
                >
                  <User className="w-4 h-4" />
                  Configurar Métodos
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedMethod === 'paypal' ? 'border-slate-900 bg-slate-50' : 'border-slate-200'
                  }`}
                  onClick={() => setSelectedMethod('paypal')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">PayPal</p>
                        <p className="text-sm text-slate-600">Receba em 1-3 dias úteis</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">Taxa: $0.50</p>
                      <p className="text-sm text-slate-600">Mín: $10.00</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedMethod === 'mpesa' ? 'border-slate-900 bg-slate-50' : 'border-slate-200'
                  }`}
                  onClick={() => setSelectedMethod('mpesa')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-6 h-6 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">M-Pesa</p>
                        <p className="text-sm text-slate-600">Conversão USD → MZN</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">Taxa: 2%</p>
                      <p className="text-sm text-slate-600">Mín: $5.00</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedMethod === 'emola' ? 'border-slate-900 bg-slate-50' : 'border-slate-200'
                  }`}
                  onClick={() => setSelectedMethod('emola')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-6 h-6 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">E-Mola</p>
                        <p className="text-sm text-slate-600">Conversão USD → MZN</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">Taxa: 2%</p>
                      <p className="text-sm text-slate-600">Mín: $5.00</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedMethod === 'bank' ? 'border-slate-900 bg-slate-50' : 'border-slate-200'
                  }`}
                  onClick={() => setSelectedMethod('bank')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-6 h-6 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">Conta Bancária</p>
                        <p className="text-sm text-slate-600">Transferência direta</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">Taxa: $1.00</p>
                      <p className="text-sm text-slate-600">Mín: $20.00</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleWithdrawal}
                disabled={!selectedMethod || balance < 5}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!selectedMethod 
                  ? 'Selecione um método de saque'
                  : balance < 5 
                  ? 'Saldo mínimo não atingido'
                  : `Solicitar Saque via ${selectedMethod === 'paypal' ? 'PayPal' : selectedMethod === 'mpesa' ? 'M-Pesa' : selectedMethod === 'emola' ? 'E-Mola' : 'Banco'}`
                }
              </button>
            </div>
          )}

          {withdrawalStatus === 'processing' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-blue-800 mb-2">Saque em Processamento</h3>
              <p className="text-blue-700 mb-4">
                Sua solicitação de saque está sendo processada pelo sistema financeiro internacional.
              </p>
              <div className="bg-blue-100 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Tempo estimado:</strong> 1-3 dias úteis<br/>
                  <strong>Valor:</strong> ${(balance - (selectedMethod === 'paypal' ? 0.50 : selectedMethod === 'bank' ? 1.00 : balance * 0.02)).toFixed(2)} USD<br/>
                  <strong>Método:</strong> {selectedMethod === 'paypal' ? 'PayPal' : selectedMethod === 'mpesa' ? 'M-Pesa' : selectedMethod === 'emola' ? 'E-Mola' : 'Conta Bancária'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Information */}
      <div className="bg-slate-50 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 mb-3">Informações sobre Saques</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• PayPal: Mínimo $10.00 USD, taxa $0.50</li>
          <li>• M-Pesa/E-Mola: Mínimo $5.00 USD, taxa 2%</li>
          <li>• Conta Bancária: Mínimo $20.00 USD, taxa $1.00</li>
          <li>• Score mínimo necessário: 85% (15+ pesquisas)</li>
          <li>• Processamento: 1-3 dias úteis</li>
          <li>• Conversão USD→MZN na taxa atual do mercado</li>
        </ul>
      </div>
    </div>
  );
};

export default WithdrawalSection;