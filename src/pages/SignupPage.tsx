import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm isSignUp={true} />
    </div>
  );
};

export default SignupPage;