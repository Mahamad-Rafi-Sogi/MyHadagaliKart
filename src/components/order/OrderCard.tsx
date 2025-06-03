import React from 'react';
import { Order, OrderStatus } from '../../types';
import { format } from '../../utils/dateFormatter';
import Button from '../common/Button';

interface OrderCardProps {
  order: Order;
  isAdmin?: boolean;
  onUpdateStatus?: (id: string, status: OrderStatus) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ 
  order, 
  isAdmin = false,
  onUpdateStatus 
}) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (status: OrderStatus) => {
    if (order.id && onUpdateStatus) {
      onUpdateStatus(order.id, status);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Order</h3>
            <span className="text-xs text-gray-500">
              {format(order.createdAt)}
            </span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700 whitespace-pre-line">
            <span className="font-medium">Items:</span> {order.prompt}
          </p>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700">
            <span className="font-medium">Address:</span> {order.address}
          </p>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700">
            <span className="font-medium">Phone:</span> {order.phoneNumber}
          </p>
        </div>
        
        {isAdmin && order.status !== 'Completed' && order.status !== 'Cancelled' && (
          <div className="mt-4 flex flex-wrap gap-2">
            {order.status === 'New' && (
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => handleStatusUpdate('In Progress')}
              >
                Start Processing
              </Button>
            )}
            
            {order.status === 'In Progress' && (
              <Button 
                variant="success" 
                size="sm" 
                onClick={() => handleStatusUpdate('Completed')}
              >
                Mark as Completed
              </Button>
            )}
            
            <Button 
              variant="danger" 
              size="sm" 
              onClick={() => handleStatusUpdate('Cancelled')}
            >
              Cancel Order
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;