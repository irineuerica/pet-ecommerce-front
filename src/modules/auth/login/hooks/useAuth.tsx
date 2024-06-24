import { useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";
import { api } from "src/config/api.config";
import { useAuthQuery } from "./react-query/useAuthQuery";

export interface UsuarioInterface {
  id: string;
  nome: string;
  email: string;
}

export interface handleLoginProps {
  email: string;
  senha: string;
}

export interface handleUserLoginToken {
  token: string;
  usuario: UsuarioInterface;
}

export interface AuthContextProps {
  usuario: UsuarioInterface | null;
  authenticated: boolean;
  loading: boolean;
  handleUserLogin: ({ email, senha }: handleLoginProps) => Promise<void>;
  handleLogout: () => void;
  handleUserLoginToken: ({ token, usuario }: handleUserLoginToken) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const AuthProvider: React.FC = ({ children }: any) => {
  const router = useRouter();
  const { handleLogin } = useAuthQuery();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<UsuarioInterface | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const validateToken = async (token: string) => {
      try {
        const response = await api.get('/utils/validate-token', {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        if (response.status === 200) {
          setAuthenticated(true);
          const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
          setUsuario(usuario);
        } else {
          handleLogout();
        }
      } catch (error) {
        handleLogout();
      }
      setLoading(false);
    };

    if (token) {
      validateToken(token);
    } else {
      setLoading(false);
    }
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
    router.push('/minha-conta');
  }

  function handleLogout() {
    setAuthenticated(false);
    setUsuario(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    api.defaults.headers.Authorization = null;
  }

  return (
    <AuthContext.Provider value={{ usuario, authenticated, loading, handleUserLogin, handleLogout, handleUserLoginToken }}>
      {children}
    </AuthContext.Provider>
  );
};