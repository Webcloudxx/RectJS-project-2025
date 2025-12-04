import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section>
      <h2>404 – Page not found</h2>
      <Link to="/">Go home</Link>
    </section>
  );
}