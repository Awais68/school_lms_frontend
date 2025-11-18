import React, { useState, useEffect } from "react";
import { Card } from "../components/ui";
import api from "../services/api";
import { format } from "date-fns";

const AttendanceScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchClasses();
    fetchAttendanceData();
  }, [selectedDate, selectedClass]);

  const fetchClasses = async () => {
    try {
      const response = await api.get("/classes");
      setClasses(response.data.data.classes || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchAttendanceData = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from backend
      // Using dummy data for now
      const dummyData = [
        {
          student: {
            _id: 1,
            firstName: "Alice",
            lastName: "Johnson",
            rollNumber: "1",
            profilePicture: null,
          },
          status: "present",
        },
        {
          student: {
            _id: 2,
            firstName: "Bob",
            lastName: "Smith",
            rollNumber: "2",
            profilePicture: null,
          },
          status: "absent",
        },
        {
          student: {
            _id: 3,
            firstName: "Charlie",
            lastName: "Brown",
            rollNumber: "3",
            profilePicture: null,
          },
          status: "present",
        },
      ];
      setAttendanceData(dummyData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateAttendance = async (studentId, status) => {
    // In a real implementation, this would update the backend
    setAttendanceData((prev) =>
      prev.map((record) =>
        record.student._id === studentId ? { ...record, status } : record
      )
    );
  };

  const saveAttendance = async () => {
    setSaving(true);
    try {
      // In a real implementation, this would send the attendance data to backend
      // await api.post('/attendance/mark', {
      //   attendanceRecords: attendanceData.map(record => ({
      //     student: record.student._id,
      //     status: record.status,
      //     date: selectedDate,
      //     method: 'manual'
      //   }))
      // });

      alert("Attendance saved successfully!");
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Error saving attendance. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Attendance Management
        </h1>
        <p className="text-gray-600">Mark and manage student attendance</p>
      </div>

      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={format(selectedDate, "yyyy-MM-dd")}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name} - {cls.sectionName || "Section A"}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={saveAttendance}
              disabled={saving}
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Attendance"}
            </button>
          </div>
        </div>
      </Card>

      <Card>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceData.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {record.student.profilePicture ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={record.student.profilePicture}
                              alt=""
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-800">
                                {record.student.firstName.charAt(0)}
                                {record.student.lastName.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {record.student.firstName} {record.student.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.student.rollNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.status === "present"
                            ? "bg-green-100 text-green-800"
                            : record.status === "absent"
                            ? "bg-red-100 text-red-800"
                            : record.status === "late"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {record.status.charAt(0).toUpperCase() +
                          record.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            updateAttendance(record.student._id, "present")
                          }
                          className={`px-3 py-1 rounded-md text-sm ${
                            record.status === "present"
                              ? "bg-green-600 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() =>
                            updateAttendance(record.student._id, "absent")
                          }
                          className={`px-3 py-1 rounded-md text-sm ${
                            record.status === "absent"
                              ? "bg-red-600 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() =>
                            updateAttendance(record.student._id, "late")
                          }
                          className={`px-3 py-1 rounded-md text-sm ${
                            record.status === "late"
                              ? "bg-yellow-600 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AttendanceScreen;
