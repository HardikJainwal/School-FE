import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './SideBar/masterLayout.jsx';
// import Sidebar from '../SideBar/masterLayout.jsx';
import Dashboard from './pages/Dashboard';
import EventsPage from './pages/Events.jsx';
import CoachesCard from './pages/Coaches.jsx';
import Student from './pages/Student.jsx';
import AppointmentPage from './pages/Apppointment.jsx';
// import Appointments from './pages/Appointments';
// ... other page imports

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar/>
        <main className="md:ml-64 pt-20 min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/events" element={<EventsPage/>}/>
            <Route path='/coaches' element={<CoachesCard/>}/> 
            <Route path='/students' element={<Student/>}/>  
            <Route path='/appointments' element={<AppointmentPage/>}/>       
            {/* <Route path="/appointments" element={<Appointments />} />
            <Route path="/students" element={<Students />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/vaccination" element={<Vaccination />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;