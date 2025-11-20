import React, { useState } from "react";
import NavbarNew from "../../components/common/NavbarNew";
import Sidebar from "../../components/common/Sidebar";

const StudentTeachers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const teachers = [
    {
      id: 1,
      name: "Dr. John Smith",
      subject: "Mathematics",
      email: "john.smith@school.com",
      phone: "+1 234 567 8901",
      officeHours: "Mon-Fri: 2:00 PM - 4:00 PM",
      bio: "PhD in Mathematics with 15 years of teaching experience",
      schedule: [
        { day: "Monday", time: "9:00 AM - 11:00 AM", class: "Calculus I" },
        { day: "Wednesday", time: "10:00 AM - 12:00 PM", class: "Algebra II" },
      ]
    },
    {
      id: 2,
      name: "Prof. Sarah Johnson",
      subject: "Physics",
      email: "sarah.j@school.com",
      phone: "+1 234 567 8902",
      officeHours: "Tue-Thu: 3:00 PM - 5:00 PM",
      bio: "Physics professor specializing in Quantum Mechanics",
      schedule: [
        { day: "Tuesday", time: "11:00 AM - 1:00 PM", class: "Physics 101" },
        { day: "Thursday", time: "2:00 PM - 4:00 PM", class: "Advanced Physics" },
      ]
    },
    {
      id: 3,
      name: "Dr. Emily Brown",
      subject: "Chemistry",
      email: "emily.b@school.com",
      phone: "+1 234 567 8903",
      officeHours: "Mon-Wed: 1:00 PM - 3:00 PM",
      bio: "Organic Chemistry expert with research in polymer science",
      schedule: [
        { day: "Monday", time: "8:00 AM - 10:00 AM", class: "Chemistry I" },
        { day: "Friday", time: "9:00 AM - 11:00 AM", class: "Organic Chemistry" },
      ]
    },
    {
      id: 4,
      name: "Mr. Michael Davis",
      subject: "English",
      email: "michael.d@school.com",
      phone: "+1 234 567 8904",
      officeHours: "Mon-Fri: 12:00 PM - 2:00 PM",
      bio: "English literature specialist with MA in Creative Writing",
      schedule: [
        { day: "Tuesday", time: "9:00 AM - 11:00 AM", class: "Literature" },
        { day: "Thursday", time: "1:00 PM - 3:00 PM", class: "Writing Workshop" },
      ]
    },
  ];

  const subjects = [...new Set(teachers.map(t => t.subject))];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSubject === "all" || teacher.subject === filterSubject;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavbarNew />
      <Sidebar />

      <div className="ml-16 mt-16 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teachers</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Connect with your instructors</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-24"></div>
              <div className="p-6 -mt-12">
                <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-blue-600 border-4 border-white dark:border-gray-800">
                  {teacher.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-1">{teacher.name}</h3>
                <p className="text-center text-blue-600 dark:text-blue-400 font-semibold mb-4">{teacher.subject}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">{teacher.bio}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>📧</span>
                    <a href={`mailto:${teacher.email}`} className="hover:text-blue-600">{teacher.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>📞</span>
                    <span>{teacher.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>🕒</span>
                    <span>{teacher.officeHours}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTeacher(teacher)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
                >
                  View Schedule
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Teacher Detail Modal */}
        {selectedTeacher && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedTeacher.name}</h2>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-6">{selectedTeacher.subject}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {selectedTeacher.email}</p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> {selectedTeacher.phone}</p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Office Hours:</strong> {selectedTeacher.officeHours}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Teaching Schedule</h3>
                <div className="space-y-3">
                  {selectedTeacher.schedule.map((slot, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{slot.class}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{slot.day}</p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-semibold">
                          {slot.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-400"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedTeacher.email}`}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTeachers;
