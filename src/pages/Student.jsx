import React, { useState, useMemo } from "react";
import { Download, Upload, X, User, Calendar, GraduationCap, Clock, Phone, Mail, MapPin, FileText, Filter } from "lucide-react";

const Student = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState("All Classes");
  
  const studentData = [
    {
      id: 1,
      name: "Dummy 1",
      class: "5th Grade",
      lastchecked: "2023-10-01",
      nextappointment: "2023-10-15",
      action: "View Details",
      email: "dummy1@school.edu",
      phone: "+1-234-567-8901",
    },
    {
      id: 2,
      name: "Dummy 2",
      class: "10th Grade",
      lastchecked: "2023-10-02",
      nextappointment: "2023-10-16",
      action: "View Details",
      email: "dummy2@school.edu",
      phone: "+1-234-567-8902",
    },
    {
      id: 3,
      name: "Dummy 3",
      class: "5th Grade",
      lastchecked: "2023-10-03",
      nextappointment: "2023-10-17",
      action: "View Details",
      email: "dummy3@school.edu",
      phone: "+1-234-567-8904",
    },
    {
      id: 4,
      name: "Dummy 4",
      class: "8th Grade",
      lastchecked: "2023-10-04",
      nextappointment: "2023-10-18",
      action: "View Details",
      email: "dummy4@school.edu",
      phone: "+1-234-567-8906",
    },
    {
      id: 5,
      name: "Dummy 5",
      class: "10th Grade",
      lastchecked: "2023-10-05",
      nextappointment: "2023-10-19",
      action: "View Details",
      email: "dummy5@school.edu",
      phone: "+1-234-567-8908",
    },
    {
      id: 6,
      name: "Dummy 6",
      class: "8th Grade",
      lastchecked: "2023-10-06",
      nextappointment: "2023-10-20",
      action: "View Details",
      email: "dummy6@school.edu",
      phone: "+1-234-567-8910",
    },
    {
      id: 7,
      name: "Dummy 7",
      class: "5th Grade",
      lastchecked: "2023-10-07",
      nextappointment: "2023-10-21",
      action: "View Details",
      email: "dummy7@school.edu",
      phone: "+1-234-567-8912",
    },
    {
      id: 8,
      name: "Dummy 8",
      class: "12th Grade",
      lastchecked: "2023-10-08",
      nextappointment: "2023-10-22",
      action: "View Details",
      email: "dummy8@school.edu",
      phone: "+1-234-567-8914",
    },
  ];

  // Get unique classes for filter dropdown
  const availableClasses = useMemo(() => {
    const classes = [...new Set(studentData.map(student => student.class))];
    return ["All Classes", ...classes.sort()];
  }, []);

  // Filter students based on selected class
  const filteredStudents = useMemo(() => {
    if (selectedClass === "All Classes") {
      return studentData;
    }
    return studentData.filter(student => student.class === selectedClass);
  }, [selectedClass]);

  // Get count for current filter
  const studentCount = filteredStudents.length;
  const totalStudents = studentData.length;

  const downloadExcel = () => {
    const headers = ["ID", "Name", "Class", "Last Checked", "Next Appointment", "Email", "Phone"];
    const csvContent = [
      headers.join(","),
      ...filteredStudents.map(student => [
        student.id,
        student.name,
        student.class,
        student.lastchecked,
        student.nextappointment,
        student.email,
        student.phone,
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `students_data_${selectedClass.replace(/\s+/g, '_')}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File uploaded:", file.name);
      setShowUploadModal(false);
    }
  };

  const viewStudentDetails = (student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-8">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8 p-6">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
              Students <span className="text-[#2C8C91]"> Records</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Manage all student health records and information with our comprehensive dashboard.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={downloadExcel}
              className="flex items-center gap-2 px-6 py-3 bg-[#2C8C91] text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Download size={20} />
              Download Excel
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#C42323] text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Upload size={20} />
              Upload Excel
            </button>
          </div>
        </div>

       
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="text-gray-600" size={20} />
                <label htmlFor="classFilter" className="text-lg font-semibold text-gray-700">
                  Filter by Class:
                </label>
              </div>
              <select
                id="classFilter"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C8C91] focus:border-transparent bg-white text-gray-700 font-medium min-w-[150px]"
              >
                {availableClasses.map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#2C8C91]">{studentCount}</p>
                <p className="text-sm text-gray-600">
                  {selectedClass === "All Classes" ? "Total Students" : `Students in ${selectedClass}`}
                </p>
              </div>
              {selectedClass !== "All Classes" && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-500">{totalStudents}</p>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
              )}
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#C42323] text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">#</th>
                  <th className="py-4 px-6 text-left font-semibold">Name</th>
                  <th className="py-4 px-6 text-left font-semibold">Class</th>
                  <th className="py-4 px-6 text-left font-semibold">Last Checked</th>
                  <th className="py-4 px-6 text-left font-semibold">Next Appointment</th>
                  <th className="py-4 px-6 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr 
                      key={student.id} 
                      className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                    >
                      <td className="py-4 px-6 text-gray-800 font-medium">{index + 1}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-800">{student.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-purple-100 text-[#2C8C91] rounded-full text-sm font-medium">
                          {student.class}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{student.lastchecked}</td>
                      <td className="py-4 px-6 text-gray-600">{student.nextappointment}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => viewStudentDetails(student)}
                          className="px-4 py-2 bg-[#2C8C91] text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 px-6 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <GraduationCap size={48} className="text-gray-300" />
                        <p className="text-lg">No students found in {selectedClass}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        
        {showUploadModal && (
         <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Upload Student Data</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">Select an Excel file to upload student data</p>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Choose File
                </label>
              </div>
            </div>
          </div>
        )}

        
        {selectedStudent && (
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
              
              <div className="bg-[#2C8C91] text-white p-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div>
                      <h2 className="text-3xl font-bold">{selectedStudent.name}</h2>
                      <p className="text-indigo-200">{selectedStudent.class}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <User className="text-indigo-600" size={24} />
                      Personal Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="text-gray-600" size={20} />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-semibold">{selectedStudent.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="text-gray-600" size={20} />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-semibold">{selectedStudent.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Calendar className="text-green-600" size={24} />
                      Appointment Details
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Clock className="text-gray-600" size={20} />
                        <div>
                          <p className="text-sm text-gray-600">Last Checked</p>
                          <p className="font-semibold">{selectedStudent.lastchecked}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <Calendar className="text-green-600" size={20} />
                        <div>
                          <p className="text-sm text-gray-600">Next Appointment</p>
                          <p className="font-semibold text-green-700">{selectedStudent.nextappointment}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                  <button
                    onClick={closeModal}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;