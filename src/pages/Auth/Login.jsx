import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

function Login() {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    const result = await login(form.email, form.password);
    if (!result.success) {
      setError(result.error || 'Terjadi kesalahan saat login');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <Link to="/" className="auth-logo">
            <span className="auth-logo-icon">C</span>
            <span className="auth-logo-text">Cuan.in</span>
          </Link>
        </div>

        <div className="auth-form-container">
          <h1 className="auth-title">Selamat Datang Kembali 👋</h1>
          <p className="auth-subtitle">Masuk ke sistem layanan Joki Website</p>

          {error && <div className="auth-error" style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fee2e2', borderRadius: '4px' }}>{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label>Email</label>
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-input-icon" />
                <input
                  type="email"
                  placeholder="nama@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  id="input-email"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <div className="auth-label-row">
                <label>Password</label>
                <a href="#forgot" className="auth-forgot">Lupa Password?</a>
              </div>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  id="input-password"
                />
                <button
                  type="button"
                  className="auth-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-auth-primary" id="btn-login" disabled={isSubmitting || loading}>
              {isSubmitting ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <p className="auth-footer-text">
            Belum punya akun?{' '}
            <Link to="/register" className="auth-link">Daftar Gratis</Link>
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-right-content">
          <div className="auth-illustration">
            <div className="auth-float-card card-1">
              <span>💰</span>
              <div>
                <strong>0% Komisi</strong>
                <p>Keuntungan 100% milik Anda</p>
              </div>
            </div>
            <div className="auth-float-card card-2">
              <span>🚀</span>
              <div>
                <strong>Siap dalam Hitungan Jam</strong>
                <p>Template premium instan</p>
              </div>
            </div>
            <div className="auth-float-card card-3">
              <span>🔒</span>
              <div>
                <strong>Data Milik Anda</strong>
                <p>Database pelanggan 100% privat</p>
              </div>
            </div>
          </div>
          <h2 className="auth-right-title">Kedaulatan Ekonomi Digital UMKM</h2>
          <p className="auth-right-desc">
            Platform e-commerce mandiri tanpa komisi. Bangun identitas brand Anda sendiri.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
