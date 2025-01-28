import React from 'react';
import Header from './components/Header';
import CategoryGrid from './components/CategoryGrid';
import ProductCard from './components/ProductCard';
import OrderTracking from './components/OrderTracking';
import PaymentMethods from './components/PaymentMethods';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { LocationProvider } from './context/LocationContext';
import { AuthProvider } from './context/AuthContext';
import { categories, products, sampleOrder, paymentMethods } from './data';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <LocationProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Header />

              {/* Hero Section */}
              <div className="bg-green-50 dark:bg-green-900/20 py-12">
                <div className="container mx-auto px-4">
                  <div className="flex items-center justify-between">
                    <div className="max-w-xl">
                      <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        10-Minute Delivery
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        Get your groceries, electronics, and essentials delivered to your doorstep in minutes.
                      </p>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
                      alt="Fresh groceries"
                      className="rounded-lg shadow-lg w-[400px] hidden md:block"
                    />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <section className="py-12">
                <div className="container mx-auto px-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    Shop by Category
                  </h3>
                  <CategoryGrid categories={categories} />
                </div>
              </section>

              {/* Featured Products */}
              <section className="bg-white dark:bg-gray-800 py-12">
                <div className="container mx-auto px-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    Featured Products
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Order Tracking */}
              <section className="py-12">
                <div className="container mx-auto px-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    Live Order Tracking
                  </h3>
                  <OrderTracking order={sampleOrder} />
                </div>
              </section>

              {/* Payment Methods */}
              <section className="bg-white dark:bg-gray-800 py-12">
                <div className="container mx-auto px-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    Multiple Payment Options
                  </h3>
                  <PaymentMethods
                    methods={paymentMethods}
                    selectedMethod="upi"
                    onSelect={() => {}}
                  />
                </div>
              </section>

              {/* Footer */}
              <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                      <h5 className="text-lg font-bold mb-4">Swish</h5>
                      <p className="text-gray-400">
                        Your favorite products delivered in minutes.
                      </p>
                    </div>
                    <div>
                      <h5 className="text-lg font-bold mb-4">Quick Links</h5>
                      <ul className="space-y-2 text-gray-400">
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Partner with us</li>
                        <li>Blog</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-lg font-bold mb-4">Categories</h5>
                      <ul className="space-y-2 text-gray-400">
                        <li>Groceries</li>
                        <li>Electronics</li>
                        <li>Personal Care</li>
                        <li>Home Essentials</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-lg font-bold mb-4">Support</h5>
                      <ul className="space-y-2 text-gray-400">
                        <li>Help Center</li>
                        <li>Terms of Service</li>
                        <li>Privacy Policy</li>
                        <li>Contact Us</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </LocationProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;