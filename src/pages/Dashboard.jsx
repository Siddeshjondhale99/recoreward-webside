import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userService, rewardService } from '../services/api';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  Package, 
  Zap, 
  ArrowUpRight,
  ChevronRight,
  Filter,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyRes, rewardsRes] = await Promise.all([
          userService.getHistory(),
          rewardService.getRewards()
        ]);
        setHistory(historyRes.data.reverse());
        setRewards(rewardsRes.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalWaste = history.reduce((acc, curr) => acc + curr.weight, 0);

  if (loading) return <div className="loading-state">Initialising platform...</div>;

  return (
    <div className="container dash-layout">
      <header style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Overview</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user.name}. Your impact is growing.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}>Download Report</button>
          <button className="btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}>
            <Plus size={16} /> New Disposal
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <StatCard icon={<Zap size={20} />} label="Total Points" value={user.points} color="var(--primary)" />
            <StatCard icon={<Package size={20} />} label="Recycled" value={`${totalWaste.toFixed(1)}kg`} color="var(--accent-blue)" />
            <StatCard icon={<TrendingUp size={20} />} label="Impact Score" value="84/100" color="#10B981" />
          </div>

          {/* Activity Table */}
          <section className="glass" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem' }}>Recent Activity</h3>
              <button className="nav-link" style={{ fontSize: '0.75rem', fontWeight: 600 }}>View all logs</button>
            </div>
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Waste Type</th>
                  <th>Date</th>
                  <th>Weight</th>
                  <th>Points</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.slice(0, 5).map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600, textTransform: 'capitalize' }}>{item.waste_type}</td>
                    <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                    <td>{item.weight} kg</td>
                    <td style={{ color: 'var(--primary)', fontWeight: 700 }}>+{item.points_earned}</td>
                    <td>
                      <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.6rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: '4px', fontWeight: 700 }}>
                        VERIFIED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        {/* Sidebar Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Impact Level Card */}
          <div className="glass" style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#fff', marginBottom: '1.5rem' }}>
              <Award size={20} />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Elite Tier Status</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              You are 150 points away from unlocking the **Eco-Champion** badge.
            </p>
            <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '75%', background: 'var(--primary)' }} />
            </div>
          </div>

          {/* Quick Rewards Grid */}
          <section className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Redeem Offers</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {rewards.slice(0, 3).map((reward) => (
                 <div key={reward.id} className="mini-reward-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{reward.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>{reward.points_required} Points</p>
                    </div>
                    <ArrowUpRight size={16} color="var(--text-secondary)" />
                 </div>
               ))}
            </div>
            <Link to="/rewards" style={{ display: 'block', marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Explore reward marketplace <ChevronRight size={14} style={{ marginBottom: '-2px' }} />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="glass" style={{ padding: '1.5rem 2rem' }}>
    <div style={{ color, marginBottom: '1.25rem' }}>{icon}</div>
    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{label}</p>
    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value}</h3>
  </div>
);

export default Dashboard;
