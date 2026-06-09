import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">C</span>
          <span className="navbar-logo-text">Cuan.in</span>
        </Link>

        <div className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#fitur" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>Fitur</a>
          <a href="#harga" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>Harga</a>
          <a href="#testimoni" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>Testimoni</a>
          {/* Mobile-only action buttons */}
          <div className="navbar-mobile-actions">
            {user ? (
              <Link to={user.role === 'admin' ? '/dashboard' : '/profile'} className="navbar-btn-outline" onClick={() => setMobileMenuOpen(false)}>
                <User size={16} style={{ display: 'inline', marginRight: '4px' }} /> {user.username}
              </Link>
            ) : (
              <>
                <Link to="/login" className="navbar-btn-outline" onClick={() => setMobileMenuOpen(false)}>Masuk</Link>
                <Link to="/onboarding/step-1" className="navbar-btn-primary" onClick={() => setMobileMenuOpen(false)}>Coba Gratis</Link>
              </>
            )}
          </div>
        </div>

        <div className="navbar-actions">
            {user ? (
              <Link to={user.role === 'admin' ? '/dashboard' : '/profile'} className="navbar-btn-outline" id="btn-masuk" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={16} /> Halo, {user.username}
              </Link>
            ) : (
              <>
                <Link to="/login" className="navbar-btn-outline" id="btn-masuk">Masuk</Link>
                <Link to="/onboarding/step-1" className="navbar-btn-primary" id="btn-coba-gratis">Coba Gratis</Link>
              </>
            )}
        </div>

        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
