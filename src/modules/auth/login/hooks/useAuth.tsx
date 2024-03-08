import { useState, useEffect } from 'react';
import { api } from 'src/config/api.config';

import { useRouter } from 'next/router';
import { useAuthQuery } from './react-query/useAuthQuery';
import { UsuarioInterface } from '@modules/usuarios/interfaces/usuario.type';

export interface handleLoginProps {
  email: string;
  senha: string;
}

export default function useAuth() {
  const router = useRouter();
  const {handleLogin, handleLoginIsLoading} = useAuthQuery()
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<UsuarioInterface>();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleUserLogin({email, senha}: handleLoginProps) {
    const { token, usuario } = await handleLogin({ email, senha });
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('usuario', JSON.stringify(usuario));
    console.log('usuario', usuario)
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUsuario(usuario)
    setAuthenticated(true);
    router.push('/minha-conta')
  }

  function handleLogout() {
    setAuthenticated(false);
    // @ts-ignore
    setUsuario({});
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    api.defaults.headers.Authorization = null;
  }

  return { usuario, authenticated, loading, handleUserLogin, handleLogout};
}
