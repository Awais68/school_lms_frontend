import React, { useState } from "react";
import NavbarNew from "../../components/common/NavbarNew";
import Sidebar from "../../components/common/Sidebar";

const StudentAssignments = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const [assignments] = useState({
    pending: [
      {
        id: 1,
        title: "Build a Responsive Portfolio Website",
        course: "Web Development Fundamentals",
        dueDate: "2024-03-20",
        totalMarks: 50,
        description:
          "Create a fully responsive portfolio website using HTML, CSS, and JavaScript",
        priority: "high",
      },
      {
        id: 2,
        title: "Data Analysis with Pandas",
        course: "Data Science with Python",
        dueDate: "2024-03-22",
        totalMarks: 40,
        description: "Analyze the provided dataset and create visualizations",
        priority: "medium",
      },
      {
        id: 3,
        title: "Mobile App UI Design",
        course: "Mobile App Development",
        dueDate: "2024-03-25",
        totalMarks: 30,
        description:
          "Design a complete UI for a social media mobile application",
        priority: "low",
      },
    ],
    submitted: [
      {
        id: 4,
        title: "SEO Optimization Report",
        course: "Digital Marketing",
        submittedDate: "2024-03-10",
        totalMarks: 45,
        obtainedMarks: 42,
        status: "graded",
        feedback: "Excellent work! Very comprehensive analysis.",
      },
      {
        id: 5,
        title: "JavaScript ES6 Features",
        course: "Web Development Fundamentals",
        submittedDate: "2024-03-12",
        totalMarks: 35,
        obtainedMarks: null,
        status: "pending-review",
        feedback: null,
      },
    ],
    overdue: [
      {
        id: 6,
        title: "Database Design Project",
        course: "Web Development Fundamentals",
        dueDate: "2024-03-05",
        totalMarks: 60,
        daysOverdue: 10,
      },
    ],
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <NavbarNew />
      <Sidebar />

      <div className="ml-16 mt-16 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Assignments
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your assignments and submissions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-blue-600">
                  {assignments.pending.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Submitted</p>
                <p className="text-3xl font-bold text-green-600">
                  {assignments.submitted.length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Overdue</p>
                <p className="text-3xl font-bold text-red-600">
                  {assignments.overdue.length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg. Score</p>
                <p className="text-3xl font-bold text-purple-600">93%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "pending"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Pending ({assignments.pending.length})
            </button>
            <button
              onClick={() => setActiveTab("submitted")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "submitted"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Submitted ({assignments.submitted.length})
            </button>
            <button
              onClick={() => setActiveTab("overdue")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "overdue"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Overdue ({assignments.overdue.length})
            </button>
          </div>
        </div>

        {/* Assignment Lists */}
        <div className="space-y-4">
          {/* Pending Assignments */}
          {activeTab === "pending" &&
            assignments.pending.map((assignment) => {
              const daysRemaining = getDaysRemaining(assignment.dueDate);
              return (
                <div
                  key={assignment.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {assignment.title}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(
                            assignment.priority
                          )}`}
                        >
                          {assignment.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        📚 {assignment.course}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {assignment.description}
                      </p>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center text-gray-600">
                          <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Due:{" "}
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </div>
                        <div
                          className={`flex items-center font-medium ${
                            daysRemaining <= 3
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {daysRemaining} days remaining
                        </div>
                        <div className="flex items-center text-gray-600">
                          <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                          </svg>
                          {assignment.totalMarks} marks
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                        Submit
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* Submitted Assignments */}
          {activeTab === "submitted" &&
            assignments.submitted.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {assignment.title}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          assignment.status === "graded"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {assignment.status === "graded"
                          ? "GRADED"
                          : "PENDING REVIEW"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      📚 {assignment.course}
                    </p>

                    <div className="flex items-center gap-6 text-sm mb-4">
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="h-5 w-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Submitted:{" "}
                        {new Date(
                          assignment.submittedDate
                        ).toLocaleDateString()}
                      </div>
                      {assignment.obtainedMarks !== null && (
                        <div className="flex items-center font-medium text-green-600">
                          <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                          </svg>
                          Score: {assignment.obtainedMarks}/
                          {assignment.totalMarks} (
                          {Math.round(
                            (assignment.obtainedMarks / assignment.totalMarks) *
                              100
                          )}
                          %)
                        </div>
                      )}
                    </div>

                    {assignment.feedback && (
                      <div className="bg-green-50 border-l-4 border-green-500 p-4">
                        <p className="text-sm font-medium text-green-800 mb-1">
                          Teacher Feedback:
                        </p>
                        <p className="text-sm text-green-700">
                          {assignment.feedback}
                        </p>
                      </div>
                    )}
                  </div>

                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-all">
                    View Submission
                  </button>
                </div>
              </div>
            ))}

          {/* Overdue Assignments */}
          {activeTab === "overdue" &&
            assignments.overdue.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-red-50 border-2 border-red-200 rounded-lg shadow-md p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {assignment.title}
                      </h3>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">
                        OVERDUE
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      📚 {assignment.course}
                    </p>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center text-red-600 font-medium">
                        <svg
                          className="h-5 w-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        {assignment.daysOverdue} days overdue
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="h-5 w-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Was due:{" "}
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="h-5 w-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                        {assignment.totalMarks} marks
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all">
                      Submit Now
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-all">
                      Contact Teacher
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignments;
