import React from 'react';

import HealthCard from '../components/DashboardSection/HealthCard';
import HealthChart from '../components/DashboardSection/HealthChart';
import TodaysAppointments from '../components/DashboardSection/TodayAppointments';
import { Heart, Calendar, Users, TrendingUp , Clock} from 'lucide-react';

const Dashboard = () => {
  // Get current date for greeting
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Header Section */}
      <div className="mb-8 px-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#C42323] to-[#a11f1f] p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {getCurrentGreeting()}, 
                </h1>
                <p className="text-red-100 text-lg">
                  Welcome to your Health Management Dashboard
                </p>
                <p className="text-red-200 text-sm mt-1">
                  {getCurrentDate()}
                </p>
              </div>
              <div className="hidden md:block">
                <div className="p-4 bg-white/20 rounded-full">
                  <Heart className="w-12 h-12" />
                </div>
              </div>
            </div>
          </div>
          
         
          
        </div>
      </div>

      {/* Health Stats Cards Section */}
      <div className="mb-12 px-8 ">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-[#2C8C91] ">Health Overview</h2>
        </div>
        <HealthCard/>
      </div>

      {/* Health Charts Section */}
      <div className="mb-16 px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Heart className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-[#2C8C91]">Health Analytics</h2>
        </div>
        <HealthChart/>
      </div>

        <div className="mb-8 px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-4xl font-bold text-[#2C8C91]">Today's Schedule</h2>
        </div>
        <TodaysAppointments />
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-8 px-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center">
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700">Schedule Checkup</span>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center">
            <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700">View Students</span>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center">
            <Heart className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700">Health Reports</span>
          </button>
          <button className="p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-center">
            <TrendingUp className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700">Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;