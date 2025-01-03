import { useState, useEffect } from 'react';
import { api } from 'src/config/api.config';

import { useRouter } from 'next/router';
import { useAuthQuery } from './react-query/useAuthQuery';
import { UsuarioInterface } from '@modules/usuarios/interfaces/usuario.interface';
import { PATH_CLIENTE } from 'src/routes/paths';

export interface handleLoginProps {
  email: string;
  senha: string;
}

export interface handleUserLoginToken {
  token: string;
  usuario: UsuarioInterface;
}

export default function useAuth() {
  const router = useRouter();
  const { handleLogin, handleLoginIsLoading } = useAuthQuery();
  const [authenticated, setAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<UsuarioInterface>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('usuario');
  
    if (token && storedUser) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setUsuario(JSON.parse(storedUser)); 
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  
    setLoading(false); 
  }, []);

  async function handleUserLogin({ email, senha }: handleLoginProps) {
    const { token, usuario } = await handleLogin({ email, senha });
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('usuario', JSON.stringify(usuario));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUsuario(usuario);
    setAuthenticated(true);
    router.push('/');
  }

  async function handleUserLoginToken({ token, usuario }: handleUserLoginToken) {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('usuario', JSON.stringify(usuario));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUsuario(usuario);
    setAuthenticated(true);
    router.push('/');
  }

  function handleLogout() {
    setAuthenticated(false);
    // @ts-ignore
    setUsuario();
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    api.defaults.headers.Authorization = null;
  }

  return { usuario, authenticated, loading, handleUserLogin, handleLogout, handleUserLoginToken, setUsuario };
}
