import { Link, NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext.js';
import '../styles/header.css';

export function Header() {
  const { isAuthenticated, username, logout } = useAuthContext();

  return (
    <header className="site-header">
      <nav>
        <Link to="/" className="logo">
            Car meet hub
        </Link>

        <ul className="nav-links">
          <li>
            <NavLink to="/events">Catalog</NavLink>
          </li>

          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/events/create">Create Event</NavLink>
              </li>
              <li>
                <NavLink to="/my-events">My Events</NavLink>
              </li>
            </>
          )}
        </ul>

        <ul className="nav-auth">
          {isAuthenticated ? (
            <>
              <li className="welcome">Hi, {username}</li>
              <li>
                <NavLink to="/logout">
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}