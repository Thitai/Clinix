// Mock data for development and testing

export const mockData = {
  // Featured products
  featuredProducts: [
    {
      id: 1,
      name: "Premium Unisex Scrub Set",
      description: "Comfortable, breathable scrubs perfect for long shifts",
      price: 89.99,
      category: "Scrubs",
      profession: ["Nurse", "Doctor", "Veterinarian"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "Teal", "Black", "Wine"],
      images: [
        "/images/scrubs-premium-navy.jpg",
        "/images/scrubs-premium-teal.jpg"
      ],
      rating: 4.8,
      reviewCount: 342,
      inStock: true,
      featured: true,
    },
    {
      id: 2,
      name: "Classic White Lab Coat",
      description: "Professional lab coat with multiple pockets",
      price: 124.99,
      category: "Lab Coats",
      profession: ["Doctor", "Lab Technician", "Pharmacist"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["White"],
      images: [
        "/images/labcoat-classic-white.jpg"
      ],
      rating: 4.6,
      reviewCount: 189,
      inStock: true,
      featured: true,
    },
    {
      id: 3,
      name: "Non-Slip Medical Clogs",
      description: "Comfortable, easy-to-clean medical footwear",
      price: 79.99,
      category: "Medical Shoes",
      profession: ["Nurse", "Doctor", "Support Staff"],
      sizes: ["6", "7", "8", "9", "10", "11", "12"],
      colors: ["White", "Black", "Navy"],
      images: [
        "/images/clogs-white.jpg",
        "/images/clogs-black.jpg"
      ],
      rating: 4.5,
      reviewCount: 267,
      inStock: true,
      featured: true,
    },
  ],

  // All products
  products: [
    {
      id: 1,
      name: "Premium Unisex Scrub Set",
      description: "Comfortable, breathable scrubs perfect for long shifts. Made with high-quality fabric blend that resists stains and maintains color wash after wash.",
      price: 89.99,
      category: "Scrubs",
      profession: ["Nurse", "Doctor", "Veterinarian"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "Teal", "Black", "Wine"],
      images: [
        "/images/scrubs-premium-navy.jpg",
        "/images/scrubs-premium-teal.jpg"
      ],
      rating: 4.8,
      reviewCount: 342,
      inStock: true,
      featured: true,
    },
    {
      id: 2,
      name: "Classic White Lab Coat",
      description: "Professional lab coat with multiple pockets for all your tools. Features a tailored fit and durable construction.",
      price: 124.99,
      category: "Lab Coats",
      profession: ["Doctor", "Lab Technician", "Pharmacist"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["White"],
      images: [
        "/images/labcoat-classic-white.jpg"
      ],
      rating: 4.6,
      reviewCount: 189,
      inStock: true,
      featured: true,
    },
    {
      id: 3,
      name: "Non-Slip Medical Clogs",
      description: "Comfortable, easy-to-clean medical footwear with superior grip and arch support for all-day comfort.",
      price: 79.99,
      category: "Medical Shoes",
      profession: ["Nurse", "Doctor", "Support Staff"],
      sizes: ["6", "7", "8", "9", "10", "11", "12"],
      colors: ["White", "Black", "Navy"],
      images: [
        "/images/clogs-white.jpg",
        "/images/clogs-black.jpg"
      ],
      rating: 4.5,
      reviewCount: 267,
      inStock: true,
      featured: true,
    },
    {
      id: 4,
      name: "Fashionable Scrub Top",
      description: "Stylish v-neck scrub top with modern fit and moisture-wicking technology.",
      price: 45.99,
      category: "Scrubs",
      profession: ["Nurse", "Medical Assistant"],
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Coral", "Lavender", "Mint", "Royal Blue"],
      images: [
        "/images/scrub-top-coral.jpg",
        "/images/scrub-top-lavender.jpg"
      ],
      rating: 4.4,
      reviewCount: 156,
      inStock: true,
      featured: false,
    },
    {
      id: 5,
      name: "Cargo Scrub Pants",
      description: "Comfortable scrub pants with cargo pockets for extra storage. Features an elastic waistband and tapered leg.",
      price: 52.99,
      category: "Scrubs",
      profession: ["Nurse", "Doctor", "Technician"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "Black", "Khaki", "Wine"],
      images: [
        "/images/scrub-pants-navy.jpg",
        "/images/scrub-pants-black.jpg"
      ],
      rating: 4.7,
      reviewCount: 203,
      inStock: true,
      featured: false,
    },
    {
      id: 6,
      name: "Designer Lab Coat",
      description: "Modern lab coat with slim fit design and premium fabric. Features princess seaming for a flattering silhouette.",
      price: 149.99,
      category: "Lab Coats",
      profession: ["Doctor", "Pharmacist"],
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["White", "Light Blue"],
      images: [
        "/images/labcoat-designer-white.jpg",
        "/images/labcoat-designer-blue.jpg"
      ],
      rating: 4.9,
      reviewCount: 87,
      inStock: true,
      featured: false,
    },
    {
      id: 7,
      name: "Athletic Medical Sneakers",
      description: "Lightweight athletic shoes designed for healthcare professionals. Features antimicrobial lining and slip-resistant sole.",
      price: 109.99,
      category: "Medical Shoes",
      profession: ["Nurse", "Physical Therapist", "Support Staff"],
      sizes: ["6", "7", "8", "9", "10", "11", "12"],
      colors: ["White", "Black", "Gray"],
      images: [
        "/images/sneakers-white.jpg",
        "/images/sneakers-black.jpg"
      ],
      rating: 4.3,
      reviewCount: 145,
      inStock: true,
      featured: false,
    },
    {
      id: 8,
      name: "Professional Stethoscope",
      description: "High-quality dual-head stethoscope with excellent acoustic performance. Includes carrying case.",
      price: 189.99,
      category: "Accessories",
      profession: ["Doctor", "Nurse", "Medical Student"],
      sizes: ["One Size"],
      colors: ["Black", "Navy", "Burgundy"],
      images: [
        "/images/stethoscope-black.jpg",
        "/images/stethoscope-navy.jpg"
      ],
      rating: 4.8,
      reviewCount: 234,
      inStock: true,
      featured: false,
    },
    {
      id: 9,
      name: "Compression Socks",
      description: "Medical-grade compression socks to reduce fatigue and improve circulation during long shifts.",
      price: 24.99,
      category: "Accessories",
      profession: ["Nurse", "Doctor", "Support Staff"],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White", "Navy", "Gray"],
      images: [
        "/images/compression-socks-black.jpg",
        "/images/compression-socks-white.jpg"
      ],
      rating: 4.6,
      reviewCount: 189,
      inStock: true,
      featured: false,
    },
    {
      id: 10,
      name: "Medical Badge Holder",
      description: "Retractable badge holder with heavy-duty clip and 30-inch cord. Perfect for ID cards and security badges.",
      price: 12.99,
      category: "Accessories",
      profession: ["All Healthcare Professionals"],
      sizes: ["One Size"],
      colors: ["Black", "Blue", "Red", "Clear"],
      images: [
        "/images/badge-holder-black.jpg",
        "/images/badge-holder-blue.jpg"
      ],
      rating: 4.2,
      reviewCount: 78,
      inStock: true,
      featured: false,
    },
  ],

  // Mock user data
  user: {
    id: 1,
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
    profession: "Nurse",
    workplace: "General Hospital",
    phone: "+1-555-0123",
    dateJoined: "2023-01-15T10:30:00Z",
    isVerified: true,
    preferences: {
      newsletter: true,
      smsNotifications: false,
      orderUpdates: true,
    },
    addresses: [
      {
        id: 1,
        type: "shipping",
        firstName: "John",
        lastName: "Doe",
        address1: "123 Main St",
        address2: "Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "US",
        isDefault: true,
      },
      {
        id: 2,
        type: "billing",
        firstName: "John",
        lastName: "Doe",
        address1: "456 Work Ave",
        address2: "",
        city: "New York",
        state: "NY",
        zipCode: "10002",
        country: "US",
        isDefault: false,
      }
    ]
  },

  // Mock orders
  orders: [
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      date: "2024-10-20T14:30:00Z",
      status: "delivered",
      items: [
        {
          id: 1,
          productId: 1,
          name: "Premium Unisex Scrub Set",
          price: 89.99,
          quantity: 1,
          size: "M",
          color: "Navy",
          image: "/images/scrubs-premium-navy.jpg",
        },
        {
          id: 2,
          productId: 3,
          name: "Non-Slip Medical Clogs",
          price: 79.99,
          quantity: 1,
          size: "9",
          color: "White",
          image: "/images/clogs-white.jpg",
        }
      ],
      subtotal: 169.98,
      shipping: 9.99,
      tax: 14.44,
      discount: 0,
      total: 194.41,
      shippingAddress: {
        firstName: "John",
        lastName: "Doe",
        address1: "123 Main St",
        address2: "Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "US",
      },
      trackingNumber: "TRK123456789",
      estimatedDelivery: "2024-10-25T18:00:00Z",
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      date: "2024-10-22T09:15:00Z",
      status: "shipped",
      items: [
        {
          id: 3,
          productId: 2,
          name: "Classic White Lab Coat",
          price: 124.99,
          quantity: 1,
          size: "L",
          color: "White",
          image: "/images/labcoat-classic-white.jpg",
        }
      ],
      subtotal: 124.99,
      shipping: 9.99,
      tax: 10.62,
      discount: 12.50,
      total: 133.10,
      shippingAddress: {
        firstName: "John",
        lastName: "Doe",
        address1: "123 Main St",
        address2: "Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "US",
      },
      trackingNumber: "TRK987654321",
      estimatedDelivery: "2024-10-26T18:00:00Z",
    }
  ],

  // Mock wishlist
  wishlist: [
    {
      id: 1,
      product_id: 6,
      product: {
        id: 6,
        name: "Designer Lab Coat",
        price: 149.99,
        images: ["/images/labcoat-designer-white.jpg"],
        inStock: true,
      }
    },
    {
      id: 2,
      product_id: 7,
      product: {
        id: 7,
        name: "Athletic Medical Sneakers",
        price: 109.99,
        images: ["/images/sneakers-white.jpg"],
        inStock: true,
      }
    }
  ],

  // Mock reviews
  reviews: [
    {
      id: 1,
      productId: 1,
      userId: 1,
      userName: "Sarah M.",
      rating: 5,
      title: "Excellent quality!",
      comment: "These scrubs are incredibly comfortable and hold up well after multiple washes. The fit is perfect and the fabric is breathable.",
      date: "2024-10-15T12:00:00Z",
      verified: true,
    },
    {
      id: 2,
      productId: 1,
      userId: 2,
      userName: "Mike R.",
      rating: 4,
      title: "Great value",
      comment: "Good quality scrubs for the price. The navy color is exactly as shown in the pictures.",
      date: "2024-10-10T15:30:00Z",
      verified: true,
    },
    {
      id: 3,
      productId: 2,
      userId: 3,
      userName: "Dr. Lisa K.",
      rating: 5,
      title: "Professional and durable",
      comment: "This lab coat has held up beautifully over 6 months of daily use. The pockets are perfectly sized and positioned.",
      date: "2024-10-08T10:45:00Z",
      verified: true,
    }
  ],

  // Categories and filters
  categories: [
    { id: "scrubs", name: "Scrubs", count: 5 },
    { id: "lab-coats", name: "Lab Coats", count: 2 },
    { id: "medical-shoes", name: "Medical Shoes", count: 2 },
    { id: "accessories", name: "Accessories", count: 3 },
  ],

  professions: [
    "Doctor",
    "Nurse",
    "Medical Assistant",
    "Lab Technician",
    "Pharmacist",
    "Physical Therapist",
    "Veterinarian",
    "Support Staff",
    "Medical Student",
  ],

  sizes: {
    clothing: ["XS", "S", "M", "L", "XL", "XXL"],
    shoes: ["6", "7", "8", "9", "10", "11", "12"],
    accessories: ["One Size", "S", "M", "L", "XL"],
  },

  colors: [
    "Navy", "Black", "White", "Teal", "Wine", "Royal Blue",
    "Coral", "Lavender", "Mint", "Khaki", "Light Blue",
    "Gray", "Burgundy", "Red", "Clear"
  ],
};

export default mockData;