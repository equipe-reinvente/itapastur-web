import React, { createContext, useState } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate = useNavigate();

  const verifyToken = () => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (token) {
      Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setAuthToken(token)
      setUser(user)
      setIsAuthenticated(true)
      navigate('Main')
    } else {
      navigate('Login')
    }
  }

  const login = async (userParams) => {
    try {
      const response = await Api.post('/login', {
        email: userParams.email,
        password: userParams.password,
      });

      setAuthToken(response.data['token'])
      setUser(response.data['user'])
      Api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

      localStorage.setItem('token', JSON.stringify(authToken))
      localStorage.setItem('user', JSON.stringify(user))
      setIsAuthenticated(true)
      navigate('/main')
    } catch (error) {
      console.error('Login error:', error);
      alert('Error in login!');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    Api.defaults.headers.common['Authorization'] = ''
    setAuthToken(null)
    setUser(null)
    setIsAuthenticated(false)
    navigate('Login');
  }

  const register = async (userParams) => {
    try {
      const response = await Api.post('/users', {
        email: userParams.email,
        password: userParams.password,
        name: userParams.name,
        is_turist: false,
      });

      setAuthToken(response.data['token'])
      setUser(response.data['user'])
      Api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

      localStorage.setItem('token', JSON.stringify(authToken))
      localStorage.setItem('user', JSON.stringify(user))
      setIsAuthenticated(true)
      navigate('/main')
    } catch (error) {
      console.error('Register error:', error);
      alert('Error in register!');
    }
  };

  return (
    <AuthContext.Provider value={{ login, verifyToken, logout, isAuthenticated, register }}>
      {children}
    </AuthContext.Provider>
  )
}