import { createContext } from 'react';
import useAuth from '../hooks/useAuth';
import { CadastroUsuarioInterface } from '@modules/auth/cadastro-usuario/types/cadastro-usuario-types';

type Props = {
  children: React.ReactNode;
};

type AuthContextData = {
  usuario: CadastroUsuarioInterface;
  handleLogin: () => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: Props) {
  const { usuario, authenticated, loading, handleUserLogin, handleLogout } = useAuth();

  return (
    <AuthContext.Provider
      // @ts-ignore
      value={{ usuario, loading, authenticated, handleUserLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
