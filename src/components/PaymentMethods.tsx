import React from 'react';
import { PaymentMethod } from '../types';
import { CreditCard, Smartphone, Wallet, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PaymentMethodsProps {
  methods: PaymentMethod[];
  selectedMethod: string;
  onSelect: (methodId: string) => void;
}

export default function PaymentMethods({ methods, selectedMethod, onSelect }: PaymentMethodsProps) {
  const { user } = useAuth();

  const getIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'upi':
        return <Smartphone className="w-5 h-5" />;
      case 'wallet':
        return <Wallet className="w-5 h-5" />;
      case 'cod':
        return <DollarSign className="w-5 h-5" />;
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <p className="text-center text-gray-600 dark:text-gray-400">
          Please log in to access payment methods
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Payment Methods
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`flex items-center space-x-4 p-4 rounded-lg border ${
              selectedMethod === method.id
                ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className={`p-2 rounded-full ${
              selectedMethod === method.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
            }`}>
              {getIcon(method.type)}
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                {method.name}
              </h4>
              {method.lastUsed && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last used: {new Date(method.lastUsed).toLocaleDateString()}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}