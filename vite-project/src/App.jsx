import { AuthProvider } from './contexts/AuthContext.jsx';
import { AppRouter } from './routes/AppRouter.jsx';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';

export default function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
