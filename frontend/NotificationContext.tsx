'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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
  isConnected: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const connectionRef = useRef<signalR.HubConnection | null>(null);

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

  const stopConnection = useCallback(async () => {
    if (connectionRef.current) {
      try {
        await connectionRef.current.stop();
        connectionRef.current = null;
        setIsConnected(false);
        console.log('🔌 SignalR disconnected');
      } catch (error) {
        console.error('Error stopping SignalR connection:', error);
      }
    }
  }, []);

  const startConnection = useCallback(async () => {
    await stopConnection();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.log('No token found, skipping SignalR connection');
      return;
    }

    const hubUrl = process.env.NEXT_PUBLIC_SIGNALR_URL || 'http://localhost:5252/hubs/notifications';
    
    console.log('🔗 Connecting to SignalR hub:', hubUrl);

    if (hubUrl.includes('localhost')) {
      console.warn('⚠️ SignalR is using localhost. Set NEXT_PUBLIC_SIGNALR_URL for production.');
      return;
    }

    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => {
          const token = localStorage.getItem('accessToken');
          return token || '';
        },
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    hubConnection.on('ReceiveNotification', (notification: Notification) => {
      console.log('📨 Received notification:', notification);
      addNotification(notification);
    });

    hubConnection.on('TicketUpdated', (data: any) => {
      console.log('📨 Ticket updated:', data);
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

    hubConnection.onreconnecting((error) => {
      console.warn('🔄 SignalR reconnecting...', error);
      setIsConnected(false);
    });

    hubConnection.onreconnected((connectionId) => {
      console.log('✅ SignalR reconnected. Connection ID:', connectionId);
      setIsConnected(true);
    });

    hubConnection.onclose((error) => {
      console.warn('🔌 SignalR closed.', error);
      setIsConnected(false);
    });

    try {
      await hubConnection.start();
      console.log('✅ SignalR Connected successfully');
      setIsConnected(true);
    } catch (error) {
      console.error('❌ SignalR Connection Error:', error);
      setIsConnected(false);
      
      setTimeout(() => {
        if (connectionRef.current?.state === signalR.HubConnectionState.Disconnected) {
          console.log('🔄 Attempting to reconnect...');
          startConnection().catch(e => console.error('Reconnect failed:', e));
        }
      }, 5000);
    }

    connectionRef.current = hubConnection;
  }, [addNotification, stopConnection]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      startConnection();
    } else {
      stopConnection();
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'accessToken') {
        if (event.newValue) {
          startConnection();
        } else {
          stopConnection();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const handleAuthChange = () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        startConnection();
      } else {
        stopConnection();
      }
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
      stopConnection();
    };
  }, [startConnection, stopConnection]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        isConnected,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// ✅ This export MUST exist for the component to work
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
