import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui';

const ExpenseManagement = () => {
  const [expenses, setExpenses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    expenseType: 'utility',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    receipt: '',
    paymentMethod: 'cash',
    branchId: '',
    paidBy: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
    fetchBranches();
    fetchUsers();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/expenses');
      // setExpenses(response.data.data.expenses);
      
      // For demo purposes, using dummy data
      const dummyExpenses = [
        {
          _id: 1,
          expenseType: 'utility',
          category: 'Electricity',
          amount: 25000,
          date: '2023-09-01',
          description: 'September electricity bill',
          receipt: 'electricity_bill_sep2023.pdf',
          paymentMethod: 'bank_transfer',
          branch: { name: 'Main Campus' },
          paidBy: { firstName: 'Michael', lastName: 'Fee' },
          createdAt: '2023-09-02'
        },
        {
          _id: 2,
          expenseType: 'salary',
          category: 'Teacher Salaries',
          amount: 120000,
          date: '2023-08-31',
          description: 'Monthly teacher salaries',
          receipt: 'salary_slips_aug2023.pdf',
          paymentMethod: 'bank_transfer',
          branch: { name: 'Main Campus' },
          paidBy: { firstName: 'Michael', lastName: 'Fee' },
          createdAt: '2023-08-31'
        },
        {
          _id: 3,
          expenseType: 'maintenance',
          category: 'Building Maintenance',
          amount: 15000,
          date: '2023-08-20',
          description: 'Painting and repairs in classroom 101',
          receipt: 'maintenance_invoice.pdf',
          paymentMethod: 'check',
          branch: { name: 'Main Campus' },
          paidBy: { firstName: 'Michael', lastName: 'Fee' },
          createdAt: '2023-08-21'
        }
      ];
      setExpenses(dummyExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/branches');
      // setBranches(response.data.data.branches);
      
      // For demo purposes, using dummy data
      setBranches([
        { _id: 1, name: 'Main Campus' },
        { _id: 2, name: 'East Campus' },
        { _id: 3, name: 'West Campus' }
      ]);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/users?role=accountant');
      // setUsers(response.data.data.users);
      
      // For demo purposes, using dummy data
      setUsers([
        { _id: 1, firstName: 'Michael', lastName: 'Fee', role: 'accountant' },
        { _id: 2, firstName: 'Sarah', lastName: 'Expense', role: 'admin' },
        { _id: 3, firstName: 'Robert', lastName: 'Account', role: 'accountant' }
      ]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createExpense = async () => {
    try {
      // In a real implementation, this would send to the backend
      // await api.post('/expenses', newExpense);
      
      const expense = {
        _id: expenses.length + 1,
        ...newExpense,
        branch: branches.find(b => b._id === newExpense.branchId) || { name: 'Unknown Branch' },
        paidBy: users.find(u => u._id === newExpense.paidBy) || { firstName: 'Unknown', lastName: 'User' },
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setExpenses([...expenses, expense]);
      setShowCreateModal(false);
      setNewExpense({
        expenseType: 'utility',
        category: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        receipt: '',
        paymentMethod: 'cash',
        branchId: '',
        paidBy: ''
      });
      alert('Expense added successfully!');
    } catch (error) {
      console.error('Error creating expense:', error);
      alert('Error adding expense. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Expense Management</h1>
        <p className="text-gray-600">Manage school expenses and financial records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹{expenses.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹{expenses
                  .filter(e => new Date(e.date).getMonth() === new Date().getMonth())
                  .reduce((sum, expense) => sum + expense.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Utility Expenses</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹{expenses
                  .filter(e => e.expenseType === 'utility')
                  .reduce((sum, expense) => sum + expense.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-red-50 border-red-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹{expenses
                  .filter(e => e.expenseType === 'maintenance')
                  .reduce((sum, expense) => sum + expense.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mb-6 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Expenses</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Expense
          </button>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <tr key={expense._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        expense.expenseType === 'utility' ? 'bg-blue-100 text-blue-800' :
                        expense.expenseType === 'salary' ? 'bg-green-100 text-green-800' :
                        expense.expenseType === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {expense.expenseType.charAt(0).toUpperCase() + expense.expenseType.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expense.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{expense.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expense.branch.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expense.paidBy.firstName} {expense.paidBy.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expense.paymentMethod.charAt(0).toUpperCase() + expense.paymentMethod.slice(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add Expense Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add New Expense</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expense Type</label>
                <select
                  value={newExpense.expenseType}
                  onChange={(e) => setNewExpense({...newExpense, expenseType: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="building">Building Maintenance</option>
                  <option value="utility">Utility</option>
                  <option value="salary">Salary</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter category (e.g., Electricity, Water, Salaries)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <select
                  value={newExpense.branchId}
                  onChange={(e) => setNewExpense({...newExpense, branchId: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Branch</option>
                  {branches.map(branch => (
                    <option key={branch._id} value={branch._id}>{branch.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paid By</label>
                <select
                  value={newExpense.paidBy}
                  onChange={(e) => setNewExpense({...newExpense, paidBy: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={newExpense.paymentMethod}
                  onChange={(e) => setNewExpense({...newExpense, paymentMethod: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="cash">Cash</option>
                  <option value="check">Check</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="online">Online</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter expense description"
                  rows="3"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Receipt/Invoice</label>
                <input
                  type="text"
                  value={newExpense.receipt}
                  onChange={(e) => setNewExpense({...newExpense, receipt: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter receipt filename or URL"
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
                onClick={createExpense}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseManagement;