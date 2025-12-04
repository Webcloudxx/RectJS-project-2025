import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext.js';

export function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}