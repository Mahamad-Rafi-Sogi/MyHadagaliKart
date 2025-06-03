import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Truck, Clock, Gift } from 'lucide-react';
import Button from '../components/common/Button';

const WelcomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <div className="animate-bounce mb-6">
            <ShoppingCart size={64} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to HadagaliKart
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Huvina Hadagali's first online delivery application
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/login">
              <Button variant="primary" size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-emerald-600">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose HadagaliKart?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <Truck className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your essentials delivered quickly to your doorstep in Huvina Hadagali.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <Clock className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Convenient Ordering</h3>
              <p className="text-gray-600">Easy-to-use interface to place orders anytime, anywhere in minutes.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <Gift className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Products</h3>
              <p className="text-gray-600">Support local businesses with our extensive selection of local products.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the convenience of online shopping and doorstep delivery in Huvina Hadagali.
          </p>
          <Link to="/explore">
            <Button variant="primary" size="lg">
              Explore Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 HadagaliKart. All rights reserved.</p>
          <p className="mt-2 text-gray-400">Huvina Hadagali's first online delivery application</p>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;