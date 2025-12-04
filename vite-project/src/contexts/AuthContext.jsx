import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const LOCAL_STORAGE_KEY = 'car-meet-hub-auth';

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : { accessToken: null };
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(auth));
  }, [auth]);

  const login = (authData) => setAuth(authData);
  const logout = () => setAuth({ accessToken: null });

  const value = {
    ...auth,
    isAuthenticated: !!auth.accessToken,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}