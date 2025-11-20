import React, { useState } from "react";
import NavbarNew from "../../components/common/NavbarNew";
import Sidebar from "../../components/common/Sidebar";

const StudentDiscussions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", category: "General", content: "" });
  const [replyText, setReplyText] = useState("");

  const discussions = [
    {
      id: 1,
      title: "Help with Calculus Assignment",
      author: "John Doe",
      category: "Mathematics",
      replies: 5,
      lastActivity: "2 hours ago",
      content: "I'm struggling with integration problems. Can anyone explain the substitution method?",
      responses: [
        { id: 1, author: "Teacher Smith", content: "Sure! Let me explain the u-substitution method...", time: "1 hour ago" }
      ]
    },
    {
      id: 2,
      title: "Physics Lab Report Questions",
      author: "Jane Smith",
      category: "Physics",
      replies: 3,
      lastActivity: "5 hours ago",
      content: "What should be included in the conclusion section?",
      responses: []
    },
    {
      id: 3,
      title: "Study Group for Final Exams",
      author: "Mike Johnson",
      category: "General",
      replies: 12,
      lastActivity: "1 day ago",
      content: "Anyone interested in forming a study group for finals?",
      responses: []
    },
  ];

  const categories = ["General", "Mathematics", "Physics", "Chemistry", "Biology", "English"];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || discussion.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const createPost = () => {
    console.log("Creating post:", newPost);
    setShowNewPost(false);
    setNewPost({ title: "", category: "General", content: "" });
  };

  const submitReply = () => {
    console.log("Reply:", replyText);
    setReplyText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavbarNew />
      <Sidebar />

      <div className="ml-16 mt-16 p-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Discussions</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Ask questions and help others</p>
          </div>
          <button
            onClick={() => setShowNewPost(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <span>➕</span> New Discussion
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Discussion Threads */}
        <div className="space-y-4">
          {filteredDiscussions.map((discussion) => (
            <div key={discussion.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all">
              <div className="p-6 cursor-pointer" onClick={() => setSelectedThread(discussion)}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{discussion.title}</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs font-semibold">
                    {discussion.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{discussion.content}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                  <span>👤 {discussion.author}</span>
                  <span>💬 {discussion.replies} replies</span>
                  <span>🕒 {discussion.lastActivity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* New Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">New Discussion</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Discussion Title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Write your question or discussion topic..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={createPost}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Post Discussion
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Thread Detail Modal */}
        {selectedThread && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{selectedThread.title}</h2>
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200 mb-3">{selectedThread.content}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Posted by {selectedThread.author}</p>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Replies ({selectedThread.replies})</h3>
              <div className="space-y-4 mb-6">
                {selectedThread.responses.map(reply => (
                  <div key={reply.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-800 dark:text-gray-200 mb-2">{reply.content}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{reply.author} • {reply.time}</p>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <textarea
                  placeholder="Write your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setSelectedThread(null)}
                  className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-400"
                >
                  Close
                </button>
                <button
                  onClick={submitReply}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDiscussions;
