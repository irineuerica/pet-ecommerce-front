import { createContext } from 'react';

import useAuth from '../hooks/authHooks';

type Props = {
    children: React.ReactNode;
};

type AuthContextData = {
    email: string;
    password: string;
    loading: boolean;
    authenticated: boolean
    handleLogin: () => void;
    handleLogout: () => void;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: Props) {
    const {
        email, password, authenticated, loading, handleLogin, handleLogout, setEmail, setPassword
    } = useAuth();

    return (
        <AuthContext.Provider value={{ email, password, loading, authenticated, handleLogin, handleLogout, setEmail, setPassword }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };