import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, AlertCircle, ChevronRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please attempt authentication again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-card glass"
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ width: '48px', height: '48px', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'var(--primary)', margin: '0 auto 1.5rem' }}>
            <LogIn size={20} />
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Account Log in</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>Enter your credentials to access the platform.</p>
        </div>

        {error && (
          <div className="error-box" style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '0.875rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--error)' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Email address</label>
            <div className="input-wrapper">
              <Mail size={16} color="var(--text-secondary)" />
              <input 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Password</label>
              <a href="#" style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>Forgot?</a>
            </div>
            <div className="input-wrapper">
              <Lock size={16} color="var(--text-secondary)" />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center', height: '48px' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign in to platform'}
          </button>
        </form>

        <p style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600, marginLeft: '4px' }}>Sign up <ChevronRight size={14} style={{ marginBottom: '-2px' }} /></Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
