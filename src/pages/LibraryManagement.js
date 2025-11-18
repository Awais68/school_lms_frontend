import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui';

const LibraryManagement = () => {
  const [books, setBooks] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [newBook, setNewBook] = useState({
    bookId: '',
    title: '',
    author: '',
    isbn: '',
    category: '',
    publisher: '',
    publishedYear: new Date().getFullYear(),
    edition: '',
    totalCopies: 1,
    price: '',
    shelfLocation: '',
    branchId: ''
  });
  const [borrowData, setBorrowData] = useState({
    bookId: '',
    studentId: '',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0] // 14 days from now
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
    fetchBranches();
    fetchStudents();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/library');
      // setBooks(response.data.data.books);
      
      // For demo purposes, using dummy data
      const dummyBooks = [
        {
          _id: 1,
          bookId: 'BK-001',
          title: 'Mathematics for Grade 8',
          author: 'Dr. John Mathews',
          isbn: '978-1234567890',
          category: 'Mathematics',
          publisher: 'Education Publishers',
          publishedYear: 2023,
          edition: '1st',
          totalCopies: 10,
          availableCopies: 7,
          price: 300,
          shelfLocation: 'Math Section - Shelf A3',
          branch: { name: 'Main Campus' },
          status: 'available'
        },
        {
          _id: 2,
          bookId: 'BK-002',
          title: 'Science for Grade 8',
          author: 'Dr. Sarah Science',
          isbn: '978-0987654321',
          category: 'Science',
          publisher: 'Science Publications',
          publishedYear: 2023,
          edition: '2nd',
          totalCopies: 8,
          availableCopies: 5,
          price: 350,
          shelfLocation: 'Science Section - Shelf B1',
          branch: { name: 'Main Campus' },
          status: 'available'
        },
        {
          _id: 3,
          bookId: 'BK-003',
          title: 'English Grammar Guide',
          author: 'Prof. Robert Lang',
          isbn: '978-1122334455',
          category: 'English',
          publisher: 'Language Learning',
          publishedYear: 2022,
          edition: '3rd',
          totalCopies: 5,
          availableCopies: 0,
          price: 250,
          shelfLocation: 'English Section - Shelf C2',
          branch: { name: 'Main Campus' },
          status: 'borrowed'
        }
      ];
      setBooks(dummyBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/branches');
      // setBranches(response.data.data.branches);
      
      // For demo purposes, using dummy data
      setBranches([
        { _id: 1, name: 'Main Campus' },
        { _id: 2, name: 'East Campus' },
        { _id: 3, name: 'West Campus' }
      ]);
    } catch (error) {
      console.error('Error fetching branches:', error);
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

  const createBook = async () => {
    try {
      // In a real implementation, this would send to the backend
      // await api.post('/library', newBook);
      
      const book = {
        _id: books.length + 1,
        ...newBook,
        availableCopies: newBook.totalCopies,
        branch: branches.find(b => b._id === newBook.branchId) || { name: 'Unknown Branch' },
        status: newBook.totalCopies > 0 ? 'available' : 'empty'
      };
      
      setBooks([...books, book]);
      setShowCreateModal(false);
      setNewBook({
        bookId: '',
        title: '',
        author: '',
        isbn: '',
        category: '',
        publisher: '',
        publishedYear: new Date().getFullYear(),
        edition: '',
        totalCopies: 1,
        price: '',
        shelfLocation: '',
        branchId: ''
      });
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error creating book:', error);
      alert('Error adding book. Please try again.');
    }
  };

  const borrowBook = async () => {
    try {
      // In a real implementation, this would send to the backend
      // await api.post('/library/issue', borrowData);
      
      setBooks(prev => prev.map(book => 
        book._id === borrowData.bookId 
          ? { ...book, availableCopies: book.availableCopies - 1, status: book.availableCopies - 1 > 0 ? 'available' : 'borrowed' } 
          : book
      ));
      
      setShowBorrowModal(false);
      setBorrowData({
        bookId: '',
        studentId: '',
        dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0]
      });
      alert('Book borrowed successfully!');
    } catch (error) {
      console.error('Error borrowing book:', error);
      alert('Error borrowing book. Please try again.');
    }
  };

  const returnBook = async (bookId) => {
    try {
      // In a real implementation, this would send to the backend
      // await api.post('/library/return', { bookId });
      
      setBooks(prev => prev.map(book => 
        book._id === bookId 
          ? { ...book, availableCopies: book.availableCopies + 1, status: 'available' } 
          : book
      ));
      alert('Book returned successfully!');
    } catch (error) {
      console.error('Error returning book:', error);
      alert('Error returning book. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Library Management</h1>
        <p className="text-gray-600">Manage library books and borrowings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Books</p>
              <p className="text-2xl font-semibold text-gray-900">{books.length}</p>
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
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-semibold text-gray-900">
                {books.filter(b => b.status === 'available').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Borrowed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {books.filter(b => b.status === 'borrowed').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-purple-50 border-purple-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-semibold text-gray-900">
                {[...new Set(books.map(b => b.category))].length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mb-6 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Library Books</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add New Book
            </button>
            <button
              onClick={() => setShowBorrowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Borrow Book
            </button>
          </div>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Copies</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.map((book) => (
                  <tr key={book._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{book.title}</div>
                      <div className="text-sm text-gray-500">ID: {book.bookId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{book.availableCopies}/{book.totalCopies}</div>
                      <div className="text-xs text-gray-500">₹{book.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.shelfLocation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        book.status === 'available' ? 'bg-green-100 text-green-800' :
                        book.status === 'borrowed' ? 'bg-yellow-100 text-yellow-800' :
                        book.status === 'reserved' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      {book.status === 'borrowed' && (
                        <button 
                          onClick={() => returnBook(book._id)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Return
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add Book Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add New Book</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book ID</label>
                <input
                  type="text"
                  value={newBook.bookId}
                  onChange={(e) => setNewBook({...newBook, bookId: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter book ID"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newBook.title}
                  onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter book title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  value={newBook.author}
                  onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter author name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={newBook.category}
                  onChange={(e) => setNewBook({...newBook, category: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter category"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                <input
                  type="text"
                  value={newBook.isbn}
                  onChange={(e) => setNewBook({...newBook, isbn: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter ISBN"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                <input
                  type="text"
                  value={newBook.publisher}
                  onChange={(e) => setNewBook({...newBook, publisher: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter publisher"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Published Year</label>
                <input
                  type="number"
                  value={newBook.publishedYear}
                  onChange={(e) => setNewBook({...newBook, publishedYear: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter year"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Edition</label>
                <input
                  type="text"
                  value={newBook.edition}
                  onChange={(e) => setNewBook({...newBook, edition: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter edition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Copies</label>
                <input
                  type="number"
                  value={newBook.totalCopies}
                  onChange={(e) => setNewBook({...newBook, totalCopies: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter total copies"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={newBook.price}
                  onChange={(e) => setNewBook({...newBook, price: parseFloat(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter price"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Shelf Location</label>
                <input
                  type="text"
                  value={newBook.shelfLocation}
                  onChange={(e) => setNewBook({...newBook, shelfLocation: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter shelf location (e.g., Section A, Shelf 3)"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <select
                  value={newBook.branchId}
                  onChange={(e) => setNewBook({...newBook, branchId: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Branch</option>
                  {branches.map(branch => (
                    <option key={branch._id} value={branch._id}>{branch.name}</option>
                  ))}
                </select>
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
                onClick={createBook}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Borrow Book Modal */}
      {showBorrowModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Borrow Book</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
                <select
                  value={borrowData.bookId}
                  onChange={(e) => setBorrowData({...borrowData, bookId: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Book</option>
                  {books
                    .filter(book => book.status === 'available' && book.availableCopies > 0)
                    .map(book => (
                      <option key={book._id} value={book._id}>
                        {book.title} by {book.author} ({book.availableCopies} available)
                      </option>
                    ))
                  }
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                <select
                  value={borrowData.studentId}
                  onChange={(e) => setBorrowData({...borrowData, studentId: e.target.value})}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={borrowData.dueDate}
                  onChange={(e) => setBorrowData({...borrowData, dueDate: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowBorrowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={borrowBook}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                disabled={!borrowData.bookId || !borrowData.studentId}
              >
                Borrow Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryManagement;