import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Messages = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      tenant: {
        id: 1,
        name: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        property: 'Sunny Apartment'
      },
      lastMessage: 'Hi, is the apartment still available?',
      time: '2h ago',
      unread: true
    },
    {
      id: 2,
      tenant: {
        id: 2,
        name: 'Jane Smith',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        property: 'Cozy Studio'
      },
      lastMessage: 'Thanks for the information!',
      time: '1d ago',
      unread: false
    },
    {
      id: 3,
      tenant: {
        id: 3,
        name: 'Mike Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        property: 'Modern Loft'
      },
      lastMessage: 'Can we schedule a viewing?',
      time: '3d ago',
      unread: false
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Load messages for the selected conversation
  useEffect(() => {
    if (selectedConversation) {
      // In a real app, you would fetch messages for this conversation
      const dummyMessages = [
        { id: 1, text: 'Hi, is the apartment still available?', sender: 'tenant', time: '2h ago' },
        { id: 2, text: 'Yes, it is! Would you like to schedule a viewing?', sender: 'landlord', time: '1h ago' },
        { id: 3, text: 'That would be great!', sender: 'tenant', time: '1h ago' }
      ];
      setMessages(dummyMessages);

      // Mark as read
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation 
            ? { ...conv, unread: false } 
            : conv
        )
      );
    }
  }, [selectedConversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // In a real app, you would send the message to your backend
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'landlord',
      time: 'Just now'
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="flex h-[calc(100vh-200px)]">
        {/* Conversations list */}
        <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Messages</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {conversations.map((conversation) => (
              <div 
                key={conversation.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedConversation === conversation.id ? 'bg-blue-50' : ''}`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                    {conversation.tenant.avatar ? (
                      <img 
                        className="h-10 w-10 rounded-full" 
                        src={conversation.tenant.avatar} 
                        alt={conversation.tenant.name} 
                      />
                    ) : (
                      getInitials(conversation.tenant.name)
                    )}
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className={`text-sm font-medium ${conversation.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                        {conversation.tenant.name}
                      </p>
                      <p className="text-xs text-gray-500">{conversation.time}</p>
                    </div>
                    <p className={`text-sm ${conversation.unread ? 'font-medium text-gray-900' : 'text-gray-500'} truncate`}>
                      {conversation.lastMessage}
                    </p>
                    <p className="text-xs text-gray-500">{conversation.tenant.property}</p>
                  </div>
                  {conversation.unread && (
                    <span className="ml-2 h-2 w-2 rounded-full bg-blue-500"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-gray-200 flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                  {conversations.find(c => c.id === selectedConversation)?.tenant.avatar ? (
                    <img 
                      className="h-10 w-10 rounded-full" 
                      src={conversations.find(c => c.id === selectedConversation)?.tenant.avatar} 
                      alt={conversations.find(c => c.id === selectedConversation)?.tenant.name} 
                    />
                  ) : (
                    getInitials(conversations.find(c => c.id === selectedConversation)?.tenant.name || 'U')
                  )}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {conversations.find(c => c.id === selectedConversation)?.tenant.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {conversations.find(c => c.id === selectedConversation)?.tenant.property}
                  </p>
                </div>
                <div className="ml-auto">
                  <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'landlord' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.sender === 'landlord'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 text-right ${
                          msg.sender === 'landlord' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-l-md shadow-sm py-2 px-4 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a conversation or start a new one
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
