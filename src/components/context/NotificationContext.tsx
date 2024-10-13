"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XMarkIcon,ExclamationTriangleIcon } from '@heroicons/react/20/solid'; // Heroicons

interface Notification {
  message: string;
  type: 'success' | 'error' | 'info'  | 'warning';
  duration?: number; // Optional duration
}

interface NotificationContextProps {
  showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning', duration = 3000) => {
    setNotification({ message, type, duration });
    setIsVisible(true);

    // Automatically hide after the duration unless manually closed
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  };

  const closeNotification = () => {
    setIsVisible(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {isVisible && notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          closeNotification={closeNotification}
        />
      )}
    </NotificationContext.Provider>
  );
};

const Notification = ({ message, type, closeNotification }: Notification & { closeNotification: () => void }) => {
  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  };

  const iconComponents = {
    success: <CheckCircleIcon className="w-6 h-6 text-white" />,
    error: <ExclamationCircleIcon className="w-6 h-6 text-white" />,
    info: <InformationCircleIcon className="w-6 h-6 text-white" />,
    warning: <ExclamationTriangleIcon className="w-6 h-6 text-white" />
  };

  return (
    <div className={`fixed top-5 right-5 p-4 text-white ${typeClasses[type]} rounded flex items-center`}>
      {iconComponents[type]}
      <span className="ml-2">{message}</span>
      <button onClick={closeNotification} className="ml-auto p-1">
        <XMarkIcon className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
