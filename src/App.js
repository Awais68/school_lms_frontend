import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import PrivateRoute from "./components/common/PrivateRoute";
import HomeNew from "./pages/HomeNew";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboardNew";
import ParentDashboard from "./pages/ParentDashboard";
import AccountantDashboard from "./pages/AccountantDashboard";
import AttendanceScreen from "./pages/AttendanceScreen";
import FeeManagement from "./pages/FeeManagement";
import CourseManagement from "./pages/CourseManagement";
import AssignmentManagement from "./pages/AssignmentManagement";
import GradeManagement from "./pages/GradeManagement";
import TransportManagement from "./pages/TransportManagement";
import InventoryManagement from "./pages/InventoryManagement";
import ExpenseManagement from "./pages/ExpenseManagement";
import LibraryManagement from "./pages/LibraryManagement";
import NotFound from "./pages/NotFound";

// Student Pages
import StudentCourses from "./pages/student/StudentCourses";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentFeeStatus from "./pages/student/StudentFeeStatus";

// Common Pages
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./styles/tailwind.css";
import "./styles/globals.css";
import ChatBot from "./components/chat/ChatBot";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="App">
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: "#10b981",
                    secondary: "#fff",
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#fff",
                  },
                },
              }}
            />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomeNew />} />
              <Route path="/home" element={<HomeNew />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/courses" element={<CourseManagement />} />
              <Route path="/programmes" element={<HomeNew />} />
              <Route path="/faculty" element={<HomeNew />} />
              <Route path="/testimonials" element={<HomeNew />} />
              <Route path="/gallery" element={<HomeNew />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />

              {/* Profile route - accessible by all authenticated users */}
              <Route
                path="/profile"
                element={
                  <PrivateRoute
                    allowedRoles={[
                      "admin",
                      "teacher",
                      "student",
                      "parent",
                      "accountant",
                    ]}
                  >
                    <Profile />
                  </PrivateRoute>
                }
              />

              {/* Private routes for different user roles */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher"
                element={
                  <PrivateRoute allowedRoles={["teacher"]}>
                    <TeacherDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student"
                element={
                  <PrivateRoute allowedRoles={["student"]}>
                    <StudentDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/courses"
                element={
                  <PrivateRoute allowedRoles={["student"]}>
                    <StudentCourses />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/assignments"
                element={
                  <PrivateRoute allowedRoles={["student"]}>
                    <StudentAssignments />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/fee-status"
                element={
                  <PrivateRoute allowedRoles={["student"]}>
                    <StudentFeeStatus />
                  </PrivateRoute>
                }
              />
              <Route
                path="/parent"
                element={
                  <PrivateRoute allowedRoles={["parent"]}>
                    <ParentDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/accountant"
                element={
                  <PrivateRoute allowedRoles={["accountant"]}>
                    <AccountantDashboard />
                  </PrivateRoute>
                }
              />

              {/* Attendance Management */}
              <Route
                path="/attendance"
                element={
                  <PrivateRoute allowedRoles={["admin", "teacher"]}>
                    <AttendanceScreen />
                  </PrivateRoute>
                }
              />

              {/* Fee Management */}
              <Route
                path="/fees"
                element={
                  <PrivateRoute allowedRoles={["admin", "accountant"]}>
                    <FeeManagement />
                  </PrivateRoute>
                }
              />

              {/* Course Management */}
              <Route
                path="/courses"
                element={
                  <PrivateRoute allowedRoles={["admin", "teacher"]}>
                    <CourseManagement />
                  </PrivateRoute>
                }
              />

              {/* Assignment Management */}
              <Route
                path="/assignments"
                element={
                  <PrivateRoute allowedRoles={["admin", "teacher"]}>
                    <AssignmentManagement />
                  </PrivateRoute>
                }
              />

              {/* Grade Management */}
              <Route
                path="/grades"
                element={
                  <PrivateRoute allowedRoles={["admin", "teacher"]}>
                    <GradeManagement />
                  </PrivateRoute>
                }
              />

              {/* Transport Management */}
              <Route
                path="/transport"
                element={
                  <PrivateRoute allowedRoles={["admin", "accountant"]}>
                    <TransportManagement />
                  </PrivateRoute>
                }
              />

              {/* Inventory Management */}
              <Route
                path="/inventory"
                element={
                  <PrivateRoute allowedRoles={["admin", "accountant"]}>
                    <InventoryManagement />
                  </PrivateRoute>
                }
              />

              {/* Expense Management */}
              <Route
                path="/expenses"
                element={
                  <PrivateRoute allowedRoles={["admin", "accountant"]}>
                    <ExpenseManagement />
                  </PrivateRoute>
                }
              />

              {/* Library Management */}
              <Route
                path="/library"
                element={
                  <PrivateRoute allowedRoles={["admin", "accountant"]}>
                    <LibraryManagement />
                  </PrivateRoute>
                }
              />

              {/* Default route - redirect based on role */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* ChatBot component - available on all pages for authenticated users */}
            <ChatBot />
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
