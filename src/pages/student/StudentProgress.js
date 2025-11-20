import React, { useState } from "react";
import NavbarNew from "../../components/common/NavbarNew";
import Sidebar from "../../components/common/Sidebar";

const StudentProgress = () => {
  const [selectedCourse, setSelectedCourse] = useState("all");

  const overallProgress = {
    totalCourses: 6,
    completedCourses: 2,
    inProgressCourses: 4,
    overallCompletion: 67,
    totalCredits: 24,
    earnedCredits: 16
  };

  const courseProgress = [
    {
      id: 1,
      name: "Mathematics",
      completion: 85,
      modules: 12,
      completedModules: 10,
      assignments: 8,
      completedAssignments: 7,
      quizzes: 6,
      completedQuizzes: 5,
      grade: "A"
    },
    {
      id: 2,
      name: "Physics",
      completion: 70,
      modules: 10,
      completedModules: 7,
      assignments: 6,
      completedAssignments: 4,
      quizzes: 5,
      completedQuizzes: 4,
      grade: "B+"
    },
    {
      id: 3,
      name: "Chemistry",
      completion: 92,
      modules: 15,
      completedModules: 14,
      assignments: 10,
      completedAssignments: 9,
      quizzes: 8,
      completedQuizzes: 8,
      grade: "A+"
    },
    {
      id: 4,
      name: "English",
      completion: 55,
      modules: 8,
      completedModules: 4,
      assignments: 5,
      completedAssignments: 3,
      quizzes: 4,
      completedQuizzes: 2,
      grade: "B"
    },
  ];

  const milestones = [
    { id: 1, title: "Complete First Month", status: "completed", date: "Jan 2025" },
    { id: 2, title: "Mid-Term Exams", status: "completed", date: "Feb 2025" },
    { id: 3, title: "Project Submission", status: "in-progress", date: "Mar 2025" },
    { id: 4, title: "Final Exams", status: "upcoming", date: "May 2025" },
  ];

  const filteredCourses = selectedCourse === "all" 
    ? courseProgress 
    : courseProgress.filter(c => c.name === selectedCourse);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavbarNew />
      <Sidebar />

      <div className="ml-16 mt-16 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Progress</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Track your academic progress</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <p className="text-sm opacity-90 mb-2">Overall Completion</p>
            <p className="text-4xl font-bold">{overallProgress.overallCompletion}%</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <p className="text-sm opacity-90 mb-2">Completed Courses</p>
            <p className="text-4xl font-bold">{overallProgress.completedCourses}/{overallProgress.totalCourses}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <p className="text-sm opacity-90 mb-2">Credits Earned</p>
            <p className="text-4xl font-bold">{overallProgress.earnedCredits}/{overallProgress.totalCredits}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
            <p className="text-sm opacity-90 mb-2">In Progress</p>
            <p className="text-4xl font-bold">{overallProgress.inProgressCourses}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Courses</option>
            {courseProgress.map(course => (
              <option key={course.id} value={course.name}>{course.name}</option>
            ))}
          </select>
        </div>

        {/* Course Progress Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{course.name}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-semibold">
                  {course.grade}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
                  <span className="text-sm font-bold text-blue-600">{course.completion}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${course.completion}%` }}
                  />
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{course.completedModules}/{course.modules}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Modules</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{course.completedAssignments}/{course.assignments}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Assignments</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{course.completedQuizzes}/{course.quizzes}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Quizzes</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Milestones */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Academic Milestones</h2>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  milestone.status === "completed" ? "bg-green-500 text-white" :
                  milestone.status === "in-progress" ? "bg-blue-500 text-white" :
                  "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                }`}>
                  {milestone.status === "completed" ? "✓" : index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{milestone.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  milestone.status === "completed" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                  milestone.status === "in-progress" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" :
                  "bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                }`}>
                  {milestone.status.replace("-", " ").toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;
