import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add to cart with default size and color
    dispatch(addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: product.sizes?.[0] || 'M',
      color: product.colors?.[0] || 'Black',
      image: product.images?.[0] || '/placeholder-product.jpg',
    }));
  };

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link to={`/products/${product.id}`}>
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 overflow-hidden relative">
          <img
            src={product.images?.[0] || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/placeholder-product.jpg';
            }}
          />
          
          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Featured
              </span>
            </div>
          )}
          
          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute top-3 right-3">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Out of Stock
              </span>
            </div>
          )}

          {/* Quick Add Button */}
          {product.inStock && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleQuickAdd}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-lg transition-colors duration-200"
              >
                Quick Add
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
              {product.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 0)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating?.toFixed(1) || 'N/A'} ({product.reviewCount || 0})
            </span>
          </div>

          {/* Profession Tags */}
          {product.profession && product.profession.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {product.profession.slice(0, 2).map((prof, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                  >
                    {prof}
                  </span>
                ))}
                {product.profession.length > 2 && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    +{product.profession.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-blue-600">
                ${product.price?.toFixed(2)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Wishlist Button */}
              <button
                className="p-2 text-gray-400 hover:text-pink-500 transition-colors duration-200"
                title="Add to Wishlist"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle wishlist logic here
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Available Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                <span className="text-xs text-gray-500">Sizes:</span>
                {product.sizes.slice(0, 4).map((size, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded"
                  >
                    {size}
                  </span>
                ))}
                {product.sizes.length > 4 && (
                  <span className="text-xs text-gray-500">
                    +{product.sizes.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Available Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-2">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Colors:</span>
                <div className="flex gap-1">
                  {product.colors.slice(0, 4).map((color, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-full border border-gray-300"
                      style={{
                        backgroundColor: getColorValue(color)
                      }}
                      title={color}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <span className="text-xs text-gray-500 ml-1">
                      +{product.colors.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
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
    'Grey': '#808080',
    'Burgundy': '#800020',
    'Red': '#FF0000',
    'Clear': '#F0F0F0',
  };
  
  return colorMap[colorName] || '#CCCCCC';
};

export default ProductCard;