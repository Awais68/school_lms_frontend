import React, { useState, useEffect } from "react";
import { Card } from "../components/ui";

const FeeManagement = () => {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState({ status: "all", student: "" });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFee, setNewFee] = useState({
    studentId: "",
    feeType: "tuition",
    amount: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFees();
    fetchStudents();
  }, [filter]);

  const fetchFees = async () => {
    setLoading(true);
    try {
      // Using dummy data for now in a real implementation this would call the API
      const dummyFees = [
        {
          _id: 1,
          student: {
            firstName: "Alice",
            lastName: "Johnson",
            studentId: "STU-001",
          },
          feeType: "tuition",
          amount: 15000,
          dueDate: "2023-09-30",
          status: "pending",
        },
        {
          _id: 2,
          student: {
            firstName: "Bob",
            lastName: "Smith",
            studentId: "STU-002",
          },
          feeType: "transport",
          amount: 5000,
          dueDate: "2023-08-31",
          status: "paid",
        },
        {
          _id: 3,
          student: {
            firstName: "Charlie",
            lastName: "Brown",
            studentId: "STU-003",
          },
          feeType: "library",
          amount: 1000,
          dueDate: "2023-09-15",
          status: "overdue",
        },
      ];
      setFees(dummyFees);
    } catch (error) {
      console.error("Error fetching fees:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      // Using dummy data for now
      const dummyStudents = [
        {
          _id: 1,
          firstName: "Alice",
          lastName: "Johnson",
          studentId: "STU-001",
        },
        { _id: 2, firstName: "Bob", lastName: "Smith", studentId: "STU-002" },
        {
          _id: 3,
          firstName: "Charlie",
          lastName: "Brown",
          studentId: "STU-003",
        },
      ];
      setStudents(dummyStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const createFee = async () => {
    try {
      // In a real implementation, this would send to the backend
      // await api.post('/fees', newFee);

      // For demo purposes, just update local state
      const newFeeRecord = {
        _id: fees.length + 1,
        student: students.find((s) => s._id === newFee.studentId) || {
          firstName: "Unknown",
          lastName: "Student",
        },
        feeType: newFee.feeType,
        amount: parseFloat(newFee.amount),
        dueDate: newFee.dueDate,
        status: "pending",
      };

      setFees([...fees, newFeeRecord]);
      setShowCreateModal(false);
      setNewFee({ studentId: "", feeType: "tuition", amount: "", dueDate: "" });
      alert("Fee created successfully!");
    } catch (error) {
      console.error("Error creating fee:", error);
      alert("Error creating fee. Please try again.");
    }
  };

  const processPayment = async (feeId) => {
    try {
      // In a real implementation, this would send to the backend
      // await api.post(`/fees/${feeId}/pay`, { paymentMethod: 'online' });

      // For demo purposes, just update local state
      setFees(
        fees.map((fee) =>
          fee._id === feeId
            ? {
                ...fee,
                status: "paid",
                paymentDate: new Date().toISOString().split("T")[0],
              }
            : fee
        )
      );

      alert("Payment processed successfully!");
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Error processing payment. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
        <p className="text-gray-600">Manage student fees and payments</p>
      </div>

      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Student
            </label>
            <select
              value={filter.student}
              onChange={(e) =>
                setFilter({ ...filter, student: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Students</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.firstName} {student.lastName} ({student.studentId})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end md:col-span-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add New Fee
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fees.map((fee) => (
                  <tr key={fee._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {fee.student.firstName} {fee.student.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {fee.student.studentId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {fee.feeType.charAt(0).toUpperCase() +
                        fee.feeType.slice(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{fee.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(fee.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          fee.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : fee.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {fee.status.charAt(0).toUpperCase() +
                          fee.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {fee.status === "pending" && (
                        <button
                          onClick={() => processPayment(fee._id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Process Payment
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Create Fee Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Fee</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student
                </label>
                <select
                  value={newFee.studentId}
                  onChange={(e) =>
                    setNewFee({ ...newFee, studentId: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.firstName} {student.lastName} -{" "}
                      {student.studentId}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fee Type
                </label>
                <select
                  value={newFee.feeType}
                  onChange={(e) =>
                    setNewFee({ ...newFee, feeType: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="tuition">Tuition</option>
                  <option value="transport">Transport</option>
                  <option value="library">Library</option>
                  <option value="development">Development</option>
                  <option value="annual">Annual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={newFee.amount}
                  onChange={(e) =>
                    setNewFee({ ...newFee, amount: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newFee.dueDate}
                  onChange={(e) =>
                    setNewFee({ ...newFee, dueDate: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createFee}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Fee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeManagement;
