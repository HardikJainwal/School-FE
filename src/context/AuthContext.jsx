// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../api/services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = () => {
    try {
      const authState = authService.initAuth();
      setIsAuthenticated(authState.isAuthenticated);
      setAdminData(authState.adminData);
    } catch (error) {
      console.error('Auth initialization error:', error);
      setError('Failed to initialize authentication');
    } finally {
      setLoading(false);
    }
  };

  const login = async (token, adminData) => {
    try {
      authService.setToken(token);
      authService.setAdminData(adminData);
      setIsAuthenticated(true);
      setAdminData(adminData);
      setError('');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed');
      return false;
    }
  };

  const logout = () => {
    try {
      authService.removeToken();
      authService.removeAdminData();
      setIsAuthenticated(false);
      setAdminData(null);
      setError('');
    } catch (error) {
      console.error('Logout error:', error);
      setError('Logout failed');
    }
  };

  const sendOTP = async (email) => {
    try {
      setError('');
      const response = await authService.sendOTP(email);
      return { success: true, data: response };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      setError('');
      const response = await authService.verifyOTP(email, otp);
      await login(response.token, response.Admin);
      return { success: true, data: response };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const clearError = () => {
    setError('');
  };

  const value = {
    // State
    isAuthenticated,
    adminData,
    loading,
    error,
    
    // Actions
    login,
    logout,
    sendOTP,
    verifyOTP,
    clearError,
    
    // Utilities
    authService,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};