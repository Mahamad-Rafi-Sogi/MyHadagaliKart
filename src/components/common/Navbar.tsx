import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <ShoppingCart className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">HadagaliKart</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                {currentUser.email === 'admin@hadagalikart.com' && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">Admin Panel</Button>
                  </Link>
                )}
                <Link to="/order">
                  <Button variant="primary" size="sm">Order Now</Button>
                </Link>
                <div className="flex items-center text-gray-700">
                  <User className="h-5 w-5 mr-1" />
                  <span className="text-sm truncate max-w-[100px]">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;