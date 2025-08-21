// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoutes.jsx';
import DashboardLayout from './components/DashboardLayout.jsx';
import Dashboard from './pages/Dashboard';
import EventsPage from './pages/Events.jsx';
import CoachesCard from './pages/Coaches.jsx';
import Student from './pages/Student.jsx';
import AppointmentPage from './pages/Apppointment.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <ProtectedRoute>
            <DashboardLayout>
              <Routes>
                {/* Redirect root to dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/coaches" element={<CoachesCard />} />
                <Route path="/students" element={<Student />} />
                <Route path="/appointments" element={<AppointmentPage />} />
                {/* Add more routes as needed */}
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;