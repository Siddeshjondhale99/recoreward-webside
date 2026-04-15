import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { rewardService } from '../services/api';
import { Award, ShoppingBag, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Rewards = () => {
  const { user, setUser } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redeemStatus, setRedeemStatus] = useState({ id: null, message: '', type: '' });

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const response = await rewardService.getRewards();
      setRewards(response.data);
    } catch (err) {
      console.error('Failed to fetch rewards', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (reward) => {
    if (user.points < reward.points_required) return;

    setRedeemStatus({ id: reward.id, message: 'Processing...', type: 'info' });
    try {
      const response = await rewardService.redeem(reward.id);
      setRedeemStatus({ 
        id: reward.id, 
        message: `Success! Code: ${response.data.voucher_code}`, 
        type: 'success' 
      });
      setUser({ ...user, points: user.points - reward.points_required });
    } catch (err) {
      setRedeemStatus({ 
        id: reward.id, 
        message: err.response?.data?.detail || 'Redemption failed', 
        type: 'error' 
      });
    }
  };

  if (loading) return <div className="loading-state">Loading Reward Catalog...</div>;

  return (
    <div className="container rewards-page">
      <header className="page-header">
        <div className="header-text">
          <h1>Eco <span className="text-gradient">Rewards</span></h1>
          <p>Redeem your points for exclusive discounts and sustainable products.</p>
        </div>
        <div className="user-points-display glass">
          <Sparkles size={20} color="#f59e0b" />
          <div className="points-val">
            <span className="label">Your Balance</span>
            <span className="value">{user.points} pts</span>
          </div>
        </div>
      </header>

      <div className="rewards-grid">
        {rewards.map((reward) => (
          <motion.div 
            key={reward.id}
            whileHover={{ y: -8 }}
            className="reward-card-large glass"
          >
            <div className="reward-icon-box">
              <ShoppingBag size={40} />
            </div>
            <div className="reward-card-content">
              <h3>{reward.name}</h3>
              <p className="reward-desc">Get a discount voucher for local sustainable brands.</p>
              
              <div className="reward-meta">
                <div className="cost-tag">
                  <Award size={16} />
                  <span>{reward.points_required} Points</span>
                </div>
              </div>

              {redeemStatus.id === reward.id ? (
                <div className={`status-msg ${redeemStatus.type}`}>
                  {redeemStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{redeemStatus.message}</span>
                </div>
              ) : (
                <button 
                  className={`redeem-btn-large ${user.points < reward.points_required ? 'disabled' : ''}`}
                  onClick={() => handleRedeem(reward)}
                  disabled={user.points < reward.points_required}
                >
                  {user.points < reward.points_required ? 'Insufficient Points' : 'Redeem Now'}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
