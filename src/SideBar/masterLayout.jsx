import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/devdoot-round.png';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  Syringe,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  Bell,
  CalendarDays,
  User
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'appointments', label: 'Appointments', icon: Calendar, path: '/appointments' },
  { id: 'students', label: 'Students', icon: Users, path: '/students' },
  { id: 'events', label: 'Events', icon: CalendarDays, path: '/events' }, 
  { id: 'coaches', label: 'Coaches', icon: Stethoscope, path: '/coaches' },
  { id: 'vaccination', label: 'Vaccination', icon: Syringe, path: '/vaccination' },
  { id: 'reports', label: 'Reports', icon: BarChart2, path: '/reports' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  { id: 'help', label: 'Help', icon: HelpCircle, path: '/help' },
  { id: 'logout', label: 'Logout', icon: LogOut }
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const getActiveItem = () => {
    const currentPath = location.pathname;
    const activeMenuItem = menuItems.find(item => item.path === currentPath);
    return activeMenuItem?.id || 'dashboard';
  };

  const activeItem = getActiveItem();

  const handleNavClick = (itemId, label, path) => {
    setIsOpen(false); // close sidebar on mobile
    
   
    if (itemId === 'logout') {
      return;
    }
    
    if (path) {
      navigate(path);
    }
  };

  return (
    <>
     
      <header className="w-full h-20 bg-white shadow-md flex items-center justify-between px-4 md:pl-72 fixed top-0 z-30">
       
        <button
          className="md:hidden text-[#C42323] hover:bg-gray-100 p-2 rounded-md transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>

       
        <div className="flex-1 max-w-md mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C42323] focus:border-transparent"
          />
        </div>

        
        <div className="flex items-center gap-4 text-[#C42323]">
          <button className="hover:bg-gray-100 p-2 rounded-md transition">
            <Bell size={20} />
          </button>
          <button className="hover:bg-gray-100 p-2 rounded-md transition">
            <User size={20} />
          </button>
        </div>
      </header>

      
      <aside
        className={`fixed top-0 left-0 h-full w-70 bg-gradient-to-b from-[#C42323] to-[#a11f1f] shadow-xl flex flex-col transition-transform z-40  ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        
        <div className="py-6 px-6 border-b border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <img src={Logo} alt="Logo" className="w-20 h-20" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-white tracking-wide drop-shadow-lg">
                DEVDOOT
              </h1>
              <p className="text-white/90 text-sm font-medium">Your Trusted Ally</p>
            </div>
          </div>
        </div>

        
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {menuItems.map(({ id, label, icon: Icon, path }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id, label, path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 group border-0 outline-none ${
                  activeItem === id
                    ? 'bg-white/20 text-white shadow-md'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                style={{ textDecoration: 'none', border: 'none' }}
              >
                <Icon 
                  size={20} 
                  className={`flex-shrink-0 ${activeItem === id ? 'text-white' : 'text-white/70 group-hover:text-white'}`}
                  style={{ textDecoration: 'none' }}
                />
                <span className="truncate">{label}</span>
                
                
                {activeItem === id && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </nav>
      </aside>

      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;