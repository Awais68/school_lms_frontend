import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && token) {
      // Connect to Socket.IO server
      const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
        auth: {
          token: token
        },
        transports: ['websocket', 'polling']
      });

      setSocket(newSocket);

      // Listen for connection events
      newSocket.on('connect', () => {
        console.log('Connected to server:', newSocket.id);
        
        // Send user identification
        newSocket.emit('user_connected', localStorage.getItem('user')?._id);
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      // Listen for attendance updates
      newSocket.on('attendance_updated', (data) => {
        console.log('Attendance updated:', data);
        // Handle attendance update in the UI if needed
      });

      // Listen for notifications
      newSocket.on('notification', (data) => {
        console.log('Notification received:', data);
        // Show notification to user
        if (window.Notification && Notification.permission === 'granted') {
          new Notification(data.title || 'Notification', {
            body: data.message || 'You have a new notification'
          });
        }
      });

      // Clean up on unmount
      return () => {
        newSocket.close();
      };
    }
  }, [isAuthenticated, token]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export default SocketContext;