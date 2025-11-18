import React, { useState } from "react";
import NavbarNew from "../../components/common/NavbarNew";
import Sidebar from "../../components/common/Sidebar";

const StudentCourses = () => {
  const [courses] = useState([
    {
      id: 1,
      title: "Web Development Fundamentals",
      instructor: "Dr. Sarah Johnson",
      progress: 75,
      enrolled: "2024-01-15",
      duration: "12 weeks",
      status: "In Progress",
      thumbnail: "🌐",
      students: 45,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Data Science with Python",
      instructor: "Prof. Michael Chen",
      progress: 60,
      enrolled: "2024-01-20",
      duration: "16 weeks",
      status: "In Progress",
      thumbnail: "📊",
      students: 38,
      rating: 4.9,
    },
    {
      id: 3,
      title: "Mobile App Development",
      instructor: "Dr. Emily Davis",
      progress: 45,
      enrolled: "2024-02-01",
      duration: "14 weeks",
      status: "In Progress",
      thumbnail: "📱",
      students: 52,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Digital Marketing",
      instructor: "Mr. James Wilson",
      progress: 100,
      enrolled: "2023-11-10",
      duration: "10 weeks",
      status: "Completed",
      thumbnail: "📈",
      students: 65,
      rating: 4.6,
    },
  ]);

  const [availableCourses] = useState([
    {
      id: 5,
      title: "Artificial Intelligence Basics",
      instructor: "Dr. Robert Brown",
      duration: "15 weeks",
      thumbnail: "🤖",
      students: 42,
      rating: 4.9,
      price: "Free",
    },
    {
      id: 6,
      title: "Cloud Computing with AWS",
      instructor: "Ms. Jennifer Lee",
      duration: "12 weeks",
      thumbnail: "☁️",
      students: 55,
      rating: 4.8,
      price: "Free",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <NavbarNew />
      <Sidebar />

      <div className="ml-16 mt-16 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Courses
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and track your enrolled courses
          </p>
        </div>

        {/* Enrolled Courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Enrolled Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-6xl">{course.thumbnail}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        course.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {course.status}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm text-gray-600">
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">Instructor:</span>{" "}
                    {course.instructor}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>⏱️ {course.duration}</span>
                    <span>👥 {course.students} students</span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:shadow-lg transition-all">
                    {course.status === "Completed"
                      ? "Review Course"
                      : "Continue Learning"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Courses */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Available Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="h-40 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                  <span className="text-6xl">{course.thumbnail}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      {course.price}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm text-gray-600">
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">Instructor:</span>{" "}
                    {course.instructor}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>⏱️ {course.duration}</span>
                    <span>👥 {course.students} students</span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-2 rounded-lg hover:shadow-lg transition-all">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;
