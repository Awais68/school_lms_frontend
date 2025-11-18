import React, { useState, useEffect, useCallback } from "react";
import { Card, Chart } from "../components/ui";
import { useAuth } from "../context/AuthContext";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState({
    profile: null,
    attendance: null,
    grades: [],
    fees: [],
    courses: [],
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const fetchStudentData = useCallback(async () => {
    try {
      setLoading(true);

      // In a real implementation, we would get the student ID from the user profile
      // For now, using dummy data
      const profileData = {
        firstName: user?.firstName || "John",
        lastName: user?.lastName || "Doe",
        studentId: "STU-2023-001",
        rollNumber: "1",
        className: "Grade 8",
        sectionName: "A",
        admissionDate: "2023-08-15",
        parentName: "Robert Doe",
      };

      setStudentData({
        profile: profileData,
        attendance: {
          totalDays: 30,
          presentDays: 28,
          absentDays: 2,
          attendanceRate: 93,
        },
        grades: [
          {
            course: "Mathematics",
            type: "Assignment",
            points: "45/50",
            percentage: 90,
            grade: "A",
          },
          {
            course: "Science",
            type: "Quiz",
            points: "18/20",
            percentage: 90,
            grade: "A",
          },
          {
            course: "English",
            type: "Exam",
            points: "85/100",
            percentage: 85,
            grade: "B+",
          },
        ],
        fees: [
          {
            type: "Tuition",
            amount: 15000,
            dueDate: "2023-08-31",
            status: "Paid",
          },
          {
            type: "Library",
            amount: 1000,
            dueDate: "2023-09-30",
            status: "Pending",
          },
        ],
        courses: [
          {
            title: "Mathematics",
            teacher: "Ms. Smith",
            schedule: "Mon, Wed, Fri 9:00-9:45 AM",
          },
          {
            title: "Science",
            teacher: "Mr. Johnson",
            schedule: "Tue, Thu 10:00-10:45 AM",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStudentData();
  }, [activeTab, fetchStudentData]);

  const tabs = [
    { id: "overview", name: "Overview" },
    { id: "attendance", name: "Attendance" },
    { id: "grades", name: "Grades" },
    { id: "fees", name: "Fees" },
    { id: "courses", name: "Courses" },
  ];

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.firstName}</p>
      </div>

      {/* Profile Summary */}
      {studentData.profile && (
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">
                  {studentData.profile.firstName.charAt(0)}
                  {studentData.profile.lastName.charAt(0)}
                </span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold text-gray-900">
                {studentData.profile.firstName} {studentData.profile.lastName}
              </h2>
              <p className="text-gray-600">
                Student ID: {studentData.profile.studentId}
              </p>
              <p className="text-gray-600">
                Class: {studentData.profile.className} -{" "}
                {studentData.profile.sectionName}
              </p>
              <p className="text-gray-600">
                Roll No: {studentData.profile.rollNumber}
              </p>
              <p className="text-gray-600">
                Parent: {studentData.profile.parentName}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <Card className="p-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Attendance Summary</h3>
              {studentData.attendance && (
                <div className="space-y-3">
                  <p className="text-sm">
                    Total Days: {studentData.attendance.totalDays}
                  </p>
                  <p className="text-sm">
                    Present: {studentData.attendance.presentDays}
                  </p>
                  <p className="text-sm">
                    Absent: {studentData.attendance.absentDays}
                  </p>
                  <p className="text-sm font-semibold">
                    Attendance Rate: {studentData.attendance.attendanceRate}%
                  </p>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Recent Grades</h3>
              <div className="space-y-2">
                {studentData.grades.slice(0, 3).map((grade, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <div>
                      <span className="font-medium">{grade.course}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({grade.type})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{grade.percentage}%</span>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {grade.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "attendance" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Attendance Details</h3>
            <Chart type="bar" data={[]} />
            <div className="mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2023-09-01
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Present
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Mathematics
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2023-08-31
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Present
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Science
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2023-08-30
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Absent
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      English
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "grades" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Grade Details</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentData.grades.map((grade, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {grade.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {grade.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {grade.points}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {grade.percentage}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {grade.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "fees" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Fee Status</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fee Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentData.fees.map((fee, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {fee.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{fee.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {fee.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            fee.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {fee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Enrolled Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentData.courses.map((course, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h4 className="font-medium text-gray-900">{course.title}</h4>
                  <p className="text-sm text-gray-600">
                    Teacher: {course.teacher}
                  </p>
                  <p className="text-sm text-gray-600">{course.schedule}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudentDashboard;
