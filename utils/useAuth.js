// // utils/useAuth.js
// import { useState, useEffect, createContext, useContext } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Load token on app start
//     const loadToken = async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem('token');
//         const storedUser = await AsyncStorage.getItem('user');
//         if (storedToken) {
//           setToken(storedToken);
//           setUser(JSON.parse(storedUser));
//         }
//       } catch (e) {
//         console.error('Auth load error', e);
//       }
//     };
//     loadToken();
//   }, []);

//   const login = async (token, user) => {
//     setToken(token);
//     setUser(user);
//     await AsyncStorage.setItem('token', token);
//     await AsyncStorage.setItem('user', JSON.stringify(user));
//   };

//   const logout = async () => {
//     setToken(null);
//     setUser(null);
//     await AsyncStorage.removeItem('token');
//     await AsyncStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// utils/useAuth.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (err) {
        console.error('Failed to load token:', err);
      }
    };
    loadToken();
  }, []);

  const login = async (newToken) => {
    try {
      await AsyncStorage.setItem('token', newToken);
      setToken(newToken);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
