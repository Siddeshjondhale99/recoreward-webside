import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminService, userService } from '../services/api';
import { 
  Users, 
  Trash2, 
  Coins, 
  PieChart as PieIcon, 
  TrendingUp, 
  Trophy,
  Activity,
  ArrowUpRight,
  Download,
  Calendar
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid
} from 'recharts';
import LoadingScreen from '../components/LoadingScreen';

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, analyticsRes] = await Promise.all([
          adminService.getDashboard(),
          adminService.getAnalytics()
        ]);
        setStats(statsRes.data);
        setAnalytics(analyticsRes.data);
      } catch (err) {
        console.error('Failed to fetch admin data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) return <LoadingScreen />;

  const pieData = Object.entries(analytics.waste_distribution).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  const COLORS = ['#4F46E5', '#3B82F6', '#6366F1', '#818CF8'];

  const trendData = [
    { name: 'Mon', weight: 4.2 },
    { name: 'Tue', weight: 5.8 },
    { name: 'Wed', weight: 3.1 },
    { name: 'Thu', weight: 8.4 },
    { name: 'Fri', weight: 6.2 },
    { name: 'Sat', weight: 12.5 },
    { name: 'Sun', weight: 9.8 },
  ];

  return (
    <div className="container dash-layout">
      <header style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)', marginBottom: '0.5rem' }}>Core Analytics</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Central monitoring and resource management.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '350px' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 0.75rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
             <Calendar size={14} /> 30 Days
          </div>
          <button className="btn-primary" style={{ flex: 1, padding: '0.625rem 1rem', fontSize: '0.8125rem' }}>
            <Download size={16} /> Export
          </button>
        </div>
      </header>

      <div className="stats-grid" style={{ marginBottom: '3rem' }}>
        <AdminStatCard icon={<Users size={20} />} label="Total Users" value={stats.total_users} />
        <AdminStatCard icon={<Trash2 size={20} />} label="Gross Waste" value={`${stats.total_waste_kg.toFixed(1)}kg`} />
        <AdminStatCard icon={<Coins size={20} />} label="Credits" value={stats.total_points_in_circulation} />
      </div>

      <div className="dash-grid" style={{ marginBottom: '3rem' }}>
        <section className="glass" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <TrendingUp size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '1rem' }}>Usage Trends</h3>
             </div>
             <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>+12.4% vs last week</span>
          </div>
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="adminTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid var(--border-subtle)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="weight" stroke="var(--primary)" strokeWidth={2.5} fillOpacity={1} fill="url(#adminTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="glass" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
             <PieIcon size={18} color="var(--accent-blue)" />
             <h3 style={{ fontSize: '1rem' }}>Resource Allocation</h3>
          </div>
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid var(--border-subtle)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
             {pieData.map((entry, index) => (
               <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', background: COLORS[index % COLORS.length], borderRadius: '50%' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{entry.name}</span>
               </div>
             ))}
          </div>
        </section>
      </div>

      <section className="glass" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <Trophy size={18} color="#F59E0B" />
          <h3 style={{ fontSize: '1rem' }}>Global Leaderboard</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
           {analytics.leaderboard.map((user, index) => (
             <div key={index} style={{ padding: '1.25rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)' }}>#{index + 1}</span>
                 <div>
                   <p style={{ fontWeight: 600 }}>{user.name}</p>
                   <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Verified Eco-Warrior</p>
                 </div>
               </div>
               <div style={{ textAlign: 'right' }}>
                 <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{user.points} pts</span>
                 <p style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 600 }}>Rank: A+</p>
               </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

const AdminStatCard = ({ icon, label, value }) => (
  <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <div style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
      {icon}
    </div>
    <div>
      <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.125rem' }}>{label}</p>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{value}</h2>
    </div>
  </div>
);

export default Admin;
