import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus, AlertCircle, User, Fingerprint, ChevronRight } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rfid_id: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match. Please verify your input.');
    }

    setLoading(true);
    try {
      const { confirmPassword, ...signupData } = formData;
      await register(signupData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration encountered an error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ padding: '8rem 0' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-card glass"
        style={{ maxWidth: '520px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ width: '48px', height: '48px', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'var(--primary)', margin: '0 auto 1.5rem' }}>
            <UserPlus size={20} />
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Create Account</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>Join the global ecosystem of sustainable waste management.</p>
        </div>

        {error && (
          <div className="error-box" style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '0.875rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--error)' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Full Name</label>
            <div className="input-wrapper">
              <User size={16} color="var(--text-secondary)" />
              <input 
                type="text" 
                name="name"
                placeholder="John Doe" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Work Email</label>
            <div className="input-wrapper">
              <Mail size={16} color="var(--text-secondary)" />
              <input 
                type="email" 
                name="email"
                placeholder="you@example.com" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>RFID Identifier</label>
            <div className="input-wrapper">
              <Fingerprint size={16} color="var(--text-secondary)" />
              <input 
                type="text" 
                name="rfid_id"
                placeholder="Unique trace ID (e.g. 1A2B)" 
                value={formData.rfid_id}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Password</label>
              <div className="input-wrapper">
                <Lock size={16} color="var(--text-secondary)" />
                <input 
                  type="password" 
                  name="password"
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Confirm</label>
              <div className="input-wrapper">
                <Lock size={16} color="var(--text-secondary)" />
                <input 
                  type="password" 
                  name="confirmPassword"
                  placeholder="••••••••" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center', height: '48px' }} disabled={loading}>
            {loading ? 'Creating profile...' : 'Get Started'}
          </button>
        </form>

        <p style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, marginLeft: '4px' }}>Log in <ChevronRight size={14} style={{ marginBottom: '-2px' }} /></Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
