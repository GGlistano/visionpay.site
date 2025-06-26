import React, { useState, useEffect } from 'react';
import { LogOut, User, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import NotificationPanel from './NotificationPanel';

const DashboardHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Check for unread notifications
    const notifications = JSON.parse(localStorage.getItem('user_notifications') || '[]');
    const unread = notifications.filter((n: any) => !n.read).length;
    setUnreadCount(unread);
  }, [showNotifications]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {getGreeting()}, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-sm text-slate-600">
                Sequência de login: {user?.dailyLoginStreak} dias
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              
              <NotificationPanel 
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
              />
            </div>
            
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;