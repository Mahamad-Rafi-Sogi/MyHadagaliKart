import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createOrder } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';
import TextArea from '../common/TextArea';
import Input from '../common/Input';
import Button from '../common/Button';
import { ShoppingBag } from 'lucide-react';

interface OrderFormProps {
  onSuccess?: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSuccess }) => {
  const [prompt, setPrompt] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim() || !address.trim() || !phoneNumber.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    try {
      await createOrder({
        prompt,
        address,
        phoneNumber,
        userId: currentUser?.uid
      });
      
      toast.success('Order placed successfully!');
      setPrompt('');
      setAddress('');
      setPhoneNumber('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center mb-6">
        <ShoppingBag className="h-8 w-8 text-emerald-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Place Your Order</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <TextArea
          id="prompt"
          label="What would you like to order?"
          placeholder="E.g., Please deliver 2 kg rice, 1 kg sugar, and a loaf of bread..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
          rows={5}
        />
        
        <Input
          id="address"
          label="Delivery Address"
          placeholder="Your complete delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        
        <Input
          id="phoneNumber"
          label="Phone Number"
          placeholder="Your contact number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="tel"
          pattern="[0-9]{10}"
          required
        />
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading}
          className="mt-6"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </Button>
      </form>
    </div>
  );
};

export default OrderForm;