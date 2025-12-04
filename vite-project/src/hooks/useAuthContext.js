import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

export function useAuthContext() {
  return useContext(AuthContext);
}