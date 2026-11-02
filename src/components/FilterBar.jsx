import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { Filter, RotateCcw } from 'lucide-react';

export const FilterBar = ({
  selectedCategory,
  onSelectCategory,
  selectedPrice,
  onSelectPrice,
  selectedLocation,
  onSelectLocation,
  sortBy,
  onSelectSort,
  onReset,
  totalResults
}) => {
  const locations = ["All Locations", "Chennai", "Bengaluru", "Mumbai"];

  return (
    <div className="space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 rounded-2xl shadow-sm mb-8 transition-colors">
      
      {/* Category Pills Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dropdown Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Price Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-medium">
            {['All', 'Free', 'Paid'].map((p) => (
              <button
                key={p}
                onClick={() => onSelectPrice(p.toLowerCase())}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedPrice === p.toLowerCase()
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {p === 'All' ? 'All Prices' : p}
              </button>
            ))}
          </div>

          {/* Location Dropdown */}
          <select
            value={selectedLocation}
            onChange={(e) => onSelectLocation(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none"
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSelectSort(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none"
          >
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Clear & Result Count */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            <strong className="text-slate-900 dark:text-white">{totalResults}</strong> events found
          </span>

          <button
            onClick={onReset}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default FilterBar;
