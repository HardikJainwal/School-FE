import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Plus, Star } from 'lucide-react';

const AppointmentPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Personal Training Session",
      coach: "Sarah Johnson",
      date: "2025-08-09",
      time: "10:00 AM",
      duration: "1 hour",
      type: "Fitness"
    },
    {
      id: 2,
      title: "Nutrition Consultation",
      coach: "Dr. Mike Chen",
      date: "2025-08-10",
      time: "2:30 PM",
      duration: "45 mins",
      type: "Nutrition"
    },
    {
      id: 3,
      title: "Yoga Class",
      coach: "Emma Williams",
      date: "2025-08-12",
      time: "8:00 AM",
      duration: "1.5 hours",
      type: "Wellness"
    },
    {
      id: 4,
      title: "Mental Health Coaching",
      coach: "Dr. James Rodriguez",
      date: "2025-08-15",
      time: "4:00 PM",
      duration: "1 hour",
      type: "Mental Health"
    },
    {
      id: 5,
      title: "CrossFit Training",
      coach: "Alex Thompson",
      date: "2025-08-18",
      time: "6:00 PM",
      duration: "1 hour",
      type: "Fitness"
    }
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === currentDate.getMonth() && 
           today.getFullYear() === currentDate.getFullYear();
  };

  const isSelected = (day) => {
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === currentDate.getMonth() && 
           selectedDate.getFullYear() === currentDate.getFullYear();
  };

  const hasEvent = (day) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return upcomingEvents.some(event => event.date === dateString);
  };

  const selectDate = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          onClick={() => selectDate(day)}
          className={`
            p-2 text-center cursor-pointer rounded-xl transition-all duration-300 relative
            hover:bg-gray-100 hover:scale-105 hover:shadow-md
            ${isToday(day) 
              ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg font-bold' 
              : isSelected(day)
              ? 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg'
              : 'text-gray-700 hover:text-gray-900'
            }
          `}
        >
          {day}
          {hasEvent(day) && (
            <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
              isToday(day) || isSelected(day) ? 'bg-white' : 'bg-red-500'
            }`}></div>
          )}
        </div>
      );
    }

    return days;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Fitness': return 'bg-red-100 text-red-800 border-red-200';
      case 'Nutrition': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Wellness': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Mental Health': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-[#C42323] bg-clip-text text-transparent mb-2">
            Appointment Scheduler
          </h1>
          <p className="text-gray-600 text-lg">Book your sessions with our expert coaches</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-[#C42323] text-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 rounded-lg hover:bg-white/20 transition-colors duration-200"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <h2 className="text-2xl font-bold">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 rounded-lg hover:bg-white/20 transition-colors duration-200"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <Calendar size={16} />
                  <span>Selected: {formatDate(selectedDate)}</span>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold text-gray-500 p-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-2">
                  {renderCalendar()}
                </div>
              </div>

              {/* Book Appointment Button */}
              <div className="p-6 bg-gray-50 border-t">
               
              </div>
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-fit">
              <div className="bg-[#C42323] text-white p-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Star size={20} />
                  Upcoming Events
                </h3>
                <p className="text-sm opacity-90 mt-1">Your scheduled appointments</p>
              </div>

              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {upcomingEvents.map(event => (
                  <div
                    key={event.id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-gray-300 hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-800 text-sm leading-tight">
                        {event.title}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-teal-600" />
                        <span className="font-medium">{event.coach}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-red-600" />
                        <span>{event.time} • {event.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-500" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                    </div>

                   <div className="mt-3">
  <button className="w-full bg-yellow-50 text-yellow-700 py-1.5 px-3 rounded-lg text-xs font-medium hover:bg-yellow-100 transition-colors">
    Request Change
  </button>
</div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-50 border-t">
                <button className="w-full text-teal-700 py-2 px-4 rounded-lg font-medium hover:bg-teal-50 transition-colors text-sm border border-teal-200">
                  View All Appointments
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;