# Clinix Couture - Premium Medical Apparel Ecommerce

A modern, professional ecommerce website for premium medical apparel built with React, Redux Toolkit, and designed for integration with Django REST Framework backend.

## 🎨 Design System

### Color Palette
- **Primary**: `#0077B6` (Medical Blue) - Professional, trustworthy
- **Secondary**: `#90E0EF` (Sky Blue) - Calm, soothing
- **Accent**: `#F72585` (Hot Pink) - Energetic, modern
- **Neutral**: `#FAFAFA` (Light Gray) - Clean background
- **Text**: `#023047` (Navy) - Strong readability

## 🚀 Tech Stack

- **React 18+** with JavaScript/JSX
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Vite** as build tool
- **Tailwind CSS** for styling
- **Shadcn/UI** for component library
- **Lucide React** for icons
- **Axios** for API calls

## 📁 Project Structure

```
/
├── App.tsx                          # Main app with routing
├── store/
│   ├── store.js                     # Redux store configuration
│   └── slices/
│       ├── productsSlice.js         # Products state management
│       ├── cartSlice.js             # Shopping cart state
│       ├── userSlice.js             # User authentication state
│       └── ordersSlice.js           # Orders state management
├── services/
│   ├── api.js                       # API client & endpoints
│   └── mockData.js                  # Mock data for development
├── pages/
│   ├── HomePage.jsx                 # Landing page
│   ├── ProductListingPage.jsx      # Product catalog with filters
│   ├── ProductDetailPage.jsx       # Individual product details
│   ├── CartPage.jsx                # Shopping cart
│   ├── CheckoutPage.jsx            # Multi-step checkout
│   ├── AccountPage.jsx             # User account management
│   ├── OrderHistoryPage.jsx        # Order history
│   ├── LoginPage.jsx               # Login/Register
│   └── OrderConfirmationPage.jsx   # Order success page
├── components/
│   ├── Header.jsx                   # Main navigation header
│   ├── Footer.jsx                   # Site footer
│   ├── ProductCard.jsx              # Product card component
│   ├── FilterSidebar.jsx            # Product filters
│   └── ui/                          # Shadcn UI components
└── styles/
    └── globals.css                  # Global styles & theme
```

## 🔌 Django API Integration

The application is designed to connect to a Django REST Framework backend. Update the API base URL in `/services/api.js`:

```javascript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000/api';
```

### Expected Django Endpoints

#### Products
- `GET /api/products/` - List all products (with pagination & filters)
- `GET /api/products/{id}/` - Get product details
- `GET /api/products/featured/` - Get featured products
- `GET /api/products/search/?q={query}` - Search products

#### Authentication (JWT)
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `POST /api/auth/logout/` - User logout
- `POST /api/auth/token/refresh/` - Refresh JWT token

#### User
- `GET /api/users/profile/` - Get user profile
- `PATCH /api/users/profile/` - Update user profile
- `POST /api/users/password/change/` - Change password

#### Orders
- `GET /api/orders/` - List user orders
- `GET /api/orders/{id}/` - Get order details
- `POST /api/orders/` - Create new order

#### Wishlist
- `GET /api/wishlist/` - Get user wishlist
- `POST /api/wishlist/` - Add to wishlist
- `DELETE /api/wishlist/{id}/` - Remove from wishlist

#### Reviews
- `GET /api/products/{id}/reviews/` - Get product reviews
- `POST /api/products/{id}/reviews/` - Create review

## 📊 Redux State Structure

### Products Slice
```javascript
{
  items: [],              // All products
  filteredItems: [],      // Filtered products
  featuredProducts: [],   // Featured products
  currentProduct: null,   // Selected product details
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
  pagination: { currentPage: 1, totalPages: 1, pageSize: 12 }
}
```

### Cart Slice
```javascript
{
  items: [],              // Cart items
  total: 0,               // Subtotal
  itemCount: 0,           // Total items
  shipping: 0,
  tax: 0,
  discount: 0,
}
```

### User Slice
```javascript
{
  currentUser: null,      // User profile data
  isAuthenticated: false,
  token: null,            // JWT token
  wishlist: [],           // Product IDs
  loading: false,
  error: null,
}
```

### Orders Slice
```javascript
{
  orders: [],             // Order history
  currentOrder: null,     // Current/recent order
  loading: false,
  error: null,
}
```

## 🎯 Key Features

### Product Catalog
- Product categories: Scrubs, Lab Coats, Medical Shoes, Accessories
- Advanced filtering by profession, size, color, price
- Product search functionality
- Sort by: Featured, Price, Rating, Newest
- Grid/List view modes
- Pagination

### Shopping Experience
- Add to cart with size/color selection
- Shopping cart with quantity management
- Wishlist functionality
- Product reviews & ratings
- Related products

### Checkout Process
- Multi-step checkout (Shipping → Payment → Review)
- Address management
- Payment method selection
- Order confirmation

### User Account
- Profile management
- Order history with tracking
- Saved addresses
- Wishlist management
- Password change

## 🔐 Authentication Flow

1. User logs in via `/login`
2. JWT token stored in localStorage
3. Token added to all API requests via Axios interceptor
4. Auto-redirect to login on 401 responses
5. Token refresh handled automatically

## 🎨 UI Components (Shadcn)

The project uses Shadcn UI components:
- Button, Input, Label
- Card, Badge, Separator
- Dialog, Sheet, Tabs
- Select, Checkbox, Radio Group
- Slider, Pagination
- Accordion, Tooltip
- And more...

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set environment variables
# Create .env file with:
VITE_API_URL=http://localhost:8000/api

# Run development server
npm run dev

# Build for production
npm run build
```

### Mock Data Mode

The application includes mock data for development. Toggle mock mode in `/services/api.js`:

```javascript
const USE_MOCK_DATA = true; // Set to false for production
```

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Mobile navigation drawer
- Optimized for all screen sizes

## 🔒 Security Features

- JWT authentication
- Secure payment indicators
- HTTPS ready
- Input validation
- CSRF protection (Django backend)

## 📦 Data Structures

### Product Object
```javascript
{
  id: number,
  name: string,
  description: string,
  price: number,
  category: string,
  profession: string[],
  sizes: string[],
  colors: string[],
  images: string[],
  rating: number,
  reviewCount: number,
  inStock: boolean,
  featured: boolean,
}
```

### Cart Item Object
```javascript
{
  id: number,
  productId: number,
  name: string,
  price: number,
  quantity: number,
  size: string,
  color: string,
  image: string,
}
```

### Order Object
```javascript
{
  id: number,
  orderNumber: string,
  date: string,
  status: string,
  items: CartItem[],
  subtotal: number,
  shipping: number,
  tax: number,
  total: number,
  shippingAddress: Address,
  trackingNumber: string,
}
```

## 🎯 Future Enhancements

- Live chat support
- Product recommendations
- Bulk ordering for organizations
- Gift cards
- Loyalty program
- Advanced analytics
- Multi-language support
- Currency conversion

## 📄 License

This project is proprietary software for Clinix Couture.

## 👥 Contributing

For contribution guidelines, please contact the development team.

---

Built with ❤️ for healthcare professionals worldwide.
