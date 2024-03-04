import { useState, useEffect } from 'react';
import { api } from '../config/api.config';

import { useRouter } from 'next/router';

export default function useAuth() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);
  
  async function handleLogin() {
    const { data: { token } } = await api.post('/login',{email, password});

    localStorage.setItem('token', JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
   
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = null;

  }
  
  return { email, password, authenticated, loading, handleLogin, handleLogout, setEmail, setPassword };
}