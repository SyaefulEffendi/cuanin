import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './NotFound.css';

function NotFound() {
  const { user } = useAuth();
  
  // Determine home link based on role
  const homeLink = user ? (user.role === 'admin' ? '/dashboard' : '/profile') : '/';

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon-wrapper">
          <AlertCircle size={80} className="not-found-icon" />
        </div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Halaman Tidak Ditemukan</h2>
        <p className="not-found-text">
          Maaf, halaman yang Anda tuju tidak tersedia, telah dipindahkan, atau Anda tidak memiliki akses ke halaman tersebut.
        </p>
        <Link to={homeLink} className="btn-home">
          <Home size={18} />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
