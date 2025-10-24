import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

// Async thunks for API calls
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, filters = {} } = {}) => {
    const response = await api.get(`/products/`, { params: { page, ...filters } });
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => {
    const response = await api.get(`/products/${productId}/`);
    return response.data;
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async () => {
    const response = await api.get('/products/featured/');
    return response.data;
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query) => {
    const response = await api.get(`/products/search/?q=${query}`);
    return response.data;
  }
);

const initialState = {
  items: [],
  filteredItems: [],
  featuredProducts: [],
  currentProduct: null,
  filters: {
    category: null,
    profession: [],
    sizes: [],
    colors: [],
    priceRange: [0, 500],
    inStock: false,
  },
  searchQuery: '',
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 12
  }
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredItems = state.items;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearchQuery: (state) => {
      state.searchQuery = '';
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    applyFilters: (state) => {
      let filtered = [...state.items];
      
      // Apply category filter
      if (state.filters.category) {
        filtered = filtered.filter(product => product.category === state.filters.category);
      }
      
      // Apply profession filter
      if (state.filters.profession.length > 0) {
        filtered = filtered.filter(product => 
          state.filters.profession.some(prof => product.profession.includes(prof))
        );
      }
      
      // Apply size filter
      if (state.filters.sizes.length > 0) {
        filtered = filtered.filter(product => 
          state.filters.sizes.some(size => product.sizes.includes(size))
        );
      }
      
      // Apply color filter
      if (state.filters.colors.length > 0) {
        filtered = filtered.filter(product => 
          state.filters.colors.some(color => product.colors.includes(color))
        );
      }
      
      // Apply price range filter
      filtered = filtered.filter(product => 
        product.price >= state.filters.priceRange[0] && 
        product.price <= state.filters.priceRange[1]
      );
      
      // Apply stock filter
      if (state.filters.inStock) {
        filtered = filtered.filter(product => product.inStock);
      }
      
      state.filteredItems = filtered;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results || action.payload;
        state.filteredItems = action.payload.results || action.payload;
        if (action.payload.count) {
          state.pagination.totalPages = Math.ceil(action.payload.count / state.pagination.pageSize);
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Fetch featured products
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload;
      })
      
      // Search products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredItems = action.payload.results || action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setSearchQuery,
  clearSearchQuery,
  setCurrentPage,
  applyFilters
} = productsSlice.actions;

export default productsSlice.reducer;