// src/pages/EventsPage.jsx

import React from 'react';
import { MapPin, Clock, CalendarDays, RefreshCw, AlertCircle } from 'lucide-react';
import { useEvents } from '../hooks/useEvent';

const EventsPage = () => {
  const { events, loading, error, refetchEvents } = useEvents();

  // Loading state
  if (loading) {
    return (
      <div className="p-8 md:p-12 bg-gray-50 min-h-screen px-8">
        <h2 className="text-3xl font-bold mb-6 text-[#C42323]">Upcoming Events</h2>
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C42323]"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-8 md:p-12 bg-gray-50 min-h-screen px-8">
        <h2 className="text-3xl font-bold mb-6 text-[#C42323]">Upcoming Events</h2>
        <div className="flex flex-col items-center justify-center min-h-64 bg-white rounded-xl shadow-md p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Events</h3>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={refetchEvents}
            className="bg-[#C42323] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 bg-gray-50 min-h-screen px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#C42323]">Upcoming Events</h2>
        <button
          onClick={refetchEvents}
          className="bg-[#2C8C91] text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-200 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-64 bg-white rounded-xl shadow-md p-8">
          <CalendarDays className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Events Available</h3>
          <p className="text-gray-600 text-center">There are currently no upcoming events to display.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = '/images/event-placeholder.jpg'; // Fallback image
                }}
              />
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-[#2C8C91]">
                    {event.title}
                  </h3>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.priceType === 'free' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {event.priceType === 'free' ? 'Free' : 'Paid'}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.type === 'physical' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm">{event.description}</p>

                <div className="flex items-center text-sm text-gray-700 gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-[#C42323]" />
                  {event.location}
                </div>

                <div className="flex items-center text-sm text-gray-700 gap-2">
                  <CalendarDays className="w-4 h-4 text-[#C42323]" />
                  {new Date(event.startTime).toLocaleDateString()}
                </div>

                <div className="flex items-center text-sm text-gray-700 gap-2">
                  <Clock className="w-4 h-4 text-[#C42323]" />
                  {event.timeSlot}
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Slots: {event.slotsLeft}/{event.size}</span>
                    <span className={`font-medium ${
                      event.isActive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {event.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;