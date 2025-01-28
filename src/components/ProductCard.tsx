import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Star, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 
                    hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-sm">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-gray-800 dark:text-gray-200">{product.name}</h4>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">{product.weight}</p>
        
        <div className="flex items-center space-x-2">
          <span className="font-bold text-gray-900 dark:text-gray-100">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm
                     ${product.inStock
                       ? isInCart(product.id)
                         ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                         : 'bg-green-600 text-white hover:bg-green-700'
                       : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700'
                     }`}
        >
          {!product.inStock ? (
            'Out of Stock'
          ) : isInCart(product.id) ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}