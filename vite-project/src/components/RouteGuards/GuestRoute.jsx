import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext.js';

export function GuestRoute({ children }) {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}