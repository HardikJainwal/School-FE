// src/hooks/useEvents.js

import { useState, useEffect } from 'react';
import EventService from '../api/services/eventServices';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const eventData = await EventService.getEvents();
      const combinedEvents = EventService.combineEvents(eventData);
      
      // Transform API data to match your component's expected format
      const formattedEvents = combinedEvents.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        image: event.photo, // API uses 'photo', component expects 'image'
        location: event.location,
        startTime: event.startTime,
        endTime: event.endTime,
        timeSlot: EventService.formatTimeSlot(event.startTime, event.endTime),
        type: event.type,
        audience: event.audience,
        priceType: event.priceType,
        slotsLeft: event.slotsLeft,
        size: event.size,
        bookedSlots: event.bookedSlots,
        isActive: event.isActive,
        createdAt: event.createdAt,
      }));
      
      setEvents(formattedEvents);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to refetch events (useful for refresh functionality)
  const refetchEvents = () => {
    fetchEvents();
  };

  return {
    events,
    loading,
    error,
    refetchEvents,
  };
};