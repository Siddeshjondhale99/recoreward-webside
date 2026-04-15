import React from 'react';
import { Leaf, Github, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="footer-premium" style={{ paddingTop: '6rem', paddingBottom: '3rem', borderTop: '1px solid var(--border-subtle)', background: 'linear-gradient(to bottom, transparent, rgba(79, 70, 229, 0.02))' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
          
          {/* Brand Section */}
          <div style={{ gridColumn: 'span 2' }}>
            <Link to="/" className="logo" style={{ marginBottom: '1.5rem', display: 'flex' }}>
              <Leaf size={24} color="var(--primary)" />
              <span style={{ fontSize: '1.25rem', fontWeight: 800, marginLeft: '0.75rem' }}>EcoReward</span>
            </Link>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '300px', fontSize: '0.875rem', lineHeight: 1.6 }}>
              The high-precision ecosystem designed to reward ecological responsibility through AI and IoT integration.
            </p>
            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '2rem' }}>
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Github size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
              <SocialIcon icon={<Mail size={18} />} />
            </div>
          </div>
          {/* Link Columns */}
          <FooterColumn title="Platform" links={[
            { label: 'Dashboard', to: '/dashboard' },
            { label: 'Rewards', to: '/rewards' },
            { label: 'Analytics', to: '/admin' },
            { label: 'System Status', to: '#' }
          ]} />
          <FooterColumn title="Information" links={[
            { label: 'How it Works', to: '#' },
            { label: 'IoT Integration', to: '#' },
            { label: 'Community', to: '#' },
            { label: 'Eco-Tips', to: '#' }
          ]} />
          <FooterColumn title="Company" links={[
            { label: 'Privacy Policy', to: '#' },
            { label: 'Terms of Use', to: '#' },
            { label: 'Security', to: '#' },
            { label: 'Contact', to: '#' }
          ]} />
        </div>
        {/* Bottom Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            © 2026 EcoReward Platform. Built for the sustainable future.
          </p>
          <button onClick={scrollToTop} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            BACK TO TOP <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
const FooterColumn = ({ title, links }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
    <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h4>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {links.map((link, i) => (
        <Link key={i} to={link.to} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', transition: '0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>
          {link.label}
        </Link>
      ))}
    </div>
  </div>
);
const SocialIcon = ({ icon }) => (
  <a href="#" style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', transition: '0.2s' }} onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }} onMouseOut={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}>
    {icon}
  </a>
);
export default Footer;