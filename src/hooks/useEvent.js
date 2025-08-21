// src/hooks/useEvents.js

import { useState, useEffect } from 'react';
import EventService from '../api/services/eventServices';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' or 'created-by-us'

  const fetchEvents = async (eventFilter = 'all') => {
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
    fetchEvents(filter);
  }, [filter]);

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