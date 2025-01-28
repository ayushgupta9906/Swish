import React from 'react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 
                    hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-32 object-cover rounded-lg transform group-hover:scale-105 transition-transform"
            />
            {category.featured && (
              <span className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                Featured
              </span>
            )}
          </div>
          <div className="mt-4 text-center">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">{category.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{category.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}