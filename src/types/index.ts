export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  weight: string;
  image: string;
  category: string;
  brand: string;
  inStock: boolean;
  rating: number;
  numReviews: number;
  tags: string[];
  isFeatured?: boolean;
  bulkDiscounts?: BulkDiscount[];
  reviews: Review[];
}

export interface BulkDiscount {
  quantity: number;
  discountPercentage: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
  helpful: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  featured: boolean;
  subcategories?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  orders: Order[];
  preferences: UserPreferences;
  wallet: Wallet;
  notifications: Notification[];
}

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: {
    orderUpdates: boolean;
    promotions: boolean;
    recommendations: boolean;
  };
  dietary?: string[];
}

export interface Wallet {
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  landmark?: string;
  instructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  deliveryAddress: Address;
  paymentMethod: string;
  createdAt: string;
  scheduledFor?: string;
  estimatedDeliveryTime: string;
  trackingSteps: TrackingStep[];
  invoice?: string;
  couponApplied?: Coupon;
  refund?: RefundDetails;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface RefundDetails {
  status: 'pending' | 'processing' | 'completed';
  amount: number;
  reason: string;
  initiatedAt: string;
  completedAt?: string;
  refundedTo: string;
}

export interface TrackingStep {
  status: string;
  timestamp: string;
  description: string;
  completed: boolean;
  location?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'wallet' | 'cod' | 'netbanking';
  name: string;
  icon: string;
  lastUsed?: string;
  savedDetails?: any;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder?: number;
  maxDiscount?: number;
  validUntil: string;
  categories?: string[];
  description: string;
}

export interface Notification {
  id: string;
  type: 'order' | 'promotion' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
  action?: {
    type: string;
    payload: any;
  };
}

export interface SupportTicket {
  id: string;
  userId: string;
  orderId?: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  messages: SupportMessage[];
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  sender: 'user' | 'support';
  message: string;
  timestamp: string;
  attachments?: string[];
}