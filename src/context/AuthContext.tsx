import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  currentUser: { email: string } | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'admin@hadagalikart.com';
const ADMIN_PASSWORD = 'admin123';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null);

  const signIn = async (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setCurrentUser({ email });
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const signUp = async (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setCurrentUser({ email });
    } else {
      throw new Error('Only admin account can be created in demo mode');
    }
  };

  const signOut = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};