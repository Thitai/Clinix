import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  shipping: 0,
  tax: 0,
  discount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, name, price, quantity = 1, size, color, image } = action.payload;
      
      // Check if item with same product, size, and color already exists
      const existingItemIndex = state.items.findIndex(
        item => item.productId === productId && item.size === size && item.color === color
      );
      
      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        const newItem = {
          id: Date.now(), // Simple ID generation
          productId,
          name,
          price,
          quantity,
          size,
          color,
          image,
        };
        state.items.push(newItem);
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      
      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter(item => item.id !== itemId);
        } else {
          item.quantity = quantity;
        }
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      state.shipping = 0;
      state.tax = 0;
      state.discount = 0;
    },
    
    setShipping: (state, action) => {
      state.shipping = action.payload;
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    setDiscount: (state, action) => {
      state.discount = action.payload;
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    calculateTotals: (state) => {
      // Calculate subtotal and item count
      const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      state.itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
      
      // Calculate tax (assuming 8.5% tax rate)
      state.tax = subtotal * 0.085;
      
      // Calculate total
      state.total = subtotal + state.shipping + state.tax - state.discount;
      
      // Ensure total is not negative
      state.total = Math.max(0, state.total);
    },
    
    applyPromoCode: (state, action) => {
      const promoCode = action.payload;
      // Simple promo code logic - in real app, this would call API
      switch (promoCode.toUpperCase()) {
        case 'SAVE10':
          state.discount = state.total * 0.1; // 10% discount
          break;
        case 'HEALTHCARE':
          state.discount = 25; // $25 off
          break;
        case 'FREESHIP':
          state.shipping = 0;
          break;
        default:
          state.discount = 0;
          break;
      }
      cartSlice.caseReducers.calculateTotals(state);
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setShipping,
  setDiscount,
  calculateTotals,
  applyPromoCode
} = cartSlice.actions;

export default cartSlice.reducer;