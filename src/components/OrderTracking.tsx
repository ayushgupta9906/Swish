import React, { useEffect, useState } from 'react';
import { Order, TrackingStep } from '../types';
import { CheckCircle, Circle } from 'lucide-react';
import { watchOrderUpdates } from '../lib/mongodb';
import { useAuth } from '../context/AuthContext';

interface OrderTrackingProps {
  order: Order;
}

export default function OrderTracking({ order }: OrderTrackingProps) {
  const { user } = useAuth();
  const [currentOrder, setCurrentOrder] = useState(order);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = watchOrderUpdates(order.id, (updatedOrder) => {
      setCurrentOrder(updatedOrder);
    });

    return () => unsubscribe();
  }, [order.id, user]);

  if (!user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <p className="text-center text-gray-600 dark:text-gray-400">
          Please log in to track your order
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Order #{currentOrder.id}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Estimated Delivery: {currentOrder.estimatedDeliveryTime}
        </span>
      </div>

      <div className="space-y-6">
        {currentOrder.trackingSteps.map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            {step.completed ? (
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400 flex-shrink-0" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium ${
                  step.completed ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500'
                }`}>
                  {step.status}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {step.timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {step.description}
              </p>
              {step.location && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  📍 {step.location}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">
          Delivery Address
        </h4>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>{currentOrder.deliveryAddress.street}</p>
          <p>{currentOrder.deliveryAddress.city}, {currentOrder.deliveryAddress.state}</p>
          <p>{currentOrder.deliveryAddress.pincode}</p>
        </div>
      </div>

      {currentOrder.paymentMethod && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">
            Payment Information
          </h4>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Method: {currentOrder.paymentMethod}</p>
            <p>Total: ₹{currentOrder.total.toFixed(2)}</p>
            {currentOrder.couponApplied && (
              <p className="text-green-600 dark:text-green-400">
                Coupon Applied: {currentOrder.couponApplied.code}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}