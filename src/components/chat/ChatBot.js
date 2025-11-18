import React, { useState, useEffect, useRef } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch quick replies on component mount
  useEffect(() => {
    if (isOpen) {
      fetchQuickReplies();
    }
  }, [isOpen]);

  const fetchQuickReplies = async () => {
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/chatbot/quick-replies');
      // setQuickReplies(response.data.data.quickReplies);

      // For demo purposes, using dummy data
      const dummyQuickReplies = [
        "What's my fee status?",
        "How is my attendance?",
        "What's my schedule today?",
        "I need help with my grades",
        "How do I pay fees?",
        "What assignments are due?",
      ];

      // Set up to handle quick replies
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Hello! I'm your school assistant. How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
          quickReplies: dummyQuickReplies,
        },
      ]);
    } catch (error) {
      console.error("Error fetching quick replies:", error);
    }
  };

  // Handle sending message to chatbot
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // In a real implementation, this would call the backend API
      // const response = await api.post('/chatbot/chat', {
      //   message: inputMessage,
      //   sessionId: `chat_${user._id}_${Date.now()}`
      // });

      // For demo purposes, using a simple response logic
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      // Simple response logic based on keywords
      let botResponse;
      const lowerInput = inputMessage.toLowerCase();

      // Fee-related queries
      if (lowerInput.includes("fee") || lowerInput.includes("pay")) {
        botResponse =
          "You have 2 pending fees: Tuition fee of ₹15,000 due on 2023-09-30 and Library fee of ₹1,000 due on 2023-09-15. Would you like to process payment?";
      }
      // Attendance queries
      else if (
        lowerInput.includes("attendance") ||
        lowerInput.includes("present")
      ) {
        botResponse =
          "Your attendance rate is 93% this month. You were present for 28 out of 30 days. Keep up the good work!";
      }
      // Grade/marks queries
      else if (
        lowerInput.includes("grade") ||
        lowerInput.includes("score") ||
        lowerInput.includes("mark")
      ) {
        botResponse =
          "Your recent grades: Mathematics - A (90%), Science - A (90%), English - B+ (85%). Your overall GPA is 3.7/4.0.";
      }
      // Schedule queries
      else if (
        lowerInput.includes("schedule") ||
        lowerInput.includes("time table") ||
        lowerInput.includes("timetable")
      ) {
        botResponse =
          "Your classes today: Mathematics (9:00-9:45 AM), Science (10:00-10:45 AM), English (11:00-11:45 AM).";
      }
      // Assignment queries
      else if (
        lowerInput.includes("assignment") ||
        lowerInput.includes("homework")
      ) {
        botResponse =
          "You have 1 assignment due tomorrow: Mathematics Chapter 1 Homework. Max points: 50.";
      }
      // Registration queries
      else if (
        lowerInput.includes("register") ||
        lowerInput.includes("admission") ||
        lowerInput.includes("enroll")
      ) {
        botResponse =
          "To register your child, please visit our Registration page. You'll need: 1) Birth certificate, 2) Previous school records (if applicable), 3) Parent ID proof, 4) Recent photographs. Click the Register button at the top or visit /register to start the process.";
      }
      // Contact/Help queries
      else if (
        lowerInput.includes("contact") ||
        lowerInput.includes("phone") ||
        lowerInput.includes("email") ||
        lowerInput.includes("reach")
      ) {
        botResponse =
          "You can contact us at: Phone: +92-XXX-XXXXXXX, Email: info@schoollms.com, or visit our office during school hours (8 AM - 4 PM). We're also available on WhatsApp!";
      }
      // Transport queries
      else if (
        lowerInput.includes("transport") ||
        lowerInput.includes("bus") ||
        lowerInput.includes("van")
      ) {
        botResponse =
          "We offer school transport services covering all major areas. The transport fee is ₹3,000 per month. For route details and timings, please visit the Transport section or contact our administration.";
      }
      // Library queries
      else if (lowerInput.includes("library") || lowerInput.includes("book")) {
        botResponse =
          "Our library is open Monday to Friday, 8 AM - 4 PM. You can borrow up to 3 books for 2 weeks. Library membership is included in your tuition fee. Visit the Library section for available books.";
      }
      // General help
      else if (lowerInput.includes("help") || lowerInput.includes("support")) {
        botResponse =
          "I'm here to help! I can assist with: fees & payments, attendance records, grades & marks, class schedules, assignments, registration/admission, contact information, transport services, library services, and general school queries. What would you like to know?";
      }
      // Greeting responses
      else if (
        lowerInput.includes("hello") ||
        lowerInput.includes("hi") ||
        lowerInput.includes("hey")
      ) {
        botResponse =
          "Hello! 👋 Welcome to School LMS. I'm your AI assistant here to help with all your school-related queries. What can I help you with today?";
      }
      // Thank you responses
      else if (lowerInput.includes("thank") || lowerInput.includes("thanks")) {
        botResponse =
          "You're welcome! 😊 If you have any other questions, feel free to ask. I'm always here to help!";
      }
      // Default helpful response
      else {
        botResponse =
          "I understand you're asking about '" +
          inputMessage +
          "'. While I may not have specific information on that exact topic, I can help you with: fees & payments, attendance, grades, schedules, assignments, registration, contact details, transport, and library services. Could you rephrase your question or ask about one of these topics?";
      }

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
        action: null, // In a real implementation, this would come from the backend
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle quick reply click
  const handleQuickReply = (text) => {
    setInputMessage(text);
    setTimeout(() => sendMessage(), 300); // Allow state to update
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 group-hover:scale-110 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
          AI
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mr-3 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <span className="font-semibold text-lg">AI Assistant</span>
            <div className="flex items-center text-xs text-green-100">
              <div className="bg-green-300 rounded-full w-2 h-2 mr-1 animate-pulse"></div>
              Online
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {/* Welcome message */}
        {messages.length === 0 && (
          <div className="mb-4">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-700">
                Hello! I'm your school assistant. I can help with:
              </p>
              <ul className="mt-2 text-sm text-gray-600">
                <li>• Student profile information</li>
                <li>• Fee status and payments</li>
                <li>• Attendance records</li>
                <li>• Course schedules</li>
                <li>• Creating support tickets</li>
              </ul>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : message.isError
                  ? "bg-red-100 text-red-800"
                  : "bg-white text-gray-800 border border-gray-200"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              {message.timestamp && (
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
              {message.quickReplies && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {message.quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="2"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className={`px-4 py-2 rounded-lg text-white ${
              isLoading || !inputMessage.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
