import React from 'react';
import { Order, OrderStatus } from '../../types';
import OrderCard from './OrderCard';

interface OrderListProps {
  orders: Order[];
  isAdmin?: boolean;
  onUpdateStatus?: (id: string, status: OrderStatus) => void;
}

const OrderList: React.FC<OrderListProps> = ({ 
  orders, 
  isAdmin = false,
  onUpdateStatus 
}) => {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-gray-500 text-lg">No orders found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((order) => (
        <OrderCard 
          key={order.id} 
          order={order}
          isAdmin={isAdmin}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};

export default OrderList;