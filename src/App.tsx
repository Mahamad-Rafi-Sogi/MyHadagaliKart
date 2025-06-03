import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
import Navbar from './components/common/Navbar';

// Pages
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
            },
            success: {
              style: {
                border: '1px solid #10B981',
              },
            },
            error: {
              style: {
                border: '1px solid #EF4444',
              },
            },
          }}
        />
        
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Protected routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <HomePage />
                </>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiresAdmin>
                <>
                  <Navbar />
                  <AdminPage />
                </>
              </ProtectedRoute>
            } 
          />
          
          {/* Redirects */}
          <Route path="/explore" element={<Navigate to="/" />} />
          
          {/* Catch all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;