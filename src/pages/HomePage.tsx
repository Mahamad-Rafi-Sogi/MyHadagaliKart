import React from 'react';
import OrderForm from '../components/order/OrderForm';
import { useAuth } from '../context/AuthContext';
import { Package, ShieldCheck, Clock3 } from 'lucide-react';

const HomePage: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-lg p-8 mb-10 text-white">
          <h1 className="text-3xl font-bold mb-4">Order anything you need</h1>
          <p className="text-lg mb-0">
            We'll deliver groceries, medicines, and essentials right to your doorstep in Huvina Hadagali
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order form */}
          <div className="lg:col-span-2">
            <OrderForm />
          </div>

          {/* Side info */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                How It Works
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3">
                    <Package className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Place an order</h3>
                    <p className="text-gray-600 text-sm">
                      Tell us what you need, where to deliver, and provide your contact details
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Confirmation</h3>
                    <p className="text-gray-600 text-sm">
                      We'll confirm your order and begin processing it right away
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3">
                    <Clock3 className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Quick Delivery</h3>
                    <p className="text-gray-600 text-sm">
                      Your items will be delivered to your doorstep in the shortest time possible
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Need Help?
              </h2>
              <p className="text-gray-600 mb-4">
                Have questions or need assistance with your order? Contact our support team:
              </p>
              <div className="space-y-2">
                <p className="text-gray-800">
                  <span className="font-medium">Phone:</span> +91 9876543210
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Email:</span> support@hadagalikart.com
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Hours:</span> 9AM - 9PM, Every Day
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;