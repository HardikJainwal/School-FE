import React, { useState } from 'react';
import { 
  Clock, 
  User, 
  Stethoscope, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calendar,
  Filter,
  Search,
  MoreVertical
} from 'lucide-react';

const TodaysAppointments = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample appointments data - replace with API call
  const appointmentsData = [
    {
      id: 1,
      time: '09:00 AM',
      studentName: 'Aarav Sharma',
      studentId: 'ST2024001',
      doctorName: 'Dr. Priya Patel',
      appointmentType: 'General Checkup',
      status: 'completed',
      avatar: 'AS'
    },
    {
      id: 2,
      time: '09:30 AM',
      studentName: 'Sneha Reddy',
      studentId: 'ST2024002',
      doctorName: 'Dr. Rajesh Kumar',
      appointmentType: 'Vaccination',
      status: 'completed',
      avatar: 'SR'
    },
    {
      id: 3,
      time: '10:00 AM',
      studentName: 'Arjun Singh',
      studentId: 'ST2024003',
      doctorName: 'Dr. Priya Patel',
      appointmentType: 'Health Screening',
      status: 'completed',
      avatar: 'AS'
    },
    {
      id: 4,
      time: '10:30 AM',
      studentName: 'Kavya Nair',
      studentId: 'ST2024004',
      doctorName: 'Dr. Amit Verma',
      appointmentType: 'Follow-up',
      status: 'pending',
      avatar: 'KN'
    },
    {
      id: 5,
      time: '11:00 AM',
      studentName: 'Rohan Gupta',
      studentId: 'ST2024005',
      doctorName: 'Dr. Rajesh Kumar',
      appointmentType: 'Emergency Consultation',
      status: 'pending',
      avatar: 'RG'
    },
    {
      id: 6,
      time: '11:30 AM',
      studentName: 'Ananya Das',
      studentId: 'ST2024006',
      doctorName: 'Dr. Priya Patel',
      appointmentType: 'General Checkup',
      status: 'cancelled',
      avatar: 'AD'
    },
    {
      id: 7,
      time: '02:00 PM',
      studentName: 'Vikram Joshi',
      studentId: 'ST2024007',
      doctorName: 'Dr. Amit Verma',
      appointmentType: 'Vaccination',
      status: 'pending',
      avatar: 'VJ'
    },
    {
      id: 8,
      time: '02:30 PM',
      studentName: 'Ishita Mehta',
      studentId: 'ST2024008',
      doctorName: 'Dr. Rajesh Kumar',
      appointmentType: 'Health Screening',
      status: 'completed',
      avatar: 'IM'
    }
  ];

  // Filter appointments based on status and search term
  const filteredAppointments = appointmentsData.filter(appointment => {
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesSearch = appointment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.appointmentType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          iconColor: 'text-green-600',
          label: 'Completed',
          borderColor: 'border-green-200'
        };
      case 'pending':
        return {
          icon: AlertCircle,
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-600',
          label: 'Pending',
          borderColor: 'border-yellow-200'
        };
      case 'cancelled':
        return {
          icon: XCircle,
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          iconColor: 'text-red-600',
          label: 'Cancelled',
          borderColor: 'border-red-200'
        };
      default:
        return {
          icon: AlertCircle,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          iconColor: 'text-gray-600',
          label: 'Unknown',
          borderColor: 'border-gray-200'
        };
    }
  };

  const getStatusCounts = () => {
    const completed = appointmentsData.filter(apt => apt.status === 'completed').length;
    const pending = appointmentsData.filter(apt => apt.status === 'pending').length;
    const cancelled = appointmentsData.filter(apt => apt.status === 'cancelled').length;
    return { completed, pending, cancelled, total: appointmentsData.length };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-[#2C8C91] p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-1">Today's Appointments</h3>
            <p className="text-blue-100 text-sm">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="p-3 bg-white/20 rounded-lg">
            <Calendar className="w-8 h-8" />
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{statusCounts.total}</div>
            <div className="text-sm text-blue-100">Total</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{statusCounts.completed}</div>
            <div className="text-sm text-blue-100">Completed</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{statusCounts.pending}</div>
            <div className="text-sm text-blue-100">Pending</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{statusCounts.cancelled}</div>
            <div className="text-sm text-blue-100">Cancelled</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredAppointments.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredAppointments.map((appointment) => {
              const statusConfig = getStatusConfig(appointment.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div key={appointment.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    {/* Left Section - Time and Avatar */}
                    <div className="flex items-center gap-4">
                      {/* Time */}
                      <div className="flex flex-col items-center min-w-0">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-800 mt-1">
                          {appointment.time}
                        </span>
                      </div>

                      {/* Student Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        {appointment.avatar}
                      </div>

                      {/* Appointment Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-800 truncate">
                            {appointment.studentName}
                          </h4>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {appointment.studentId}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <Stethoscope className="w-3 h-3" />
                          <span>{appointment.doctorName}</span>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          {appointment.appointmentType}
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Status and Actions */}
                    <div className="flex items-center gap-3">
                      {/* Status Badge */}
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full border ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor}`}>
                        <StatusIcon className={`w-3 h-3 ${statusConfig.iconColor}`} />
                        <span className="text-xs font-medium">{statusConfig.label}</span>
                      </div>

                      {/* Actions Menu */}
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No appointments found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Footer */}
      {filteredAppointments.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing {filteredAppointments.length} of {appointmentsData.length} appointments</span>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View All Appointments →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaysAppointments;