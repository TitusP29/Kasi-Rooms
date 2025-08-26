import React, { createContext, useContext, useState, useCallback } from 'react';
import bcrypt from 'bcryptjs';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load users from localStorage on initial load and create admin if none exists
  React.useEffect(() => {
    const initializeAdmin = async () => {
      try {
        let savedUsers = [];
        const savedUsersData = localStorage.getItem('kasiRoomsUsers');
        
        if (savedUsersData) {
          try {
            savedUsers = JSON.parse(savedUsersData);
            setUsers(savedUsers);
          } catch (e) {
            console.error('Error parsing saved users, resetting...', e);
            localStorage.removeItem('kasiRoomsUsers');
          }
        }
        
        // Check if admin user exists
        const adminExists = savedUsers.some(user => user.userType === 'admin');
        
        if (!adminExists) {
          try {
            // Create default admin user
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('Admin123', salt);
            
            const adminUser = {
              id: 'admin-' + Date.now(),
              email: 'admin@kasirooms.com',
              password: hashedPassword,
              fullName: 'Admin User',
              userType: 'admin',
              status: 'active',
              createdAt: new Date().toISOString()
            };
            
            console.log('Creating admin user with details:', {
              email: adminUser.email,
              userType: adminUser.userType,
              hashedPassword: adminUser.password
            });
            
            const updatedUsers = [...savedUsers, adminUser];
            setUsers(updatedUsers);
            localStorage.setItem('kasiRoomsUsers', JSON.stringify(updatedUsers));
            console.log('Default admin user created!');
            console.log('Email: admin@kasirooms.com');
            console.log('Password: Admin123');
          } catch (error) {
            console.error('Error creating admin user:', error);
          }
        }
      } catch (error) {
        console.error('Failed to initialize users', error);
      }
    };
    
    initializeAdmin();
  }, []);

  // Save users to localStorage whenever it changes
  React.useEffect(() => {
    try {
      localStorage.setItem('kasiRoomsUsers', JSON.stringify(users));
    } catch (error) {
      console.error('Failed to save users to localStorage', error);
    }
  }, [users]);

  const register = async ({ email, password, fullName, userType }) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate input
      if (!email || !password || !fullName || !userType) {
        throw new Error('All fields are required');
      }

      // Check if email already exists (case insensitive)
      const emailExists = users.some(
        user => user.email.toLowerCase() === email.toLowerCase()
      );
      
      if (emailExists) {
        // If it's the admin email, don't throw an error, just log it
        if (email.toLowerCase() === 'admin@kasirooms.com') {
          console.log('Admin user already exists, proceeding with login...');
          // Try to log in instead
          return login(email, password);
        }
        throw new Error('Email is already registered');
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        fullName: fullName.trim(),
        userType,
        createdAt: new Date().toISOString()
      };

      // Update state
      setUsers(prev => [...prev, newUser]);
      
      // Auto-login after registration
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      setUserRole(userType);
      
      return { success: true };
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      console.log('Login attempt for email:', email);
      
      // Find user by email (case-insensitive)
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        console.log('User not found');
        throw new Error('Invalid email or password');
      }
      
      // Check password with bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        console.log('Invalid password for user:', user.email);
        throw new Error('Invalid email or password');
      }
      
      console.log('Login successful, user type:', user.userType);
      
      // Ensure userType is set correctly
      if (!user.userType) {
        console.warn('User has no userType, defaulting to tenant');
        user.userType = 'tenant';
      }
      
      // Update auth state
      setCurrentUser(user);
      setIsAuthenticated(true);
      setUserRole(user.userType);
      
      console.log('Auth state updated:', { 
        isAuthenticated: true, 
        userType: user.userType,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName
        }
      });
      
      return { 
        success: true, 
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          userType: user.userType
        } 
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsAuthenticated(false);
      setUserRole(null);
      setCurrentUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId, status) => {
    try {
      setLoading(true);
      setError(null);
      
      // Update the user's status in the users array
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, status } : user
      ));
      
      // If the current user is the one being updated, update currentUser state
      if (currentUser && currentUser.id === userId) {
        setCurrentUser(prev => ({ ...prev, status }));
      }
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    userRole,
    currentUser,
    loading,
    error,
    login,
    logout,
    register,
    updateUserStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
