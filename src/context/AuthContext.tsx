import React, { createContext, useContext, useState, useEffect } from 'react';
import { findDocuments, insertDocument, updateDocument } from '../lib/mongodb';

interface User {
  _id?: string;
  email: string;
  password: string; // In production, this should be properly hashed
  name?: string;
  preferences?: {
    language: string;
    currency: string;
    notifications: {
      orderUpdates: boolean;
      promotions: boolean;
      recommendations: boolean;
    };
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      // Check if user exists
      const existingUsers = await findDocuments<User>('users', { email });
      if (existingUsers.length > 0) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser: User = {
        email,
        password, // In production, hash this password
        preferences: {
          language: 'en',
          currency: 'INR',
          notifications: {
            orderUpdates: true,
            promotions: true,
            recommendations: true,
          },
        },
      };

      const result = await insertDocument<User>('users', newUser);
      setUser(result);
      localStorage.setItem('user', JSON.stringify(result));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const users = await findDocuments<User>('users', { email, password });
      if (users.length === 0) {
        throw new Error('Invalid credentials');
      }

      const user = users[0];
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}