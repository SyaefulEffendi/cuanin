import React from 'react';
import {
  TrendingUp, DollarSign, ShoppingCart, Package, Users,
  UserPlus, UserCheck, Wallet, Percent, Receipt, CheckCircle,
} from 'lucide-react';
import './StatsCard.css';

const iconMap = {
  dollar: DollarSign,
  'shopping-cart': ShoppingCart,
  package: Package,
  users: Users,
  'user-plus': UserPlus,
  'user-check': UserCheck,
  wallet: Wallet,
  'trending-up': TrendingUp,
  percent: Percent,
  receipt: Receipt,
  'check-circle': CheckCircle,
};

function StatsCard({ label, value, change, changeType, icon }) {
  const IconComponent = iconMap[icon] || DollarSign;

  return (
    <div className="stats-card" id={`stat-${icon}`}>
      <div className="stats-card-header">
        <span className="stats-card-label">{label}</span>
        <div className="stats-card-icon">
          <IconComponent size={20} />
        </div>
      </div>
      <div className="stats-card-value">{value}</div>
      <div className={`stats-card-change ${changeType === 'positive' ? 'positive' : 'neutral'}`}>
        {changeType === 'positive' && <TrendingUp size={14} />}
        <span>{change}</span>
      </div>
    </div>
  );
}

export default StatsCard;
