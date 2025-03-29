'use client';

import { useEffect, useState, useRef, use} from 'react';
import { io, Socket } from 'socket.io-client';
import { env } from '~/env';

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
const { id } = use(params); 
  const [messages, setMessages] = useState<Array<{
    userId: string;
    message: string;
    timestamp: Date;
  }>>([]);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState(id);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Connect to socket server
  useEffect(() => {
    // Initialize socket connection with auth token
    // env.SOCKET_URL
    const newSocket = io("192.168.1.50:3001", {
      auth: {
        token: localStorage.getItem('token') || 'test-token', // Get actual token from your auth system
      },
    });

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
      setConnected(true);
      setError('');
      
      // For demo purposes, generate a random user ID if not set
      setCurrentUserId(localStorage.getItem('userId') || `user-${Math.floor(Math.random() * 1000)}`);
    });

    newSocket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setConnected(false);
      setError(`Connection error: ${err.message}`);
    });

    newSocket.on('error', (errorMessage) => {
      console.error('Socket error:', errorMessage);
      setError(errorMessage);
    });

    newSocket.on('message', (message) => {
      if (typeof message === 'string') {
        // System message
        setMessages((prev) => [
          ...prev,
          { userId: 'system', message, timestamp: new Date() },
        ]);
      } else {
        // User message
        setMessages((prev) => [...prev, message]);
      }
    });

    setSocket(newSocket);

    // Clean up on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  // Join room when socket is available and roomId changes
  useEffect(() => {
    if (socket && connected && roomId) {
      // Leave previous room if any
      socket.emit('leaveRoom', roomId);
      
      // Join new room
      socket.emit('joinRoom', roomId);
      
      // Clear messages when changing rooms
      setMessages([]);
    }
  }, [socket, connected, roomId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() && socket && connected) {
      socket.emit('chatMessage', {
        roomId,
        message: messageInput,
      });
      setMessageInput('');
    }
  };

  const changeRoom = (newRoomId: string) => {
    setRoomId(newRoomId);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Group Chat</h1>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => changeRoom('room1')}
            className={`px-3 py-1 rounded ${
              roomId === 'room1' ? 'bg-blue-800' : 'bg-blue-700 hover:bg-blue-800'
            }`}
          >
            Room 1
          </button>
          <button
            onClick={() => changeRoom('room2')}
            className={`px-3 py-1 rounded ${
              roomId === 'room2' ? 'bg-blue-800' : 'bg-blue-700 hover:bg-blue-800'
            }`}
          >
            Room 2
          </button>
        </div>
        <div className="text-sm mt-1">
          {connected ? (
            <span className="text-green-300">Connected as {currentUserId}</span>
          ) : (
            <span className="text-red-300">Disconnected</span>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-2 text-center">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.userId === 'system'
                  ? 'text-center text-gray-500 italic'
                  : msg.userId === currentUserId
                  ? 'text-right'
                  : 'text-left'
              }`}
            >
              {msg.userId !== 'system' && (
                <div
                  className={`inline-block rounded-lg p-3 ${
                    msg.userId === currentUserId
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 border border-gray-300'
                  }`}
                >
                  <div className="text-sm font-semibold mb-1">
                    {msg.userId === currentUserId ? 'You' : `User ${msg.userId}`}
                  </div>
                  <div>{msg.message}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              )}
              {msg.userId === 'system' && (
                <div className="py-2">{msg.message}</div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="bg-white border-t p-4">
        <div className="flex">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!connected}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!connected || !messageInput.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}