// =================================================================
// Archivo: src/context/AuthContext.tsx
// Contexto global de sesión: autenticación real contra la API REST
// (Sesión 5) usando JWT y almacenamiento seguro en sessionStorage.
// =================================================================
import React, { createContext, useContext, useState } from 'react';
import { authService, AuthUser } from '../services/authService';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // SEGURIDAD: se prefiere sessionStorage sobre localStorage para evitar que
  // la sesión persista indefinidamente en equipos de salas de cómputo compartidas.
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('token'));
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? (JSON.parse(savedUser) as AuthUser) : null;
  });

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    setToken(data.accessToken);
    setUser(data.user);
    sessionStorage.setItem('token', data.accessToken);
    sessionStorage.setItem('user', JSON.stringify(data.user));
  };

  const logout = () => {
    authService.logout(token);
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        isAdmin: user?.role === 'Administrador',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  return context;
};

export default AuthContext;
