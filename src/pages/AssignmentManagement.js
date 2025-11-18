import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui';

const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    course: '',
    dueDate: '',
    maxPoints: 100,
    submissionType: 'file',
    assignedTo: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
    fetchCourses();
    fetchStudents();
  }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/assignments');
      // setAssignments(response.data.data.assignments);
      
      // For demo purposes, using dummy data
      const dummyAssignments = [
        {
          _id: 1,
          title: 'Algebra Chapter 1 Homework',
          description: 'Complete exercises 1-20 from Chapter 1',
          course: { title: 'Mathematics Grade 8' },
          dueDate: '2023-09-10',
          maxPoints: 50,
          submissionType: 'file',
          assignedTo: 28,
          submitted: 25
        },
        {
          _id: 2,
          title: 'Science Lab Report',
          description: 'Write a report on the chemical reactions experiment',
          course: { title: 'Science Grade 7' },
          dueDate: '2023-09-15',
          maxPoints: 100,
          submissionType: 'file',
          assignedTo: 25,
          submitted: 20
        }
      ];
      setAssignments(dummyAssignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/courses');
      // setCourses(response.data.data.courses);
      
      // For demo purposes, using dummy data
      setCourses([
        { _id: 1, title: 'Mathematics Grade 8' },
        { _id: 2, title: 'Science Grade 7' },
        { _id: 3, title: 'English Grade 8' }
      ]);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/users?type=student');
      // setStudents(response.data.data.users);
      
      // For demo purposes, using dummy data
      setStudents([
        { _id: 1, firstName: 'Alice', lastName: 'Johnson', studentId: 'STU-001' },
        { _id: 2, firstName: 'Bob', lastName: 'Smith', studentId: 'STU-002' },
        { _id: 3, firstName: 'Charlie', lastName: 'Brown', studentId: 'STU-003' }
      ]);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const createAssignment = async () => {
    try {
      // In a real implementation, this would send to the backend
      // await api.post('/assignments', newAssignment);
      
      const assignment = {
        _id: assignments.length + 1,
        ...newAssignment,
        course: courses.find(c => c._id === newAssignment.course) || { title: 'Unknown Course' },
        assignedTo: newAssignment.assignedTo.length,
        submitted: 0
      };
      
      setAssignments([...assignments, assignment]);
      setShowCreateModal(false);
      setNewAssignment({
        title: '',
        description: '',
        course: '',
        dueDate: '',
        maxPoints: 100,
        submissionType: 'file',
        assignedTo: []
      });
      alert('Assignment created successfully!');
    } catch (error) {
      console.error('Error creating assignment:', error);
      alert('Error creating assignment. Please try again.');
    }
  };

  const handleStudentToggle = (studentId) => {
    setNewAssignment(prev => {
      const currentAssigned = [...prev.assignedTo];
      if (currentAssigned.includes(studentId)) {
        return {
          ...prev,
          assignedTo: currentAssigned.filter(id => id !== studentId)
        };
      } else {
        return {
          ...prev,
          assignedTo: [...currentAssigned, studentId]
        };
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Assignment Management</h1>
        <p className="text-gray-600">Create, manage, and track assignments</p>
      </div>

      <Card className="mb-6 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Assignments</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Assignment
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assignments.map((assignment) => (
                  <tr key={assignment._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                      <div className="text-sm text-gray-500">{assignment.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {assignment.course.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {assignment.maxPoints}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{assignment.submitted}/{assignment.assignedTo} submitted</div>
                      <div className="text-xs text-gray-500">
                        {Math.round((assignment.submitted / assignment.assignedTo) * 100)}% completion
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900 mr-3">Grade</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Create New Assignment</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter assignment title"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter assignment description"
                  rows="3"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <select
                  value={newAssignment.course}
                  onChange={(e) => setNewAssignment({...newAssignment, course: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>{course.title}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Points</label>
                <input
                  type="number"
                  value={newAssignment.maxPoints}
                  onChange={(e) => setNewAssignment({...newAssignment, maxPoints: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Submission Type</label>
                <select
                  value={newAssignment.submissionType}
                  onChange={(e) => setNewAssignment({...newAssignment, submissionType: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="file">File Upload</option>
                  <option value="text">Text Entry</option>
                  <option value="link">Link Submission</option>
                  <option value="online">Online Quiz</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                  {students.map(student => (
                    <label key={student._id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newAssignment.assignedTo.includes(student._id)}
                        onChange={() => handleStudentToggle(student._id)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm">{student.firstName} {student.lastName} ({student.studentId})</span>
                    </label>
                  ))}
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
                onClick={createAssignment}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentManagement;