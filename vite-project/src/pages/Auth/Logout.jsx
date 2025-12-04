import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { logout as logoutRequest } from '../../services/authService.js';

export function Logout() {
  const { accessToken, logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function doLogout() {
      try {
        if (accessToken) {
          await logoutRequest(accessToken);
        }
      } catch (err) {
        console.warn('Logout request failed:', err.message);
      } finally {
        logout();
        navigate('/', { replace: true });
      }
    }

    doLogout();
  }, []);

  return null;
}