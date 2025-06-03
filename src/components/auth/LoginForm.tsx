import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';

interface LoginFormProps {
  isSignUp?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isSignUp = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        await signUp(email, password);
        toast.success('Account created successfully');
      } else {
        await signIn(email, password);
        toast.success('Login successful');
      }
      navigate('/');
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(isSignUp ? 'Failed to create account' : 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isSignUp ? 'Create an Account' : 'Login to HadagaliKart'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          autoComplete="email"
        />
        
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          autoComplete={isSignUp ? 'new-password' : 'current-password'}
        />
        
        {isSignUp && (
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="••••••••"
            autoComplete="new-password"
          />
        )}
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading}
          className="mt-4"
        >
          {loading 
            ? 'Processing...' 
            : isSignUp 
              ? 'Create Account' 
              : 'Login'
          }
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {isSignUp 
            ? 'Already have an account?' 
            : "Don't have an account yet?"
          }
          {' '}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(isSignUp ? '/login' : '/signup')}
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;