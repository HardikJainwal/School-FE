import React from 'react';
import dhruv from '../assets/dr-dhruv.jpg';


const CoachesCard = () => {
  // Dummy data for coaches - replace with your API data later
  const coaches = [
    {
      id: 1,
      name: "Dhruv",
      position: "Fitness Coach",
      image:  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      specialties: ["Weight Loss", "Strength Training", "Cardio"],
      
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Yoga Instructor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      specialties: ["Hatha Yoga", "Meditation", "Flexibility"],
      
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Nutrition Coach",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      
      specialties: ["Meal Planning", "Weight Management", "Sports Nutrition"],
     
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Personal Trainer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
     
      specialties: ["Bodybuilding", "HIIT", "Athletic Performance"],
     
    },
    {
      id: 5,
      name: "Lisa Park",
      position: "Pilates Instructor",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      
      specialties: ["Mat Pilates", "Reformer", "Core Strength"],
     
    },
    {
      id: 6,
      name: "James Wilson",
      position: "CrossFit Coach",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      
      specialties: ["CrossFit", "Olympic Lifting", "Functional Fitness"],
     
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-[#C42323] mb-4">Meet Our Expert <span className='text-[#2C8C91]'> Coaches</span></h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your fitness journey with our certified professional coaches who are dedicated to helping you achieve your goals.
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map((coach) => (
            <div
              key={coach.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Coach Image */}
              <div className="relative">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-64 object-cover"
                />
                
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Name and Position */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{coach.name}</h3>
                  <p className="text-indigo-600 font-medium">{coach.position}</p>
                </div>

                {/* Rating and Reviews */}
                

                {/* Location and Experience */}
                

                {/* Students */}
                

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {coach.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachesCard;