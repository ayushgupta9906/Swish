import { Category, Product, Order, PaymentMethod } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Groceries',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80',
    description: 'Fresh fruits, vegetables & daily essentials',
    featured: true
  },
  {
    id: '2',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=300&q=80',
    description: 'Gadgets, accessories & more',
    featured: true
  },
  {
    id: '3',
    name: 'Personal Care',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=300&q=80',
    description: 'Beauty, hygiene & wellness products',
    featured: false
  },
  {
    id: '4',
    name: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80',
    description: 'Appliances, cleaning & organization',
    featured: false
  },
  {
    id: '5',
    name: 'Baby Care',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=300&q=80',
    description: 'Diapers, food & baby essentials',
    featured: false
  },
  {
    id: '6',
    name: 'Pet Supplies',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=300&q=80',
    description: 'Food, toys & pet care items',
    featured: false
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    description: 'Fresh organic bananas from local farms',
    price: 2.99,
    originalPrice: 3.99,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=300&q=80',
    category: 'Groceries',
    brand: 'Fresh Farms',
    inStock: true,
    rating: 4.5,
    numReviews: 128,
    tags: ['organic', 'fruit', 'fresh'],
    isFeatured: true
  },
  {
    id: '2',
    name: 'Wireless Earbuds',
    description: 'Premium wireless earbuds with noise cancellation',
    price: 49.99,
    originalPrice: 69.99,
    weight: '50g',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80',
    category: 'Electronics',
    brand: 'TechPro',
    inStock: true,
    rating: 4.8,
    numReviews: 356,
    tags: ['electronics', 'audio', 'wireless'],
    isFeatured: true
  },
  {
    id: '3',
    name: 'Face Moisturizer',
    description: 'Hydrating face cream for all skin types',
    price: 19.99,
    originalPrice: 24.99,
    weight: '100ml',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=300&q=80',
    category: 'Personal Care',
    brand: 'GlowUp',
    inStock: true,
    rating: 4.6,
    numReviews: 892,
    tags: ['skincare', 'beauty', 'personal care'],
    isFeatured: true
  },
  {
    id: '4',
    name: 'Smart Watch',
    description: 'Fitness tracking and notifications',
    price: 129.99,
    originalPrice: 159.99,
    weight: '45g',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=300&q=80',
    category: 'Electronics',
    brand: 'TechPro',
    inStock: true,
    rating: 4.7,
    numReviews: 445,
    tags: ['electronics', 'wearable', 'fitness'],
    isFeatured: true
  },
  {
    id: '5',
    name: 'Hand Sanitizer',
    description: 'Kills 99.9% of germs',
    price: 3.99,
    originalPrice: 4.99,
    weight: '250ml',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=300&q=80',
    category: 'Personal Care',
    brand: 'HealthGuard',
    inStock: true,
    rating: 4.4,
    numReviews: 223,
    tags: ['hygiene', 'personal care', 'health'],
    isFeatured: true
  }
];

export const sampleOrder: Order = {
  id: 'ORD123456',
  items: [products[0], products[1]].map(product => ({ ...product, quantity: 1 })),
  total: 52.98,
  status: 'out_for_delivery',
  deliveryAddress: {
    id: 'ADDR1',
    type: 'home',
    street: '123 Main Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    isDefault: true
  },
  paymentMethod: 'upi',
  createdAt: '2024-03-15T10:30:00Z',
  estimatedDeliveryTime: '10 minutes',
  trackingSteps: [
    {
      status: 'Order Placed',
      timestamp: '10:30 AM',
      description: 'Your order has been confirmed',
      completed: true
    },
    {
      status: 'Order Packed',
      timestamp: '10:32 AM',
      description: 'Items have been packed',
      completed: true
    },
    {
      status: 'Out for Delivery',
      timestamp: '10:35 AM',
      description: 'Delivery partner is on the way',
      completed: true
    },
    {
      status: 'Arriving Soon',
      timestamp: '10:40 AM',
      description: 'Your order will arrive in 5 minutes',
      completed: false
    }
  ]
};

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'upi',
    type: 'upi',
    name: 'UPI Payment',
    icon: 'smartphone'
  },
  {
    id: 'card',
    type: 'card',
    name: 'Credit/Debit Card',
    icon: 'credit-card'
  },
  {
    id: 'wallet',
    type: 'wallet',
    name: 'Digital Wallet',
    icon: 'wallet'
  },
  {
    id: 'cod',
    type: 'cod',
    name: 'Cash on Delivery',
    icon: 'dollar-sign'
  }
];