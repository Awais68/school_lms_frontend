import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    code: '',
    description: '',
    type: 'campus',
    subject: '',
    grade: 8,
    instructor: '',
    schedule: { days: ['Monday', 'Wednesday', 'Friday'], startTime: '09:00', endTime: '09:45' }
  });
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/courses');
      // setCourses(response.data.data.courses);
      
      // For demo purposes, using dummy data
      const dummyCourses = [
        {
          _id: 1,
          title: 'Mathematics Grade 8',
          code: 'MATH801',
          description: 'Comprehensive mathematics course for Grade 8 students',
          type: 'campus',
          subject: 'Mathematics',
          grade: 8,
          instructor: { firstName: 'Jane', lastName: 'Smith' },
          schedule: { days: ['Mon', 'Wed', 'Fri'], startTime: '09:00', endTime: '09:45' },
          enrolledStudents: 28,
          maxEnrollment: 30
        },
        {
          _id: 2,
          title: 'Science Grade 7',
          code: 'SCI701',
          description: 'Introduction to basic science concepts',
          type: 'campus',
          subject: 'Science',
          grade: 7,
          instructor: { firstName: 'Robert', lastName: 'Johnson' },
          schedule: { days: ['Tue', 'Thu'], startTime: '10:00', endTime: '10:45' },
          enrolledStudents: 25,
          maxEnrollment: 30
        }
      ];
      setCourses(dummyCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstructors = async () => {
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/users?type=teacher');
      // setInstructors(response.data.data.users);
      
      // For demo purposes, using dummy data
      setInstructors([
        { _id: 1, firstName: 'Jane', lastName: 'Smith' },
        { _id: 2, firstName: 'Robert', lastName: 'Johnson' },
        { _id: 3, firstName: 'Emily', lastName: 'Davis' }
      ]);
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  const createCourse = async () => {
    try {
      // In a real implementation, this would send to the backend
      // await api.post('/courses', newCourse);
      
      const course = {
        _id: courses.length + 1,
        ...newCourse,
        instructor: instructors.find(i => i._id === newCourse.instructor) || { firstName: 'Unknown', lastName: 'Instructor' },
        enrolledStudents: 0,
        maxEnrollment: 30
      };
      
      setCourses([...courses, course]);
      setShowCreateModal(false);
      setNewCourse({
        title: '',
        code: '',
        description: '',
        type: 'campus',
        subject: '',
        grade: 8,
        instructor: '',
        schedule: { days: ['Monday', 'Wednesday', 'Friday'], startTime: '09:00', endTime: '09:45' }
      });
      alert('Course created successfully!');
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error creating course. Please try again.');
    }
  };

  const handleScheduleDayToggle = (day) => {
    setNewCourse(prev => {
      const currentDays = prev.schedule.days || [];
      if (currentDays.includes(day)) {
        return {
          ...prev,
          schedule: {
            ...prev.schedule,
            days: currentDays.filter(d => d !== day)
          }
        };
      } else {
        return {
          ...prev,
          schedule: {
            ...prev.schedule,
            days: [...currentDays, day]
          }
        };
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
        <p className="text-gray-600">Manage courses, schedules, and enrollment</p>
      </div>

      <Card className="mb-6 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Courses</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Course
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-500">{course.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.instructor.firstName} {course.instructor.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.schedule.days.join(', ')} {course.schedule.startTime} - {course.schedule.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.enrolledStudents}/{course.maxEnrollment}</div>
                      <div className="text-xs text-gray-500">
                        {Math.round((course.enrolledStudents / course.maxEnrollment) * 100)}% filled
                      </div>
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

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Create New Course</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter course title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                <input
                  type="text"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter course code"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={newCourse.subject}
                  onChange={(e) => setNewCourse({...newCourse, subject: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter subject"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                <select
                  value={newCourse.grade}
                  onChange={(e) => setNewCourse({...newCourse, grade: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(grade => (
                    <option key={grade} value={grade}>Grade {grade}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Type</label>
                <select
                  value={newCourse.type}
                  onChange={(e) => setNewCourse({...newCourse, type: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="campus">Campus</option>
                  <option value="online">Online</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                <select
                  value={newCourse.instructor}
                  onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Instructor</option>
                  {instructors.map(instructor => (
                    <option key={instructor._id} value={instructor._id}>
                      {instructor.firstName} {instructor.lastName}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter course description"
                  rows="3"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Days</label>
                    <div className="space-y-2">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                        <label key={day} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={(newCourse.schedule.days || []).includes(day)}
                            onChange={() => handleScheduleDayToggle(day)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm">{day.substring(0, 3)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={newCourse.schedule.startTime}
                      onChange={(e) => setNewCourse({
                        ...newCourse,
                        schedule: {
                          ...newCourse.schedule,
                          startTime: e.target.value
                        }
                      })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">End Time</label>
                    <input
                      type="time"
                      value={newCourse.schedule.endTime}
                      onChange={(e) => setNewCourse({
                        ...newCourse,
                        schedule: {
                          ...newCourse.schedule,
                          endTime: e.target.value
                        }
                      })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
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
                onClick={createCourse}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;