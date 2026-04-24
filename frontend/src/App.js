import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 32px',
    background: '#1a73e8',
    color: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  },
  navBrand: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#fff',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    gap: '16px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '6px 14px',
    borderRadius: '4px',
    transition: 'background 0.2s',
  },
  logoutBtn: {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: '#fff',
    fontWeight: '500',
    padding: '6px 14px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  main: {
    minHeight: 'calc(100vh - 56px)',
    background: '#f1f3f4',
  },
};

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.navBrand}>🏠 Zam Estate</Link>
      <div style={styles.navLinks}>
        {isLoggedIn ? (
          <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={styles.navLink}>Login</Link>
            <Link to="/register" style={styles.navLink}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function Dashboard({ user }) {
  return (
    <div style={{ padding: '40px 32px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        padding: '32px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ margin: '0 0 8px', color: '#202124' }}>Welcome back, {user.name}! 👋</h2>
        <p style={{ color: '#5f6368', margin: '0 0 24px' }}>
          Role: <strong style={{ textTransform: 'capitalize' }}>{user.role}</strong> &nbsp;|&nbsp; {user.email}
        </p>
        <p style={{ color: '#5f6368' }}>
          You are logged in to Zam Estate. Property listings and messaging features are coming soon.
        </p>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = React.useState(() => {
    const stored = localStorage.getItem('zamestate_user');
    return stored ? JSON.parse(stored) : null;
  });

  const isLoggedIn = Boolean(user);

  const handleLoginSuccess = (userData, token) => {
    localStorage.setItem('zamestate_token', token);
    localStorage.setItem('zamestate_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('zamestate_token');
    localStorage.removeItem('zamestate_user');
    setUser(null);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main style={styles.main}>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard user={user} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Register />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
