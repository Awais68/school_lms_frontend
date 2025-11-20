import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import NavbarNew from "../components/common/NavbarNew";
import Sidebar from "../components/common/Sidebar";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [, setLoading] = useState(true);
  const [stats] = useState({
    enrolledCourses: 5,
    completedCourses: 2,
    pendingAssignments: 3,
    upcomingQuizzes: 2,
    attendanceRate: 92,
    feeStatus: "Paid",
  });

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const quickLinks = [
    {
      title: "My Courses",
      description: "View and manage enrolled courses",
      icon: "📚",
      link: "/student/courses",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Video Call",
      description: "Join live classes",
      icon: "📹",
      link: "/student/video-call",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Attendance",
      description: "View attendance records",
      icon: "✅",
      link: "/student/attendance",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Fee Status",
      description: "Check payment status",
      icon: "💰",
      link: "/student/fee-status",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Assignments",
      description: "View and submit assignments",
      icon: "📝",
      link: "/student/assignments",
      color: "from-red-500 to-red-600",
    },
    {
      title: "Quizzes",
      description: "Take quizzes and tests",
      icon: "❓",
      link: "/student/quizzes",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Results",
      description: "View your results",
      icon: "🏆",
      link: "/student/results",
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Discussions",
      description: "Join class discussions",
      icon: "💬",
      link: "/student/discussions",
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <NavbarNew />
      <Sidebar />

      <div className="ml-16 mt-16 transition-all duration-300">
        <div className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.firstName || "Student"}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Here's what's happening with your courses today
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Enrolled Courses</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.enrolledCourses}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Attendance Rate</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.attendanceRate}%
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending Tasks</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.pendingAssignments}
                  </p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Fee Status</p>
                  <p className="text-xl font-bold text-green-600">
                    {stats.feeStatus}
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Quick Access
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${link.color}`}></div>
                  <div className="p-6">
                    <div className="text-4xl mb-3">{link.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {link.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{link.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Classes */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Upcoming Classes
              </h3>
              <div className="space-y-4">
                {[
                  {
                    subject: "Mathematics",
                    time: "10:00 AM",
                    teacher: "Dr. Smith",
                    type: "Live",
                  },
                  {
                    subject: "Physics",
                    time: "2:00 PM",
                    teacher: "Prof. Johnson",
                    type: "Live",
                  },
                  {
                    subject: "Chemistry",
                    time: "4:00 PM",
                    teacher: "Dr. Williams",
                    type: "Recorded",
                  },
                ].map((cls, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🎓</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {cls.subject}
                        </p>
                        <p className="text-sm text-gray-600">{cls.teacher}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">
                        {cls.time}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          cls.type === "Live"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {cls.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recent Announcements
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Mid-term Exam Schedule Released",
                    date: "2 hours ago",
                    type: "Important",
                  },
                  {
                    title: "New Assignment Posted - Mathematics",
                    date: "5 hours ago",
                    type: "Assignment",
                  },
                  {
                    title: "Holiday Notice - Next Week",
                    date: "1 day ago",
                    type: "Notice",
                  },
                ].map((announcement, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {announcement.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {announcement.date}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2 ${
                          announcement.type === "Important"
                            ? "bg-red-100 text-red-700"
                            : announcement.type === "Assignment"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {announcement.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Course Progress
            </h3>
            <div className="space-y-4">
              {[
                { name: "Web Development", progress: 75, color: "blue" },
                { name: "Data Science", progress: 60, color: "green" },
                {
                  name: "Mobile App Development",
                  progress: 45,
                  color: "purple",
                },
                { name: "Digital Marketing", progress: 30, color: "pink" },
              ].map((course, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {course.name}
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-${course.color}-600 h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
