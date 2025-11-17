/**
 * Redux Migration Example
 * 
 * This file demonstrates how to migrate from Context API to Redux
 */

import React from 'react';
import { useReduxAuth } from '../hooks/useReduxAuth';
import { useReduxTheme } from '../hooks/useReduxTheme';
import type { IUser } from '@/types/auth.type';

// ============================================
// BEFORE: Using Context API
// ============================================
/*
import { useAuth } from '../context/authContext';
import { useUser } from '../context/userContext';
import { useTheme } from '../context/theme/themeContext';

const OldComponent = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { user, loginUser, logoutUser } = useUser();
  const { theme, changeTheme } = useTheme();

  const handleLogin = () => {
    loginUser(userData);
    setIsAuthenticated(true);
  };

  return <div>Old Context API Component</div>;
};
*/

// ============================================
// AFTER: Using Redux
// ============================================

const NewComponent: React.FC = () => {
  const { isAuthenticated, user, login, logout } = useReduxAuth();
  const { theme, toggleTheme } = useReduxTheme();

  const handleLogin = () => {
    const userData = { _id: '1', email: 'user@example.com', firstName: 'John' } as IUser;
    const token = 'your-auth-token';
    login(userData, token);
  };

  const handleLogout = () => {
    logout();
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div className={`p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1>Redux Migration Example</h1>
      
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.firstName || user?.email}</p>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded">
          Login
        </button>
      )}

      <button onClick={handleThemeToggle} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">
        Toggle Theme (Current: {theme})
      </button>
    </div>
  );
};

export default NewComponent;
