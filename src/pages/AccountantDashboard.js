import React from 'react';
import { Card, Chart } from '../components/ui';

const AccountantDashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Accountant Dashboard</h1>
        <p className="text-gray-600">Financial Management System</p>
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
              <p className="text-sm font-medium text-gray-600">Total Fees</p>
              <p className="text-2xl font-semibold text-gray-900">₹2,50,000</p>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Collected</p>
              <p className="text-2xl font-semibold text-gray-900">₹2,10,000</p>
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
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">₹40,000</p>
            </div>
          </div>
        </Card>

        <Card className="bg-red-50 border-red-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-semibold text-gray-900">₹15,000</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Fee Collection Overview</h3>
          <Chart type="bar" data={[]} />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Expense Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>Utilities</span>
              <span className="font-medium">₹50,000</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>Salaries</span>
              <span className="font-medium">₹1,20,000</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>Maintenance</span>
              <span className="font-medium">₹25,000</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>Other</span>
              <span className="font-medium">₹15,000</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 border-b border-gray-200">
              <div>
                <p className="font-medium">Alice Johnson</p>
                <p className="text-sm text-gray-600">Tuition Fee</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">+₹15,000</p>
                <p className="text-xs text-gray-500">Today</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 border-b border-gray-200">
              <div>
                <p className="font-medium">Bob Smith</p>
                <p className="text-sm text-gray-600">Annual Fee</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">+₹25,000</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Pending Payments</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 border-b border-gray-200">
              <div>
                <p className="font-medium">Charlie Brown</p>
                <p className="text-sm text-gray-600">Library Fee</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-red-600">₹1,000</p>
                <p className="text-xs text-gray-500">Due: 2023-09-30</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 border-b border-gray-200">
              <div>
                <p className="font-medium">Diana Prince</p>
                <p className="text-sm text-gray-600">Development Fee</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-red-600">₹5,000</p>
                <p className="text-xs text-gray-500">Due: 2023-08-31</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AccountantDashboard;