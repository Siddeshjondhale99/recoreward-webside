import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, BarChart3, ArrowRight, Recycle, Globe, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-page" style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section className="hero" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', zIndex: 1 }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-full)', fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
               <span style={{ color: 'var(--primary)', fontWeight: 700 }}>New</span> Eco-Leaderboard is now live <ChevronRight size={14} />
            </div>
            <h1 style={{ fontSize: 'clamp(2.25rem, 8vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
               The future of <br />
               <span className="text-gradient">sustainable waste.</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginBottom: '3rem', lineHeight: 1.5 }}>
              A high-precision ecosystem designed to reward ecological responsibility. 
              Track your impact, earn credits, and redeem rewards with professional-grade transparency.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn-primary" style={{ padding: '0.875rem 2rem', width: '240px', justifyContent: 'center' }}>
                Join the platform <ArrowRight size={20} />
              </Link>
              <button className="btn-secondary" style={{ padding: '0.875rem 2rem', width: '240px', justifyContent: 'center' }}>How it works</button>
            </div>
          </motion.div>
        </div>
        
        {/* Subtle Background Mesh */}
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, rgba(3, 7, 18, 0) 70%)', filter: 'blur(60px)', zIndex: 0 }}></div>
      </section>

      {/* Bento Grid Features */}
      <section style={{ padding: 'clamp(5rem, 15vw, 10rem) 0' }}>
        <div className="container">
          <div style={{ marginBottom: 'clamp(3rem, 8vw, 5rem)' }}>
             <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '1rem' }}>Built for impact.</h2>
             <p style={{ color: 'var(--text-secondary)', maxWidth: '500px' }}>Comprehensive features engineered to streamline waste management and reward participation.</p>
          </div>
          
          <div className="bento-grid">
            <div className="bento-item large glass">
               <Zap size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
               <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Real-time Credit System</h3>
               <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>Advanced ledger technology that issues rewards instantly upon verified waste disposal in smart containers. High precision, zero delay.</p>
            </div>
            <div className="bento-item glass">
               <ShieldCheck size={32} color="var(--accent-blue)" style={{ marginBottom: '1.5rem' }} />
               <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>AI-Driven Sorting</h3>
               <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Enterprise-grade classification service ensuring high-accuracy sorting and contamination prevention.</p>
            </div>
            <div className="bento-item glass">
               <BarChart3 size={32} color="#10B981" style={{ marginBottom: '1.5rem' }} />
               <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Metric Analysis</h3>
               <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Detailed breakdown of your ecological footprint with weekly reports and carbon offset calculations.</p>
            </div>
            <div className="bento-item large glass" style={{ background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(3, 7, 18, 0) 100%)' }}>
               <Globe size={32} color="#F59E0B" style={{ marginBottom: '1.5rem' }} />
               <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Decentralised Collection</h3>
               <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>Join a growing network of intelligent bins that communicate with the central backbone to optimize collection schedules and resource recovery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ paddingBottom: 'clamp(6rem, 15vw, 12rem)' }}>
        <div className="container">
           <div className="glass" style={{ padding: 'clamp(3rem, 10vw, 6rem) 1.5rem', textAlign: 'center', background: 'radial-gradient(circle at top right, rgba(79, 70, 229, 0.1), transparent 40%)' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '1.5rem' }}>Ready to contribute?</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Create your account today and gain immediate access to the global leaderboard and reward marketplace.
              </p>
              <Link to="/register" className="btn-primary" style={{ display: 'inline-flex', padding: '1rem 3rem' }}>Get Started</Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
