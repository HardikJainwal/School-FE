// src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoginForm from './login';

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);

const ProtectedRoute = ({ children, fallback = null, requireAuth = true }) => {
  const { isAuthenticated, loading, error } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show error if authentication check failed
  if (error && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // If authentication is required and user is not authenticated, show login
  if (requireAuth && !isAuthenticated) {
    return fallback || <LoginForm />;
  }

  // If authentication is not required or user is authenticated, show children
  return children;
};

// Higher-order component for protecting routes
export const withAuth = (Component, options = {}) => {
  const WrappedComponent = (props) => (
    <ProtectedRoute {...options}>
      <Component {...props} />
    </ProtectedRoute>
  );
  
  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

// Hook for conditional rendering based on auth status
export const useAuthGuard = () => {
  const { isAuthenticated, loading } = useAuth();
  
  return {
    isAuthenticated,
    loading,
    canAccess: isAuthenticated && !loading,
    shouldShowLogin: !isAuthenticated && !loading,
  };
};

export default ProtectedRoute;