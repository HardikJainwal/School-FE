// src/api/services/eventServices.js
import authService from '../services/authService'; // Import your auth service

const API_BASE_URL = 'http://localhost:3000/api/v1';

class EventService {
  // Helper method to get auth headers
  static getAuthHeaders() {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }
    
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  static async getEvents() {
    try {
      const response = await fetch(`${API_BASE_URL}/School/getEvents`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (response.status === 401) {
        // Token expired or invalid
        authService.logout();
        throw new Error('Session expired. Please login again.');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  // Get user-created events
  static async getUserEvents() {
    try {
      const response = await fetch(`${API_BASE_URL}/School/getUserEvent`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (response.status === 401) {
        authService.logout();
        throw new Error('Session expired. Please login again.');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // The API returns { Events: [...] } format
      if (result.Events) {
        return { localEvents: result.Events, globalEvents: [] };
      } else {
        throw new Error('Failed to fetch user events');
      }
    } catch (error) {
      console.error('Error fetching user events:', error);
      throw error;
    }
  }

  // Create an event
  static async createEvent(eventData) {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const formData = new FormData();
      
      // Append all event data to FormData
      Object.keys(eventData).forEach(key => {
        if (eventData[key] !== null && eventData[key] !== '' && eventData[key] !== undefined) {
          formData.append(key, eventData[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/School/createEvent`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type for FormData, let browser set it with boundary
        },
        body: formData,
      });

      if (response.status === 401) {
        authService.logout();
        throw new Error('Session expired. Please login again.');
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create event: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  // Alternative method using the authService's authenticatedRequest
  static async getEventsUsingAuthService() {
    try {
      const response = await authService.authenticatedRequest(`${API_BASE_URL}/School/getEvents`);
      return response.success ? response.data : response;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  static async getUserEventsUsingAuthService() {
    try {
      const response = await authService.authenticatedRequest(`${API_BASE_URL}/School/getUserEvent`);
      return response.Events ? { localEvents: response.Events, globalEvents: [] } : response;
    } catch (error) {
      console.error('Error fetching user events:', error);
      throw error;
    }
  }

  static combineEvents(eventData) {
    const { localEvents = [], globalEvents = [] } = eventData;
    return [...localEvents, ...globalEvents];
  }

  static formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }

  static formatTimeSlot(startTime, endTime) {
    const start = new Date(startTime).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const end = new Date(endTime).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    return `${start} - ${end}`;
  }

  // Helper method to validate required fields
  static validateEventData(eventData) {
    const requiredFields = ['title', 'description', 'type', 'audience', 'startTime', 'endTime', 'size', 'priceType', 'location'];
    const missingFields = [];

    requiredFields.forEach(field => {
      if (!eventData[field] || eventData[field].toString().trim() === '') {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Additional validations
    if (new Date(eventData.endTime) <= new Date(eventData.startTime)) {
      throw new Error('End time must be after start time');
    }

    if (parseInt(eventData.size) < 1) {
      throw new Error('Event size must be at least 1');
    }

    if (eventData.link && eventData.link.trim() !== '') {
      try {
        new URL(eventData.link);
      } catch {
        throw new Error('Invalid URL format for event link');
      }
    }

    return true;
  }
}

export default EventService;