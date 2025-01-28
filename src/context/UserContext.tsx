import React, { createContext, useContext, useState } from 'react';
import { User, Address, Notification, SupportTicket } from '../types';

interface UserContextType {
  user: User | null;
  addresses: Address[];
  notifications: Notification[];
  supportTickets: SupportTicket[];
  addAddress: (address: Address) => void;
  updateAddress: (id: string, address: Address) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  updateProfile: (updates: Partial<User>) => void;
  updatePreferences: (preferences: User['preferences']) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  createSupportTicket: (ticket: Omit<SupportTicket, 'id'>) => void;
  updateSupportTicket: (id: string, updates: Partial<SupportTicket>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);

  const addAddress = (address: Address) => {
    setAddresses(prev => [...prev, address]);
  };

  const updateAddress = (id: string, address: Address) => {
    setAddresses(prev => prev.map(addr => addr.id === id ? address : addr));
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const updateProfile = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const updatePreferences = (preferences: User['preferences']) => {
    setUser(prev => prev ? { ...prev, preferences } : null);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const createSupportTicket = (ticket: Omit<SupportTicket, 'id'>) => {
    const newTicket = {
      ...ticket,
      id: Math.random().toString(36).substr(2, 9)
    };
    setSupportTickets(prev => [...prev, newTicket]);
  };

  const updateSupportTicket = (id: string, updates: Partial<SupportTicket>) => {
    setSupportTickets(prev => prev.map(ticket =>
      ticket.id === id ? { ...ticket, ...updates } : ticket
    ));
  };

  return (
    <UserContext.Provider value={{
      user,
      addresses,
      notifications,
      supportTickets,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
      updateProfile,
      updatePreferences,
      markNotificationAsRead,
      clearNotifications,
      createSupportTicket,
      updateSupportTicket
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}