import React, { useState } from 'react';
import { Search, ShoppingCart, ChevronDown, MapPin, Moon, Sun, Mic, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useLocation } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext';
import Auth from './Auth';

export default function Header() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const { cartItems } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const { currentLocation, setLocationModal } = useLocation();
  const { user, signOut } = useAuth();
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-green-600 dark:text-green-500">Swish</h1>
            <button
              onClick={() => setLocationModal(true)}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Delivery to</span>
              <span className="font-bold">{currentLocation || 'Select Location'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for groceries, electronics, or any product"
                className="w-full pl-10 pr-12 py-2 border border-gray-200 dark:border-gray-700 rounded-lg 
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                          focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleVoiceSearch}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 
                          ${isListening ? 'text-green-600' : 'text-gray-400'}`}
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-green-600">
                  <User className="w-5 h-5" />
                  <span>{user.email}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-green-600"
              >
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            )}

            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="ml-1 bg-white text-green-600 px-2 py-0.5 rounded-full text-sm font-bold">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </header>
  );
}