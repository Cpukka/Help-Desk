'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';
import toast from 'react-hot-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  referenceId?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addNotification = useCallback((notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
    
    const toastFn = {
      info: toast,
      success: toast.success,
      warning: toast.error,
      error: toast.error,
    }[notification.type] || toast;
    
    toastFn(notification.message, {
      duration: 5000,
      icon: notification.type === 'info' ? '🔔' : 
            notification.type === 'success' ? '✅' :
            notification.type === 'warning' ? '⚠️' : '❌',
    });
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, isRead: true }))
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5252/api';
    const hubUrl = apiUrl.replace('/api', '') + '/hubs/notifications';

    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    hubConnection.start()
      .then(() => {
        console.log('SignalR Connected');
        
        hubConnection.on('ReceiveNotification', (notification: Notification) => {
          addNotification(notification);
        });

        hubConnection.on('TicketUpdated', (data: any) => {
          addNotification({
            id: data.id || Date.now().toString(),
            title: 'Ticket Updated',
            message: 'Ticket #' + data.ticketId + ' has been updated: ' + data.message,
            type: 'info',
            isRead: false,
            createdAt: new Date().toISOString(),
            referenceId: data.ticketId,
          });
        });
      })
      .catch((err) => {
        console.error('SignalR Connection Error:', err);
      });

    setConnection(hubConnection);

    return () => {
      hubConnection.stop();
    };
  }, [addNotification]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
