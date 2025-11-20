import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import NavbarNew from "../../components/common/NavbarNew";
import Sidebar from "../../components/common/Sidebar";

const StudentFeeStatus = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  const feeRecords = [
    {
      id: 1,
      month: "January 2025",
      amount: 5000,
      status: "Paid",
      dueDate: "2025-01-10",
      paidDate: "2025-01-08",
      voucherNumber: "VCH-2025-001",
    },
    {
      id: 2,
      month: "February 2025",
      amount: 5000,
      status: "Paid",
      dueDate: "2025-02-10",
      paidDate: "2025-02-09",
      voucherNumber: "VCH-2025-002",
    },
    {
      id: 3,
      month: "March 2025",
      amount: 5000,
      status: "Pending",
      dueDate: "2025-03-10",
      paidDate: null,
      voucherNumber: "VCH-2025-003",
    },
    {
      id: 4,
      month: "April 2025",
      amount: 5000,
      status: "Overdue",
      dueDate: "2025-04-10",
      paidDate: null,
      voucherNumber: "VCH-2025-004",
    },
  ];

  const filteredRecords = feeRecords.filter((record) => {
    const matchesSearch = record.month
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      record.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const downloadVoucher = (record) => {
    // Create a simple voucher HTML
    const voucherHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Fee Voucher - ${record.voucherNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          .voucher { border: 2px solid #000; padding: 30px; max-width: 600px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 30px; }
          .row { display: flex; justify-content: space-between; margin: 10px 0; }
          .footer { margin-top: 30px; border-top: 1px solid #ccc; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="voucher">
          <div class="header">
            <h1>School LMS</h1>
            <h2>Fee Voucher</h2>
          </div>
          <div class="row"><strong>Voucher Number:</strong> ${record.voucherNumber}</div>
          <div class="row"><strong>Student Name:</strong> ${user?.firstName} ${user?.lastName}</div>
          <div class="row"><strong>Month:</strong> ${record.month}</div>
          <div class="row"><strong>Amount:</strong> PKR ${record.amount}</div>
          <div class="row"><strong>Due Date:</strong> ${record.dueDate}</div>
          <div class="row"><strong>Status:</strong> ${record.status}</div>
          ${record.paidDate ? `<div class="row"><strong>Paid Date:</strong> ${record.paidDate}</div>` : ''}
          <div class="footer">
            <p style="text-align: center; font-size: 12px;">This is a computer-generated voucher.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([voucherHTML], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Voucher_${record.voucherNumber}.html`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const viewVoucher = (record) => {
    const voucherWindow = window.open('', '_blank');
    voucherWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Fee Voucher - ${record.voucherNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
          .voucher { background: white; border: 2px solid #333; padding: 40px; max-width: 700px; margin: 0 auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
          .header h1 { margin: 0; color: #2563eb; }
          .header h2 { margin: 10px 0 0 0; color: #666; }
          .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px dashed #ddd; }
          .row strong { color: #333; }
          .amount-box { background: #f0f9ff; border: 2px solid #2563eb; padding: 20px; margin: 20px 0; text-align: center; }
          .amount-box .label { font-size: 14px; color: #666; }
          .amount-box .amount { font-size: 32px; font-weight: bold; color: #2563eb; margin: 10px 0; }
          .status { display: inline-block; padding: 6px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; }
          .status.paid { background: #dcfce7; color: #166534; }
          .status.pending { background: #fef3c7; color: #854d0e; }
          .status.overdue { background: #fee2e2; color: #991b1b; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #333; text-align: center; font-size: 12px; color: #666; }
          @media print { body { background: white; } .voucher { box-shadow: none; } }
        </style>
      </head>
      <body>
        <div class="voucher">
          <div class="header">
            <h1>🎓 School LMS</h1>
            <h2>Fee Payment Voucher</h2>
          </div>
          <div class="row">
            <strong>Voucher Number:</strong>
            <span>${record.voucherNumber}</span>
          </div>
          <div class="row">
            <strong>Student Name:</strong>
            <span>${user?.firstName} ${user?.lastName}</span>
          </div>
          <div class="row">
            <strong>Fee Month:</strong>
            <span>${record.month}</span>
          </div>
          <div class="row">
            <strong>Due Date:</strong>
            <span>${record.dueDate}</span>
          </div>
          ${record.paidDate ? `<div class="row"><strong>Paid Date:</strong><span>${record.paidDate}</span></div>` : ''}
          <div class="amount-box">
            <div class="label">Total Amount</div>
            <div class="amount">PKR ${record.amount.toLocaleString()}</div>
          </div>
          <div class="row">
            <strong>Payment Status:</strong>
            <span class="status ${record.status.toLowerCase()}">${record.status}</span>
          </div>
          <div class="footer">
            <p><strong>Bank Details for Payment:</strong></p>
            <p>Account Title: School LMS | Account Number: 1234567890 | Bank: ABC Bank</p>
            <p style="margin-top: 20px;">This is a computer-generated voucher. No signature required.</p>
            <p style="margin-top: 10px;"><button onclick="window.print()" style="padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer;">Print Voucher</button></p>
          </div>
        </div>
      </body>
      </html>
    `);
  };

  const generateVoucher = () => {
    const newVoucher = {
      id: feeRecords.length + 1,
      month: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      amount: 5000,
      status: "Pending",
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      paidDate: null,
      voucherNumber: `VCH-2025-${String(feeRecords.length + 1).padStart(3, '0')}`,
    };
    alert(`New voucher generated: ${newVoucher.voucherNumber}`);
    viewVoucher(newVoucher);
  };

  const makePayment = (record) => {
    setSelectedFee(record);
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    alert(`Payment of PKR ${selectedFee.amount} processed successfully for ${selectedFee.month}`);
    setShowPaymentModal(false);
  };

  const contactAdmin = () => {
    window.location.href = "mailto:admin@schoollms.com?subject=Fee Inquiry&body=Hello, I have a question about my fee status.";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavbarNew />
      <Sidebar />

      <div className="ml-16 mt-16 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Fee Status
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            View and manage your fee payments
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Paid</p>
                <p className="text-3xl font-bold text-green-600">PKR 10,000</p>
              </div>
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">PKR 5,000</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Overdue</p>
                <p className="text-3xl font-bold text-red-600">PKR 5,000</p>
              </div>
              <div className="h-12 w-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚠</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Due</p>
                <p className="text-3xl font-bold text-blue-600">PKR 20,000</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 flex-1">
              <input
                type="text"
                placeholder="Search by month..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={generateVoucher}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
              >
                Generate Voucher
              </button>
              <button
                onClick={contactAdmin}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all"
              >
                Contact Admin
              </button>
            </div>
          </div>
        </div>

        {/* Fee Records Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Voucher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {record.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      PKR {record.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {record.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.status === "Paid"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : record.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {record.voucherNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => viewVoucher(record)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          View
                        </button>
                        <button
                          onClick={() => downloadVoucher(record)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        >
                          Download
                        </button>
                        {record.status !== "Paid" && (
                          <button
                            onClick={() => makePayment(record)}
                            className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
                          >
                            Pay Now
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && selectedFee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Make Payment
              </h2>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Month:</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedFee.month}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Amount:</p>
                  <p className="text-2xl font-bold text-blue-600">
                    PKR {selectedFee.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Payment Method
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                    <option>Bank Transfer</option>
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                    <option>Cash</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={processPayment}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
                >
                  Confirm Payment
                </button>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentFeeStatus;
