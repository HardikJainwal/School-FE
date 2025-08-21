// src/hooks/useEvents.js
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import EventService from '../api/services/eventServices';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' or 'created-by-us'
  
  const { isAuthenticated, logout } = useAuth();

  const fetchEvents = async (eventFilter = 'all') => {
    // Check if user is authenticated before making requests
    if (!isAuthenticated) {
      setError('Please login to view events');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      let eventData;
      
      if (eventFilter === 'created-by-us') {
        eventData = await EventService.getUserEvents();
      } else {
        eventData = await EventService.getEvents();
      }
      
      const combinedEvents = EventService.combineEvents(eventData);
      
      // Transform API data to match your component's expected format
      const formattedEvents = combinedEvents.map(event => ({
        id: event.id || event._id, // Handle both id formats
        title: event.title,
        description: event.description,
        image: event.photo || event.image || '/images/event-placeholder.jpg', // Fallback image
        location: event.location,
        startTime: event.startTime,
        endTime: event.endTime,
        timeSlot: EventService.formatTimeSlot(event.startTime, event.endTime),
        type: event.type,
        audience: event.audience,
        priceType: event.priceType,
        slotsLeft: event.slotsLeft || event.size, // Default to size if slotsLeft not available
        size: event.size,
        bookedSlots: event.bookedSlots || 0,
        isActive: event.isActive !== undefined ? event.isActive : true,
        createdAt: event.createdAt,
        link: event.link,
      }));
      
      setEvents(formattedEvents);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      
      // Handle specific authentication errors
      if (err.message.includes('Session expired') || err.message.includes('authentication')) {
        setError('Your session has expired. Please login again.');
        // The authService.logout() is already called in EventService
      } else if (err.message.includes('401')) {
        setError('Authentication required. Please login again.');
      } else {
        setError(err.message || 'Failed to load events. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents(filter);
    } else {
      setEvents([]);
      setLoading(false);
      setError('Please login to view events');
    }
  }, [filter, isAuthenticated]);

  // Function to change filter
  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const refetchEvents = () => {
    fetchEvents(filter);
  };

  return {
    events,
    loading,
    error,
    filter,
    refetchEvents,
    changeFilter,
  };
};