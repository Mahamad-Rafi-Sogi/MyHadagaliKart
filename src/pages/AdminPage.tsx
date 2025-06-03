import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getOrders, updateOrderStatus } from '../services/orderService';
import { Order, OrderStatus } from '../types';
import OrderList from '../components/order/OrderList';

const AdminPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | 'All'>('All');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const allOrders = await getOrders();
      setOrders(allOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, status);
      toast.success(`Order status updated to ${status}`);
      
      // Update local state to reflect the change without a full refetch
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const filteredOrders = filter === 'All' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const renderStatusFilter = () => {
    const statuses: (OrderStatus | 'All')[] = ['All', 'New', 'In Progress', 'Completed', 'Cancelled'];
    
    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600 mb-6">
            Manage orders and update their status
          </p>
          
          {renderStatusFilter()}
          
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
          ) : (
            <>
              <p className="mb-4 text-gray-700">
                {filteredOrders.length} {filter === 'All' ? 'total' : filter} order{filteredOrders.length !== 1 ? 's' : ''}
              </p>
              <OrderList 
                orders={filteredOrders} 
                isAdmin={true}
                onUpdateStatus={handleUpdateStatus}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;