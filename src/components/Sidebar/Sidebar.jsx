import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  BarChart2,
  Settings,
  ExternalLink,
  X,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const iconMap = {
  'layout-dashboard': LayoutDashboard,
  'package': Package,
  'clipboard-list': ClipboardList,
  'users': Users,
  'bar-chart-2': BarChart2,
  'settings': Settings,
};

const menuItems = [
  { label: 'Ringkasan Dashboard', path: '/dashboard', icon: 'layout-dashboard' },
  { label: 'Pesanan Joki Website', path: '/orders', icon: 'clipboard-list' },
];

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`} id="sidebar">
        {/* Mobile close button */}
        <button className="sidebar-close-btn" onClick={onClose} aria-label="Tutup menu">
          <X size={22} />
        </button>

        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="sidebar-logo-icon">C</span>
            <span className="sidebar-logo-text">Cuan.in</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const IconComponent = iconMap[item.icon];
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                id={`nav-${item.path.replace('/', '')}`}
                onClick={onClose}
              >
                {IconComponent && <IconComponent size={20} />}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button onClick={logout} className="sidebar-store-btn" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', marginBottom: '10px' }}>
            <span>Keluar</span>
            <LogOut size={16} />
          </button>
          <a href="/" className="sidebar-store-btn" id="view-store-btn">
            <span>Kembali Ke Dashboard</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
