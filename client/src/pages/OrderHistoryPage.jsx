import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchOrders, fetchOrderById } from '../store/slices/ordersSlice';

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector(state => state.orders);
  const { isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    dispatch(fetchOrders());
  }, [dispatch, isAuthenticated, navigate]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading orders: {error}</p>
          <button
            onClick={() => dispatch(fetchOrders())}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-8">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">You haven't placed any orders. Start shopping to see your order history here!</p>
            <Link
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Order #{order.orderNumber}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span>
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </span>
                        <span className={`px-2 py-1 rounded-full font-medium text-xs ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <span className="font-medium text-gray-900">
                          Total: ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex space-x-3">
                      <Link
                        to={`/orders/${order.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition duration-300"
                      >
                        View Details
                      </Link>
                      {order.status === 'delivered' && (
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg text-sm transition duration-300">
                          Reorder
                        </button>
                      )}
                      {order.trackingNumber && (
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg text-sm transition duration-300">
                          Track Package
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                          <div className="w-16 h-16 flex-shrink-0">
                            <img
                              src={item.image || '/placeholder-product.jpg'}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-md"
                              onError={(e) => {
                                e.target.src = '/placeholder-product.jpg';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              <Link 
                                to={`/products/${item.productId}`}
                                className="hover:text-blue-600"
                              >
                                {item.name}
                              </Link>
                            </h4>
                            <p className="text-xs text-gray-500">
                              Size: {item.size} | Color: {item.color}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Info */}
                  {order.shippingAddress && (
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h4>
                          <p className="text-sm text-gray-600">
                            {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                            {order.shippingAddress.address1}
                            {order.shippingAddress.address2 && <>, {order.shippingAddress.address2}</>}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                            {order.shippingAddress.country}
                          </p>
                        </div>
                        
                        {order.trackingNumber && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Tracking Information</h4>
                            <p className="text-sm text-gray-600">
                              Tracking Number: <span className="font-mono">{order.trackingNumber}</span>
                            </p>
                            {order.estimatedDelivery && (
                              <p className="text-sm text-gray-600">
                                Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;