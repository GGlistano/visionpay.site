import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertCircle, DollarSign, User, Clock } from 'lucide-react';

interface Notification {
  id: number;
  type: 'survey_available' | 'withdrawal_request' | 'trust_score' | 'profile_update' | 'payment_verified' | 'general';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    loadNotifications();
  }, [isOpen]);

  const loadNotifications = () => {
    const stored = localStorage.getItem('user_notifications');
    if (stored) {
      const parsed = JSON.parse(stored).map((n: any) => ({
        ...n,
        timestamp: new Date(n.timestamp)
      }));
      setNotifications(parsed);
    } else {
      // Initialize with some default notifications
      const defaultNotifications: Notification[] = [
        {
          id: 1,
          type: 'general',
          title: 'Bem-vindo à Plataforma!',
          message: 'Complete seu perfil para receber pesquisas personalizadas.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          read: false
        },
        {
          id: 2,
          type: 'trust_score',
          title: 'Score de Confiança',
          message: 'Continue respondendo pesquisas para aumentar seu score e liberar saques.',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
          read: false
        }
      ];
      setNotifications(defaultNotifications);
      localStorage.setItem('user_notifications', JSON.stringify(defaultNotifications));
    }
  };

  const markAsRead = (id: number) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem('user_notifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('user_notifications', JSON.stringify(updated));
  };

  const deleteNotification = (id: number) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('user_notifications', JSON.stringify(updated));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'survey_available':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'withdrawal_request':
        return <DollarSign className="w-5 h-5 text-blue-500" />;
      case 'trust_score':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'profile_update':
        return <User className="w-5 h-5 text-purple-500" />;
      case 'payment_verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d atrás`;
    if (hours > 0) return `${hours}h atrás`;
    if (minutes > 0) return `${minutes}m atrás`;
    return 'Agora';
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Notificações</h3>
          <div className="flex items-center space-x-2">
            {notifications.some(n => !n.read) && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-slate-600 hover:text-slate-900"
              >
                Marcar todas como lidas
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Nenhuma notificação</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-slate-50 transition-colors ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-medium ${
                        !notification.read ? 'text-slate-900' : 'text-slate-700'
                      }`}>
                        {notification.title}
                      </h4>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(notification.timestamp)}
                      </span>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Marcar como lida
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;