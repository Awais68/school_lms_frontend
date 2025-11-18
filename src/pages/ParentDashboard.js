import React from 'react';
import { Card, Chart } from '../components/ui';

const ParentDashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
        <p className="text-gray-600">Welcome back, Mr. Johnson</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">My Children</p>
              <p className="text-2xl font-semibold text-gray-900">2</p>
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
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-semibold text-gray-900">92%</p>
            </div>
          </div>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Fees</p>
              <p className="text-2xl font-semibold text-gray-900">₹1,000</p>
            </div>
          </div>
        </Card>

        <Card className="bg-purple-50 border-purple-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Grade</p>
              <p className="text-2xl font-semibold text-gray-900">A-</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">My Children</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-800">AJ</span>
              </div>
              <div className="ml-4 flex-1">
                <h4 className="font-medium">Alice Johnson</h4>
                <p className="text-sm text-gray-600">Grade 8A, Roll: 1</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">View Details</button>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-sm font-medium text-green-800">BJ</span>
              </div>
              <div className="ml-4 flex-1">
                <h4 className="font-medium">Bob Johnson</h4>
                <p className="text-sm text-gray-600">Grade 6B, Roll: 15</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">View Details</button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Grades</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <span className="font-medium">Mathematics</span>
                <span className="text-xs text-gray-500 ml-2">Alice</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">90%</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">A</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <span className="font-medium">Science</span>
                <span className="text-xs text-gray-500 ml-2">Alice</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">88%</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">A-</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <span className="font-medium">Mathematics</span>
                <span className="text-xs text-gray-500 ml-2">Bob</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">78%</span>
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">B+</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Attendance Overview</h3>
        <Chart type="line" data={[]} />
      </Card>
    </div>
  );
};

export default ParentDashboard;