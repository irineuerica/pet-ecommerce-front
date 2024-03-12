import { createContext, useState } from 'react';
import { UsuarioInterface } from '../interfaces/usuario.interface';

type UsuarioContextData = {
  usuario: UsuarioInterface | {};
  setUsuario: (data: UsuarioInterface) => void | {};
};

const UsuariContext = createContext<UsuarioContextData | undefined>(undefined);

interface UsuarioProviderProps {
  children: React.ReactNode;
}

export const UsuarioProvider: React.FC<UsuarioProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState({});

  const contextoData: UsuarioContextData = {
    usuario,
    setUsuario,
  };

  return <UsuariContext.Provider value={contextoData}>{children}</UsuariContext.Provider>;
};

export default UsuariContext;
