import React from 'react';
import { Card } from '../components/ui';

const TeacherDashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600">Welcome back, Ms. Johnson</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">My Classes</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
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
              <p className="text-sm font-medium text-gray-600">Pending Assignments</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Students</p>
              <p className="text-2xl font-semibold text-gray-900">78</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">My Classes</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <h4 className="font-medium">Mathematics - Grade 8A</h4>
                <p className="text-sm text-gray-600">28 Students</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">View</button>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <h4 className="font-medium">Mathematics - Grade 8B</h4>
                <p className="text-sm text-gray-600">25 Students</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">View</button>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <h4 className="font-medium">Science - Grade 7A</h4>
                <p className="text-sm text-gray-600">25 Students</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">View</button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Tasks</h3>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded">
              <h4 className="font-medium">Grade Assignments</h4>
              <p className="text-sm text-gray-600">5 pending submissions</p>
              <p className="text-xs text-gray-500 mt-1">Due: Tomorrow</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <h4 className="font-medium">Parent-Teacher Meeting</h4>
              <p className="text-sm text-gray-600">Next Monday</p>
              <p className="text-xs text-gray-500 mt-1">3:00 PM - 4:00 PM</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <h4 className="font-medium">Upload Chapter Notes</h4>
              <p className="text-sm text-gray-600">Algebra Basics</p>
              <p className="text-xs text-gray-500 mt-1">Due: This Friday</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;