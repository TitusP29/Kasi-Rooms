import React, { createContext, useContext, useState } from 'react';

const RoomContext = createContext(null);

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (context === null) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};

const initialRooms = [
  {
    id: 101,
    title: 'Cozy Backroom near Taxi Rank',
    location: 'Katlehong, Zone 3',
    price: 1600,
    image: 'https://via.placeholder.com/300x200',
    occupied: false,
    approved: true,
    description: 'A cozy backroom near the taxi rank, perfect for students.',
    amenities: ['WiFi', 'Parking'],
    landlord: 'landlord1',
  },
  {
    id: 102,
    title: 'Secure Room with Wifi',
    location: 'Daveyton, Etwatwa',
    price: 2200,
    image: 'https://via.placeholder.com/300x200',
    occupied: false,
    approved: false,
    description: 'A secure room with fast WiFi, close to amenities.',
    amenities: ['WiFi', 'Security'],
    landlord: 'landlord2',
  },
  {
    id: 103,
    title: 'Modern Studio Apartment',
    location: 'Germiston, Primrose',
    price: 3500,
    image: 'https://via.placeholder.com/300x200',
    occupied: true,
    approved: true,
    description: 'A modern studio apartment with all amenities included.',
    amenities: ['WiFi', 'Kitchen', 'Bathroom', 'Security'],
    landlord: 'landlord1',
  },
];

const initialUsers = [
  {
    id: 'landlord1',
    name: 'John Mthembu',
    email: 'john.mthembu@email.com',
    phone: '+27 73 123 4567',
    role: 'landlord',
    joinDate: '2024-01-15',
  },
  {
    id: 'landlord2',
    name: 'Sarah Ndlovu',
    email: 'sarah.ndlovu@email.com',
    phone: '+27 82 987 6543',
    role: 'landlord',
    joinDate: '2024-02-20',
  },
  {
    id: 'tenant1',
    name: 'Thabo Sithole',
    email: 'thabo.sithole@email.com',
    phone: '+27 71 555 1234',
    role: 'tenant',
    joinDate: '2024-03-10',
  },
  {
    id: 'tenant2',
    name: 'Nomsa Khumalo',
    email: 'nomsa.khumalo@email.com',
    phone: '+27 84 777 8899',
    role: 'tenant',
    joinDate: '2024-03-25',
  },
  {
    id: 'tenant3',
    name: 'Sipho Dlamini',
    email: 'sipho.dlamini@email.com',
    phone: '+27 76 333 2211',
    role: 'tenant',
    joinDate: '2024-04-05',
  },
];

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(initialRooms);
  const [users, setUsers] = useState(initialUsers);

  const addRoom = (room) => {
    setRooms(prev => [
      ...prev,
      { ...room, id: Date.now(), occupied: false, approved: false }
    ]);
  };

  const updateRoom = async (id, updates) => {
    return new Promise((resolve, reject) => {
      try {
        setRooms(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
        // Simulate API delay
        setTimeout(() => resolve(), 500);
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteRoom = async (id) => {
    return new Promise((resolve, reject) => {
      try {
        setRooms(prev => prev.filter(r => r.id !== id));
        // Simulate API delay
        setTimeout(() => resolve(), 500);
      } catch (error) {
        reject(error);
      }
    });
  };

  const toggleOccupied = (id) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, occupied: !r.occupied } : r));
  };

  // User management functions
  const addUser = (user) => {
    setUsers(prev => [
      ...prev,
      { ...user, id: Date.now().toString(), joinDate: new Date().toISOString().split('T')[0] }
    ]);
  };

  const updateUser = (id, updates) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  // Simulate fetching more rooms (in a real app, this would be an API call)
  const fetchMoreRooms = async () => {
    // In a real app, this would fetch more rooms from an API
    // For now, we'll just return the existing rooms
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(rooms);
      }, 500);
    });
  };

  return (
    <RoomContext.Provider value={{ 
      rooms, 
      addRoom, 
      updateRoom, 
      deleteRoom, 
      toggleOccupied,
      users,
      addUser,
      updateUser,
      deleteUser,
      fetchMoreRooms
    }}>
      {children}
    </RoomContext.Provider>
  );
};

