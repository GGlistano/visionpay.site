import React, { useState } from 'react';
import { User, Phone, Globe, Calendar, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/userService';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    phone: user?.phone || '',
    country: user?.country || ''
  });

  const handleSave = async () => {
    await updateUser(formData);
    setIsEditing(false);
    
    // Add notification for profile update
    const notifications = JSON.parse(localStorage.getItem('user_notifications') || '[]');
    notifications.unshift({
      id: Date.now(),
      type: 'profile_update',
      title: 'Perfil Atualizado',
      message: 'Suas informações pessoais foram atualizadas com sucesso.',
      timestamp: new Date(),
      read: false
    });
    localStorage.setItem('user_notifications', JSON.stringify(notifications));
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      username: user?.username || '',
      phone: user?.phone || '',
      country: user?.country || ''
    });
    setIsEditing(false);
  };

  const countries = [
    'Brasil', 'Estados Unidos', 'Canadá', 'Reino Unido', 'Alemanha', 
    'França', 'Espanha', 'Itália', 'Portugal', 'Argentina', 'México', 
    'Moçambique', 'Angola', 'Cabo Verde', 'Outro'
  ];

  if (!user) return null;

  const daysActive = userService.calculateDaysActive(user.registeredAt);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Meu Perfil</h2>
        <p className="text-slate-600 text-sm md:text-base">
          Gerencie suas informações pessoais e configurações
        </p>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-slate-300">@{user.username}</p>
            <p className="text-slate-300 text-sm">Membro desde {user.registeredAt.toLocaleDateString('pt-BR')}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm">
              <span className="bg-green-500 bg-opacity-20 text-green-200 px-2 py-1 rounded">
                Score: {user.trustScore}%
              </span>
              <span className="bg-blue-500 bg-opacity-20 text-blue-200 px-2 py-1 rounded">
                {user.surveysCompleted} pesquisas
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Informações Pessoais</h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm"
            >
              <Edit3 className="w-4 h-4" />
              Editar
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                <Save className="w-4 h-4" />
                Salvar
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Nome Completo
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
              />
            ) : (
              <p className="text-slate-900 bg-slate-50 px-3 py-2 rounded-lg text-sm">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Nome de Usuário
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
              />
            ) : (
              <p className="text-slate-900 bg-slate-50 px-3 py-2 rounded-lg text-sm">@{user.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Telefone
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
              />
            ) : (
              <p className="text-slate-900 bg-slate-50 px-3 py-2 rounded-lg text-sm">{user.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Globe className="w-4 h-4 inline mr-2" />
              País
            </label>
            {isEditing ? (
              <select
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            ) : (
              <p className="text-slate-900 bg-slate-50 px-3 py-2 rounded-lg text-sm">{user.country}</p>
            )}
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Estatísticas da Conta</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <Calendar className="w-6 h-6 text-slate-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{daysActive}</p>
            <p className="text-sm text-slate-600">Dias ativo</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="w-6 h-6 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-white text-xs font-bold">$</span>
            </div>
            <p className="text-2xl font-bold text-green-600">${user.balance?.toFixed(2)}</p>
            <p className="text-sm text-slate-600">Saldo total</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="w-6 h-6 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{user.surveysCompleted}</p>
            <p className="text-sm text-slate-600">Pesquisas completas</p>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="w-6 h-6 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-white text-xs font-bold">%</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">{user.trustScore}%</p>
            <p className="text-sm text-slate-600">Score confiança</p>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Configurações da Conta</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <h4 className="font-medium text-slate-900 text-sm">Notificações por E-mail</h4>
              <p className="text-sm text-slate-600">Receber notificações sobre pesquisas e saques</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <h4 className="font-medium text-slate-900 text-sm">Notificações Push</h4>
              <p className="text-sm text-slate-600">Receber notificações no navegador</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;