import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters, applyFilters } from '../store/slices/productsSlice';

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.products);
  const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 500]);

  const categories = [
    'Scrubs',
    'Lab Coats',
    'Medical Shoes',
    'Accessories'
  ];

  const professions = [
    'Doctor',
    'Nurse',
    'Medical Assistant',
    'Lab Technician',
    'Pharmacist',
    'Physical Therapist',
    'Veterinarian',
    'Support Staff',
    'Medical Student'
  ];

  const sizes = {
    clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    shoes: ['6', '7', '8', '9', '10', '11', '12']
  };

  const colors = [
    'Navy', 'Black', 'White', 'Teal', 'Wine', 'Royal Blue',
    'Coral', 'Lavender', 'Mint', 'Khaki', 'Light Blue',
    'Gray', 'Burgundy', 'Red'
  ];

  const handleCategoryChange = (category) => {
    dispatch(setFilters({ 
      category: filters.category === category ? null : category 
    }));
  };

  const handleProfessionChange = (profession) => {
    const currentProfessions = filters.profession || [];
    const updatedProfessions = currentProfessions.includes(profession)
      ? currentProfessions.filter(p => p !== profession)
      : [...currentProfessions, profession];
    
    dispatch(setFilters({ profession: updatedProfessions }));
  };

  const handleSizeChange = (size) => {
    const currentSizes = filters.sizes || [];
    const updatedSizes = currentSizes.includes(size)
      ? currentSizes.filter(s => s !== size)
      : [...currentSizes, size];
    
    dispatch(setFilters({ sizes: updatedSizes }));
  };

  const handleColorChange = (color) => {
    const currentColors = filters.colors || [];
    const updatedColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];
    
    dispatch(setFilters({ colors: updatedColors }));
  };

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
    dispatch(setFilters({ priceRange: newRange }));
  };

  const handleInStockChange = (checked) => {
    dispatch(setFilters({ inStock: checked }));
  };

  const handleClearFilters = () => {
    setPriceRange([0, 500]);
    dispatch(clearFilters());
  };

  const hasActiveFilters = () => {
    return (
      filters.category ||
      (filters.profession && filters.profession.length > 0) ||
      (filters.sizes && filters.sizes.length > 0) ||
      (filters.colors && filters.colors.length > 0) ||
      filters.inStock ||
      (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 500))
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters() && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Profession */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Profession</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {professions.map((profession) => (
              <label key={profession} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(filters.profession || []).includes(profession)}
                  onChange={() => handleProfessionChange(profession)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-gray-700">{profession}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">${priceRange[0]}</span>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange([parseInt(e.target.value), priceRange[1]])}
                className="flex-1"
              />
              <span className="text-sm text-gray-500">${priceRange[1]}</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                max="500"
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Min"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value) || 500])}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-2">Clothing</h4>
              <div className="grid grid-cols-3 gap-2">
                {sizes.clothing.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-2 py-1 text-xs border rounded ${
                      (filters.sizes || []).includes(size)
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-2">Shoes</h4>
              <div className="grid grid-cols-3 gap-2">
                {sizes.shoes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-2 py-1 text-xs border rounded ${
                      (filters.sizes || []).includes(size)
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`flex flex-col items-center p-2 border rounded-lg hover:border-gray-400 ${
                  (filters.colors || []).includes(color)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300'
                }`}
                title={color}
              >
                <div
                  className="w-6 h-6 rounded-full border border-gray-300 mb-1"
                  style={{
                    backgroundColor: getColorValue(color)
                  }}
                />
                <span className="text-xs text-gray-700 truncate w-full text-center">
                  {color}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Availability</h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock || false}
              onChange={(e) => handleInStockChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-sm text-gray-700">In stock only</span>
          </label>
        </div>
      </div>
    </div>
  );
};

// Helper function to get color values for color swatches
const getColorValue = (colorName) => {
  const colorMap = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Navy': '#001f3f',
    'Blue': '#0074D9',
    'Royal Blue': '#4169E1',
    'Teal': '#008080',
    'Wine': '#722F37',
    'Coral': '#FF7F50',
    'Lavender': '#E6E6FA',
    'Mint': '#98FB98',
    'Khaki': '#F0E68C',
    'Light Blue': '#ADD8E6',
    'Gray': '#808080',
    'Burgundy': '#800020',
    'Red': '#FF0000',
  };
  
  return colorMap[colorName] || '#CCCCCC';
};

export default FilterSidebar;