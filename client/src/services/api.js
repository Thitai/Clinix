import axios from 'axios';
import { mockData } from './mockData';

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || true; // Set to false for production

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          
          const newToken = response.data.access;
          localStorage.setItem('token', newToken);
          axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Mock API implementation
const mockAPI = {
  get: async (url, config = {}) => {
    console.log(`Mock API GET: ${url}`, config);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (url.includes('/products/')) {
      if (url.includes('/featured/')) {
        return { data: mockData.featuredProducts };
      } else if (url.includes('/search/')) {
        const query = config.params?.q || '';
        const filtered = mockData.products.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        );
        return { data: { results: filtered, count: filtered.length } };
      } else if (url.match(/\/products\/\d+\/$/)) {
        const productId = parseInt(url.match(/\/products\/(\d+)\//)[1]);
        const product = mockData.products.find(p => p.id === productId);
        if (product) {
          return { data: product };
        } else {
          throw new Error('Product not found');
        }
      } else {
        // List products with pagination and filters
        let filtered = [...mockData.products];
        const { category, profession, sizes, colors, priceRange, inStock } = config.params || {};
        
        if (category) {
          filtered = filtered.filter(p => p.category === category);
        }
        if (profession && profession.length > 0) {
          filtered = filtered.filter(p => profession.some(prof => p.profession.includes(prof)));
        }
        if (sizes && sizes.length > 0) {
          filtered = filtered.filter(p => sizes.some(size => p.sizes.includes(size)));
        }
        if (colors && colors.length > 0) {
          filtered = filtered.filter(p => colors.some(color => p.colors.includes(color)));
        }
        if (priceRange) {
          filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
        }
        if (inStock) {
          filtered = filtered.filter(p => p.inStock);
        }
        
        const page = config.params?.page || 1;
        const pageSize = 12;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        
        return {
          data: {
            results: filtered.slice(start, end),
            count: filtered.length,
            next: end < filtered.length ? page + 1 : null,
            previous: page > 1 ? page - 1 : null,
          }
        };
      }
    }
    
    if (url.includes('/orders/')) {
      return { data: mockData.orders };
    }
    
    if (url.includes('/users/profile/')) {
      return { data: mockData.user };
    }
    
    if (url.includes('/wishlist/')) {
      return { data: mockData.wishlist };
    }
    
    throw new Error(`Mock API: Endpoint not implemented: ${url}`);
  },
  
  post: async (url, data, config = {}) => {
    console.log(`Mock API POST: ${url}`, data);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (url.includes('/auth/login/')) {
      // Mock login
      if (data.email && data.password) {
        return {
          data: {
            access: 'mock-access-token',
            refresh: 'mock-refresh-token',
            user: mockData.user,
          }
        };
      } else {
        throw new Error('Invalid credentials');
      }
    }
    
    if (url.includes('/auth/register/')) {
      // Mock registration
      return {
        data: {
          message: 'Registration successful',
          user: { ...data, id: Date.now() }
        }
      };
    }
    
    if (url.includes('/orders/')) {
      // Mock order creation
      const newOrder = {
        id: Date.now(),
        orderNumber: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        status: 'pending',
        ...data,
        total: data.total || 0,
        trackingNumber: `TRK-${Date.now()}`,
      };
      return { data: newOrder };
    }
    
    if (url.includes('/wishlist/')) {
      // Mock add to wishlist
      return {
        data: {
          id: Date.now(),
          product_id: data.product_id,
          product: mockData.products.find(p => p.id === data.product_id),
        }
      };
    }
    
    throw new Error(`Mock API: Endpoint not implemented: ${url}`);
  },
  
  patch: async (url, data, config = {}) => {
    console.log(`Mock API PATCH: ${url}`, data);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (url.includes('/users/profile/')) {
      return { data: { ...mockData.user, ...data } };
    }
    
    throw new Error(`Mock API: Endpoint not implemented: ${url}`);
  },
  
  delete: async (url, config = {}) => {
    console.log(`Mock API DELETE: ${url}`);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { data: { message: 'Deleted successfully' } };
  }
};

// Export the appropriate API client
export const api = USE_MOCK_DATA ? mockAPI : axiosInstance;

// Export axios instance for direct use if needed
export { axiosInstance };

// API endpoint helpers
export const endpoints = {
  // Products
  products: '/products/',
  productDetail: (id) => `/products/${id}/`,
  featuredProducts: '/products/featured/',
  searchProducts: (query) => `/products/search/?q=${query}`,
  
  // Authentication
  login: '/auth/login/',
  register: '/auth/register/',
  logout: '/auth/logout/',
  refreshToken: '/auth/token/refresh/',
  
  // User
  userProfile: '/users/profile/',
  changePassword: '/users/password/change/',
  
  // Orders
  orders: '/orders/',
  orderDetail: (id) => `/orders/${id}/`,
  trackOrder: (tracking) => `/orders/track/?tracking=${tracking}`,
  
  // Wishlist
  wishlist: '/wishlist/',
  wishlistItem: (id) => `/wishlist/${id}/`,
  
  // Reviews
  productReviews: (productId) => `/products/${productId}/reviews/`,
};

export default api;