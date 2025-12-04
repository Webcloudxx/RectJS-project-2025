import '../styles/main.css';

export function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} CarMeetHub</p>
    </footer>
  );
}