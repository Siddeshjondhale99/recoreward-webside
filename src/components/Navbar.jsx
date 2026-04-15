import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, LogOut, User, LayoutGrid, Award, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar glass ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <Link to="/" className="logo">
          <Leaf className="logo-icon" size={22} color="var(--primary)" />
          <span>EcoReward</span>
        </Link>

        <div className="nav-links">
          {user ? (
            <>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
                Dashboard
              </Link>
              <Link to="/rewards" className={`nav-link ${isActive('/rewards') ? 'active' : ''}`}>
                Rewards
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
                  Analytics
                </Link>
              )}
              
              <div style={{ width: '1px', height: '20px', background: 'var(--border-subtle)', margin: '0 0.5rem' }} />
              
              <div className="user-dropdown" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{user.name}</span>
                <button onClick={handleLogout} className="logout-btn" style={{ color: 'var(--text-secondary)' }}>
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Log in</Link>
              <Link to="/register" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.8125rem' }}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .navbar.scrolled {
          background: rgba(13, 17, 23, 0.85);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
