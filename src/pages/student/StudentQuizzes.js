import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import NavbarNew from "../../components/common/NavbarNew";
import Sidebar from "../../components/common/Sidebar";

const StudentQuizzes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const quizzes = [
    {
      id: 1,
      title: "Mathematics - Chapter 5 Quiz",
      subject: "Mathematics",
      duration: "30 mins",
      totalQuestions: 10,
      passingMarks: 7,
      deadline: "2025-03-25",
      status: "Available",
      questions: [
        { id: 1, question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
        { id: 2, question: "What is 5 × 3?", options: ["10", "15", "20", "25"], correct: 1 },
      ]
    },
    {
      id: 2,
      title: "Physics - Motion and Forces",
      subject: "Physics",
      duration: "45 mins",
      totalQuestions: 15,
      passingMarks: 10,
      deadline: "2025-03-28",
      status: "Available",
      questions: []
    },
    {
      id: 3,
      title: "Chemistry - Periodic Table",
      subject: "Chemistry",
      duration: "40 mins",
      totalQuestions: 12,
      passingMarks: 8,
      deadline: "2025-03-20",
      status: "Completed",
      score: 10,
      questions: []
    },
  ];

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || quiz.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowQuizModal(true);
    setCurrentQuestion(0);
    setAnswers({});
    setQuizSubmitted(false);
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers({...answers, [questionId]: answerIndex});
  };

  const submitQuiz = () => {
    let correct = 0;
    selectedQuiz.questions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    setScore(correct);
    setQuizSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavbarNew />
      <Sidebar />

      <div className="ml-16 mt-16 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quizzes</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Take quizzes and tests</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{quiz.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  quiz.status === "Available" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                  "bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                }`}>
                  {quiz.status}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Subject: {quiz.subject}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Duration: {quiz.duration}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Questions: {quiz.totalQuestions}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Passing: {quiz.passingMarks}/{quiz.totalQuestions}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Deadline: {quiz.deadline}</p>
                {quiz.status === "Completed" && <p className="text-sm font-semibold text-green-600">Score: {quiz.score}/{quiz.totalQuestions}</p>}
              </div>
              {quiz.status === "Available" && (
                <button
                  onClick={() => startQuiz(quiz)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
                >
                  Start Quiz
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Quiz Modal */}
        {showQuizModal && selectedQuiz && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {!quizSubmitted ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedQuiz.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400">Question {currentQuestion + 1} of {selectedQuiz.questions.length}</p>
                  </div>
                  
                  {selectedQuiz.questions[currentQuestion] && (
                    <div className="mb-6">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {selectedQuiz.questions[currentQuestion].question}
                      </p>
                      <div className="space-y-3">
                        {selectedQuiz.questions[currentQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswer(selectedQuiz.questions[currentQuestion].id, index)}
                            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                              answers[selectedQuiz.questions[currentQuestion].id] === index
                                ? "border-blue-600 bg-blue-50 dark:bg-blue-900"
                                : "border-gray-300 dark:border-gray-600 hover:border-blue-300"
                            }`}
                          >
                            <span className="text-gray-900 dark:text-white">{option}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between gap-4">
                    {currentQuestion > 0 && (
                      <button
                        onClick={() => setCurrentQuestion(currentQuestion - 1)}
                        className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500"
                      >
                        Previous
                      </button>
                    )}
                    {currentQuestion < selectedQuiz.questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                        className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={submitQuiz}
                        className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                      >
                        Submit Quiz
                      </button>
                    )}
                    <button
                      onClick={() => setShowQuizModal(false)}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quiz Completed!</h2>
                  <div className="mb-6">
                    <p className="text-6xl font-bold text-blue-600 mb-2">{score}/{selectedQuiz.questions.length}</p>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                      {score >= selectedQuiz.passingMarks ? "Passed! 🎉" : "Keep trying! 📚"}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowQuizModal(false)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentQuizzes;
