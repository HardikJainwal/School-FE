// src/services/authService.js

const API_BASE_URL = 'http://localhost:3000/api/v1/School';

class AuthService {
  /**
   * Send OTP to user's email
   * @param {string} email - User's email address
   * @returns {Promise<Object>} API response
   */
  async sendOTP(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send OTP');
      }

      return await response.json();
    } catch (error) {
      console.error('Send OTP Error:', error);
      throw error;
    }
  }

  /**
   * Verify OTP and get authentication token
   * @param {string} email - User's email address
   * @param {string|number} otp - OTP code
   * @returns {Promise<Object>} API response with token and admin data
   */
  async verifyOTP(email, otp) {
    try {
      const response = await fetch(`${API_BASE_URL}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          otp: parseInt(otp) 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid OTP');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Verify OTP Error:', error);
      throw error;
    }
  }

  /**
   * Make authenticated API requests
   * @param {string} url - API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise<Object>} API response
   */
  async authenticatedRequest(url, options = {}) {
    const token = this.getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const authOptions = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, authOptions);
      
      if (response.status === 401) {
        // Token expired, redirect to login
        this.logout();
        throw new Error('Session expired. Please login again.');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Authenticated Request Error:', error);
      throw error;
    }
  }

  // Token management methods
  setToken(token) {
    sessionStorage.setItem('authToken', token);
  }

  getToken() {
    return sessionStorage.getItem('authToken');
  }

  removeToken() {
    sessionStorage.removeItem('authToken');
  }

  // Admin data management methods
  setAdminData(adminData) {
    sessionStorage.setItem('adminData', JSON.stringify(adminData));
  }

  getAdminData() {
    const data = sessionStorage.getItem('adminData');
    return data ? JSON.parse(data) : null;
  }

  removeAdminData() {
    sessionStorage.removeItem('adminData');
  }

  // Authentication status methods
  isAuthenticated() {
    return !!this.getToken();
  }

  logout() {
    this.removeToken();
    this.removeAdminData();
    // Optionally redirect to login page
    window.location.href = '/login';
  }

  // Initialize authentication state
  initAuth() {
    const token = this.getToken();
    const adminData = this.getAdminData();
    
    return {
      isAuthenticated: !!token,
      adminData: adminData,
      token: token
    };
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService;