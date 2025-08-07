import React from 'react';
import { 
  Calendar, 
  AlertTriangle, 
  TrendingUp, 
  Syringe,
  Clock,
  CheckCircle,
  Users
} from 'lucide-react';

const HealthStatsCards = () => {
 const statsData = [
  {
    id: 'appointments',
    title: "Today's Appointments",
    value: '12',
    subtitle: '5 completed, 2 pending',
    icon: Calendar,
    bgColor: 'bg-[#fceaea]', 
    iconColor: 'text-[#C42323]',
    borderColor: 'border-[#f0c2c2]'
  },
  {
    id: 'emergency',
    title: 'Emergency Alerts',
    value: '3',
    subtitle: 'Requires immediate attention',
    icon: AlertTriangle,
    bgColor: 'bg-[#e6f5f5]',
    iconColor: 'text-[#2C8C91]',
    borderColor: 'border-[#c0e5e5]'
  },
  {
    id: 'trends',
    title: 'Health Trends',
    value: '+12%',
    subtitle: 'Improvement in student health',
    icon: TrendingUp,
    bgColor: 'bg-[#fceaea]',
    iconColor: 'text-[#C42323]',
    borderColor: 'border-[#f0c2c2]'
  },
  {
    id: 'vaccination',
    title: 'Vaccination Updates',
    value: '87%',
    subtitle: 'Students vaccinated',
    icon: Syringe,
    bgColor: 'bg-[#e6f5f5]',
    iconColor: 'text-[#2C8C91]',
    borderColor: 'border-[#c0e5e5]'
  }
];


  const getStatusIcon = (id) => {
    switch (id) {
      case 'appointments':
        return <Clock className="w-4 h-4 text-orange-500 inline mr-1" />;
      case 'emergency':
        return <AlertTriangle className="w-4 h-4 text-red-500 inline mr-1" />;
      case 'trends':
        return <TrendingUp className="w-4 h-4 text-green-500 inline mr-1" />;
      case 'vaccination':
        return <CheckCircle className="w-4 h-4 text-green-500 inline mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer`}
          >
            {/* Header with Icon */}
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-white shadow-sm`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              {stat.id === 'emergency' && (
                <div className="animate-pulse">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-gray-700 font-semibold text-sm mb-2 uppercase tracking-wide">
              {stat.title}
            </h3>

            {/* Main Value */}
            <div className="mb-3">
              <span className="text-3xl font-bold text-gray-800">
                {stat.value}
              </span>
            </div>

            {/* Subtitle with Status Icon */}
            <div className="flex items-center text-sm text-gray-600">
              {getStatusIcon(stat.id)}
              <span>{stat.subtitle}</span>
            </div>

            {/* Progress bar for vaccination */}
            {stat.id === 'vaccination' && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
            )}

            {/* Trend indicator for health trends */}
            {stat.id === 'trends' && (
              <div className="mt-3">
                <div className="flex items-center text-xs text-green-600 font-medium">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HealthStatsCards;