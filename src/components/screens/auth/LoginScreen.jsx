import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import InputField from '../../InputField';
import CustomButton from '../../CustomButton';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Check for success message in location state
  React.useEffect(() => {
    const location = window.location;
    if (location.state && location.state.message) {
      setSuccessMessage(location.state.message);
      // Clear the state to avoid showing the message again on refresh
      window.history.replaceState({}, document.title);
    }
  }, []);

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    
    if (!password.trim()) {
      setError('Password is required');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      
      // The AuthContext will update the authentication state
      // We'll rely on the AppNavigator to handle the redirection based on userType
      // Just navigate to the root, and AppNavigator will handle the rest
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '24px',
          color: '#333'
        }}>
          Login to Roomi
        </h2>
        {successMessage && (
          <div style={{
            color: '#28a745',
            textAlign: 'center',
            marginBottom: '16px',
            padding: '8px',
            backgroundColor: '#d4edda',
            borderRadius: '4px'
          }}>
            {successMessage}
          </div>
        )}
        {error && (
          <div style={{
            color: '#dc3545',
            textAlign: 'center',
            marginBottom: '16px',
            padding: '8px',
            backgroundColor: '#f8d7da',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <InputField
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            style={{ marginBottom: '16px' }}
            required
          />
          <InputField
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            style={{ marginBottom: '24px' }}
            required
          />
          <CustomButton
            text={isLoading ? 'Logging in...' : 'Login'}
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: isLoading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          />
        </form>
        <div style={{ 
          textAlign: 'center', 
          marginTop: '20px',
          fontSize: '14px',
          color: '#666' 
        }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/auth/signup')}
            style={{ 
              color: '#007bff', 
              cursor: 'pointer',
              textDecoration: 'underline' 
            }}
          >
            Sign up here
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;