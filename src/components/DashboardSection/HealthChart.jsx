import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Users, TrendingUp, Calendar } from 'lucide-react';

const HealthChartsSection = () => {
  // Sample data for bar chart - Monthly health checkups
  const monthlyCheckupsData = [
    { month: 'Jan', checkups: 45, vaccinations: 30 },
    { month: 'Feb', checkups: 52, vaccinations: 35 },
    { month: 'Mar', checkups: 48, vaccinations: 42 },
    { month: 'Apr', checkups: 61, vaccinations: 38 },
    { month: 'May', checkups: 55, vaccinations: 45 },
    { month: 'Jun', checkups: 67, vaccinations: 52 },
  ];

  // Sample data for pie chart - Student health status
  const healthStatusData = [
    { name: 'Healthy', value: 450, color: '#10B981' },
    { name: 'Minor Issues', value: 120, color: '#F59E0B' },
    { name: 'Under Treatment', value: 35, color: '#EF4444' },
    { name: 'Pending Checkup', value: 80, color: '#8B5CF6' },
  ];

  const COLORS = healthStatusData.map(item => item.color);

  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{`Month: ${label}`}</p>
          <p className="text-blue-600">{`Checkups: ${payload[0].value}`}</p>
          <p className="text-green-600">{`Vaccinations: ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for pie chart
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p style={{ color: payload[0].payload.color }}>
            {`Students: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Bar Chart - Monthly Health Activities */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#C42323] p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">Monthly Health Activities</h3>
              <p className="text-blue-100 text-sm">Checkups & Vaccinations Overview</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Chart Content */}
        <div className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyCheckupsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar 
                  dataKey="checkups" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  name="Checkups"
                />
                <Bar 
                  dataKey="vaccinations" 
                  fill="#10B981" 
                  radius={[4, 4, 0, 0]}
                  name="Vaccinations"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Health Checkups</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Vaccinations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pie Chart - Student Health Status */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#2C8C91] p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">Student Health Status</h3>
              <p className="text-green-100 text-sm">Current Health Distribution</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Chart Content */}
        <div className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={healthStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {healthStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
            {healthStatusData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.value} students</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Students:</span>
            <span className="font-semibold text-gray-800">
              {healthStatusData.reduce((sum, item) => sum + item.value, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthChartsSection;