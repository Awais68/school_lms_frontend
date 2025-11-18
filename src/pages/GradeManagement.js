import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui';

const GradeManagement = () => {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGrade, setNewGrade] = useState({
    student: '',
    course: '',
    assignment: '',
    quiz: '',
    gradeType: 'assignment',
    pointsEarned: '',
    maxPoints: 100,
    feedback: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrades();
    fetchStudents();
    fetchCourses();
    fetchAssignments();
    fetchQuizzes();
  }, []);

  const fetchGrades = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/grades');
      // setGrades(response.data.data.grades);
      
      // For demo purposes, using dummy data
      const dummyGrades = [
        {
          _id: 1,
          student: { firstName: 'Alice', lastName: 'Johnson', rollNumber: '1' },
          course: { title: 'Mathematics Grade 8' },
          assignment: { title: 'Algebra Chapter 1 Homework' },
          gradeType: 'assignment',
          pointsEarned: 45,
          maxPoints: 50,
          percentage: 90,
          letterGrade: 'A',
          feedback: 'Excellent work on all problems!',
          gradedBy: { firstName: 'Jane', lastName: 'Smith' }
        },
        {
          _id: 2,
          student: { firstName: 'Bob', lastName: 'Smith', rollNumber: '2' },
          course: { title: 'Science Grade 7' },
          quiz: { title: 'Chemical Reactions Quiz' },
          gradeType: 'quiz',
          pointsEarned: 18,
          maxPoints: 20,
          percentage: 90,
          letterGrade: 'A',
          feedback: 'Good understanding of concepts.',
          gradedBy: { firstName: 'Robert', lastName: 'Johnson' }
        }
      ];
      setGrades(dummyGrades);
    } catch (error) {
      console.error('Error fetching grades:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/users?type=student');
      // setStudents(response.data.data.users);
      
      // For demo purposes, using dummy data
      setStudents([
        { _id: 1, firstName: 'Alice', lastName: 'Johnson', rollNumber: '1', studentId: 'STU-001' },
        { _id: 2, firstName: 'Bob', lastName: 'Smith', rollNumber: '2', studentId: 'STU-002' },
        { _id: 3, firstName: 'Charlie', lastName: 'Brown', rollNumber: '3', studentId: 'STU-003' }
      ]);
    } catch (error) {
      console.error('Error fetching students:', error);
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

  const fetchAssignments = async () => {
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/assignments');
      // setAssignments(response.data.data.assignments);
      
      // For demo purposes, using dummy data
      setAssignments([
        { _id: 1, title: 'Algebra Chapter 1 Homework' },
        { _id: 2, title: 'Science Lab Report' }
      ]);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/quizzes');
      // setQuizzes(response.data.data.quizzes);
      
      // For demo purposes, using dummy data
      setQuizzes([
        { _id: 1, title: 'Chemical Reactions Quiz' },
        { _id: 2, title: 'Grammar Exercise' }
      ]);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const createGrade = async () => {
    try {
      // In a real implementation, this would send to the backend
      // await api.post('/grades', newGrade);
      
      const grade = {
        _id: grades.length + 1,
        ...newGrade,
        student: students.find(s => s._id === newGrade.student) || { firstName: 'Unknown', lastName: 'Student' },
        course: courses.find(c => c._id === newGrade.course) || { title: 'Unknown Course' },
        assignment: assignments.find(a => a._id === newGrade.assignment),
        quiz: quizzes.find(q => q._id === newGrade.quiz),
        percentage: Math.round((newGrade.pointsEarned / newGrade.maxPoints) * 100),
        letterGrade: calculateLetterGrade(Math.round((newGrade.pointsEarned / newGrade.maxPoints) * 100)),
        gradedBy: { firstName: 'Current', lastName: 'Teacher' } // In real, would use authenticated user
      };
      
      setGrades([...grades, grade]);
      setShowCreateModal(false);
      setNewGrade({
        student: '',
        course: '',
        assignment: '',
        quiz: '',
        gradeType: 'assignment',
        pointsEarned: '',
        maxPoints: 100,
        feedback: ''
      });
      alert('Grade created successfully!');
    } catch (error) {
      console.error('Error creating grade:', error);
      alert('Error creating grade. Please try again.');
    }
  };

  const calculateLetterGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 85) return 'A';
    if (percentage >= 80) return 'A-';
    if (percentage >= 75) return 'B+';
    if (percentage >= 70) return 'B';
    if (percentage >= 65) return 'B-';
    if (percentage >= 60) return 'C+';
    if (percentage >= 55) return 'C';
    if (percentage >= 50) return 'C-';
    if (percentage >= 45) return 'D';
    return 'F';
  };

  const handleGradeTypeChange = (type) => {
    setNewGrade(prev => ({
      ...prev,
      gradeType: type,
      assignment: type === 'assignment' ? prev.assignment : '',
      quiz: type === 'quiz' ? prev.quiz : ''
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Grade Management</h1>
        <p className="text-gray-600">Manage student grades and assessments</p>
      </div>

      <Card className="mb-6 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Grades</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Grade
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment/Quiz</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Graded By</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {grades.map((grade) => (
                  <tr key={grade._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {grade.student.firstName} {grade.student.lastName}
                      </div>
                      <div className="text-sm text-gray-500">Roll: {grade.student.rollNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {grade.course.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {grade.assignment ? grade.assignment.title : grade.quiz.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {grade.pointsEarned}/{grade.maxPoints} ({grade.percentage}%)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {grade.letterGrade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {grade.feedback}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {grade.gradedBy.firstName} {grade.gradedBy.lastName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Create Grade Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add New Grade</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                <select
                  value={newGrade.student}
                  onChange={(e) => setNewGrade({...newGrade, student: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Student</option>
                  {students.map(student => (
                    <option key={student._id} value={student._id}>
                      {student.firstName} {student.lastName} (Roll: {student.rollNumber})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <select
                  value={newGrade.course}
                  onChange={(e) => setNewGrade({...newGrade, course: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>{course.title}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade Type</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={newGrade.gradeType === 'assignment'}
                      onChange={() => handleGradeTypeChange('assignment')}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Assignment</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={newGrade.gradeType === 'quiz'}
                      onChange={() => handleGradeTypeChange('quiz')}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Quiz</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={newGrade.gradeType === 'exam'}
                      onChange={() => handleGradeTypeChange('exam')}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Exam</span>
                  </label>
                </div>
              </div>
              
              {newGrade.gradeType === 'assignment' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assignment</label>
                  <select
                    value={newGrade.assignment}
                    onChange={(e) => setNewGrade({...newGrade, assignment: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Assignment</option>
                    {assignments.map(assignment => (
                      <option key={assignment._id} value={assignment._id}>{assignment.title}</option>
                    ))}
                  </select>
                </div>
              )}
              
              {newGrade.gradeType === 'quiz' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quiz</label>
                  <select
                    value={newGrade.quiz}
                    onChange={(e) => setNewGrade({...newGrade, quiz: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Quiz</option>
                    {quizzes.map(quiz => (
                      <option key={quiz._id} value={quiz._id}>{quiz.title}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Points Earned</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={newGrade.pointsEarned}
                    onChange={(e) => setNewGrade({...newGrade, pointsEarned: parseInt(e.target.value)})}
                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                    min="0"
                    max={newGrade.maxPoints}
                    placeholder="Points earned"
                  />
                  <span className="flex items-center">of</span>
                  <input
                    type="number"
                    value={newGrade.maxPoints}
                    onChange={(e) => setNewGrade({...newGrade, maxPoints: parseInt(e.target.value)})}
                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                    min="1"
                    placeholder="Max points"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                <textarea
                  value={newGrade.feedback}
                  onChange={(e) => setNewGrade({...newGrade, feedback: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter feedback for the student"
                  rows="3"
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
                onClick={createGrade}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeManagement;