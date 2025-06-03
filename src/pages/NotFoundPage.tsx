import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { AlertCircle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle size={64} className="text-emerald-500" />
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="primary">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;