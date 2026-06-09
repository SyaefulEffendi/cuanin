import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '../Sidebar/Sidebar';
import './DashboardLayout.css';

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout" id="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile top bar */}
      <div className="mobile-topbar">
        <button
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Buka menu"
          id="mobile-menu-btn"
        >
          <Menu size={22} />
        </button>
        <div className="mobile-topbar-logo">
          <span className="mobile-topbar-logo-icon">C</span>
          <span className="mobile-topbar-logo-text">Cuan.in</span>
        </div>
        <div className="mobile-topbar-spacer" />
      </div>

      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
