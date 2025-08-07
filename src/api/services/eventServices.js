

const API_BASE_URL = 'http://69.62.74.102/backend/api/v1';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OGI1MTE4ODVlNWU1NDcyOTBjNmRiOCIsImVtYWlsIjoiYXNodTA3MDUwMDBAZ21haWwuY29tIiwicm9sZSI6InNjaG9vbGFkbWluIiwiaWF0IjoxNzU0NTg3MjgwLCJleHAiOjE3NTUxOTIwODB9.n3vr_0V4RRRNv3Vy2cFuCPWkMBrx7LlHX9pOz4QfNIA'; // Hardcoded for now

class EventService {
  static async getEvents() {
    try {
      const response = await fetch(`${API_BASE_URL}/School/getEvents`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
      });

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

  // Helper method to combine local and global events
  static combineEvents(eventData) {
    const { localEvents = [], globalEvents = [] } = eventData;
    return [...localEvents, ...globalEvents];
  }

  // Helper method to format date for display
  static formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }

  // Helper method to format time slot
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
}

export default EventService;