import React, { createContext, useState } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const verifyToken = () => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (token) {
      Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setAuthToken(token)
      setUser(user)
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
      navigate('/main')
    } catch (error) {
      console.error('Login error:', error);
      alert('Error in login!');
    }
  };

  return (
    <AuthContext.Provider value={{ login }}>
      {children}
    </AuthContext.Provider>
  )
}