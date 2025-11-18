import React from "react";
import NavbarNew from "../components/common/NavbarNew";
import Sidebar from "../components/common/Sidebar";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <NavbarNew />
      <Sidebar />

      <div className="ml-16 mt-16 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-2">
              View and manage your profile information
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <div className="px-6 pb-6">
              <div className="flex items-end -mt-16 mb-4">
                <div className="bg-white p-1 rounded-full">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </div>
                </div>
                <div className="ml-6 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-600 capitalize">{user?.role}</p>
                </div>
              </div>

              {/* Profile Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="text-lg font-medium text-gray-900">
                    {user?.email}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="text-lg font-medium text-gray-900">
                    {user?.phone || "Not provided"}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">User ID</p>
                  <p className="text-lg font-medium text-gray-900">
                    {user?._id?.slice(-8).toUpperCase()}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Account Status</p>
                  <p className="text-lg font-medium text-green-600">Active</p>
                </div>

                {user?.role === "student" && (
                  <>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Class</p>
                      <p className="text-lg font-medium text-gray-900">
                        Grade 10 - Section A
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Roll Number</p>
                      <p className="text-lg font-medium text-gray-900">
                        2024001
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Edit Button */}
              <div className="mt-6">
                <button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all font-medium">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Account Settings
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center">
                  <svg
                    className="h-5 w-5 mr-3 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                  <span className="text-gray-900">Change Password</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center">
                  <svg
                    className="h-5 w-5 mr-3 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-gray-900">Privacy Settings</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center">
                  <svg
                    className="h-5 w-5 mr-3 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="text-gray-900">
                    Notification Preferences
                  </span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Activity</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Last Login</p>
                  <p className="text-gray-900 font-medium">Today at 10:30 AM</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Account Created</p>
                  <p className="text-gray-900 font-medium">January 15, 2024</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Sessions</p>
                  <p className="text-gray-900 font-medium">247</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
