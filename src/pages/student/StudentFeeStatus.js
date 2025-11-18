import React, { useState } from "react";
import NavbarNew from "../../components/common/NavbarNew";
import Sidebar from "../../components/common/Sidebar";

const StudentFeeStatus = () => {
  const [feeInfo] = useState({
    studentId: "STD-2024-001",
    studentName: "John Doe",
    class: "Grade 10 - Section A",
    session: "2024-2025",
    totalFee: 50000,
    paidAmount: 30000,
    pendingAmount: 20000,
    nextDueDate: "2024-04-15",
    status: "Partially Paid",
  });

  const [feeHistory] = useState([
    {
      id: 1,
      voucherNo: "FV-2024-001",
      month: "January 2024",
      amount: 10000,
      paidDate: "2024-01-05",
      paymentMethod: "Bank Transfer",
      status: "Paid",
      receiptNo: "RCP-2024-001",
    },
    {
      id: 2,
      voucherNo: "FV-2024-002",
      month: "February 2024",
      amount: 10000,
      paidDate: "2024-02-05",
      paymentMethod: "Online Payment",
      status: "Paid",
      receiptNo: "RCP-2024-002",
    },
    {
      id: 3,
      voucherNo: "FV-2024-003",
      month: "March 2024",
      amount: 10000,
      paidDate: "2024-03-05",
      paymentMethod: "Cash",
      status: "Paid",
      receiptNo: "RCP-2024-003",
    },
    {
      id: 4,
      voucherNo: "FV-2024-004",
      month: "April 2024",
      amount: 10000,
      dueDate: "2024-04-15",
      status: "Pending",
    },
    {
      id: 5,
      voucherNo: "FV-2024-005",
      month: "May 2024",
      amount: 10000,
      dueDate: "2024-05-15",
      status: "Upcoming",
    },
  ]);

  const [feeBreakdown] = useState([
    { category: "Tuition Fee", amount: 30000 },
    { category: "Lab Fee", amount: 5000 },
    { category: "Library Fee", amount: 3000 },
    { category: "Sports Fee", amount: 4000 },
    { category: "Exam Fee", amount: 8000 },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700 border-green-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Upcoming":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Overdue":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <NavbarNew />
      <Sidebar />

      <div className="ml-16 mt-16 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Fee Status
          </h1>
          <p className="text-gray-600 mt-2">
            View and manage your fee payments
          </p>
        </div>

        {/* Student Info Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 mb-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-blue-100 text-sm">Student ID</p>
              <p className="text-xl font-bold">{feeInfo.studentId}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">Student Name</p>
              <p className="text-xl font-bold">{feeInfo.studentName}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">Class</p>
              <p className="text-xl font-bold">{feeInfo.class}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">Session</p>
              <p className="text-xl font-bold">{feeInfo.session}</p>
            </div>
          </div>
        </div>

        {/* Fee Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm">Total Fee</p>
              <div className="bg-blue-100 p-2 rounded-full">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              ₹{feeInfo.totalFee.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm">Paid Amount</p>
              <div className="bg-green-100 p-2 rounded-full">
                <svg
                  className="h-5 w-5 text-green-600"
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
            <p className="text-3xl font-bold text-green-600">
              ₹{feeInfo.paidAmount.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm">Pending Amount</p>
              <div className="bg-red-100 p-2 rounded-full">
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-red-600">
              ₹{feeInfo.pendingAmount.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm">Next Due Date</p>
              <div className="bg-yellow-100 p-2 rounded-full">
                <svg
                  className="h-5 w-5 text-yellow-600"
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
              </div>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {new Date(feeInfo.nextDueDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Fee Breakdown
          </h2>
          <div className="space-y-4">
            {feeBreakdown.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <svg
                      className="h-5 w-5 text-blue-600"
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
                  <span className="font-medium text-gray-900">
                    {item.category}
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  ₹{item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fee History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Payment History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Voucher No
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Month
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Payment Method
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {feeHistory.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4 text-gray-900 font-medium">
                      {record.voucherNo}
                    </td>
                    <td className="py-4 px-4 text-gray-900">{record.month}</td>
                    <td className="py-4 px-4 text-gray-900 font-semibold">
                      ₹{record.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {record.paidDate
                        ? new Date(record.paidDate).toLocaleDateString()
                        : record.dueDate
                        ? `Due: ${new Date(
                            record.dueDate
                          ).toLocaleDateString()}`
                        : "-"}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {record.paymentMethod || "-"}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {record.status === "Paid" ? (
                        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Download
                        </button>
                      ) : record.status === "Pending" ? (
                        <button className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transition-all text-sm font-medium">
                          Pay Now
                        </button>
                      ) : (
                        <button className="text-gray-400 font-medium text-sm cursor-not-allowed flex items-center">
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          View Voucher
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all flex items-center justify-center">
            <svg
              className="h-6 w-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="font-semibold text-lg">Make Payment</span>
          </button>

          <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all flex items-center justify-center">
            <svg
              className="h-6 w-6 mr-3"
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
            <span className="font-semibold text-lg">Generate Voucher</span>
          </button>

          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all flex items-center justify-center">
            <svg
              className="h-6 w-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-semibold text-lg">Contact Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentFeeStatus;
