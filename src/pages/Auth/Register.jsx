import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

function Register() {
  const navigate = useNavigate();
  const { register, login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '', agreeTerms: false,
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Password tidak cocok');
      return;
    }
    if (!form.agreeTerms) {
      setError('Anda harus menyetujui syarat & ketentuan');
      return;
    }

    setError('');
    setIsSubmitting(true);
    
    const userData = {
      username: form.name.toLowerCase().replace(/\s+/g, ''),
      email: form.email,
      password: form.password,
      full_name: form.name
    };

    const result = await register(userData);
    if (result.success) {
      // Auto login after register
      await login(form.email, form.password);
    } else {
      setError(result.error || 'Terjadi kesalahan saat registrasi');
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
          <h1 className="auth-title">Buat Akun Gratis 🎉</h1>
          <p className="auth-subtitle">Mulai pesan website e-commerce Anda hari ini</p>

          {error && <div className="auth-error" style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fee2e2', borderRadius: '4px' }}>{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label>Nama Lengkap</label>
              <div className="auth-input-wrapper">
                <User size={18} className="auth-input-icon" />
                <input
                  type="text"
                  placeholder="Nama lengkap Anda"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  id="input-name"
                />
              </div>
            </div>

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
              <label>Password</label>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 8 karakter"
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

            <div className="auth-input-group">
              <label>Konfirmasi Password</label>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input
                  type="password"
                  placeholder="Ulangi password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  id="input-confirm-password"
                />
              </div>
            </div>

            <div className="auth-checkbox">
              <input
                type="checkbox"
                id="agree-terms"
                checked={form.agreeTerms}
                onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
              />
              <label htmlFor="agree-terms">
                Saya menyetujui <a href="#terms">Syarat & Ketentuan</a> dan <a href="#privacy">Kebijakan Privasi</a>
              </label>
            </div>

            <button type="submit" className="btn-auth-primary" id="btn-register" disabled={isSubmitting || loading}>
              {isSubmitting ? 'Memproses...' : 'Daftar Gratis'}
            </button>
          </form>

          <p className="auth-footer-text">
            Sudah punya akun?{' '}
            <Link to="/login" className="auth-link">Masuk</Link>
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-right-content">
          <div className="auth-illustration">
            <div className="auth-float-card card-1">
              <span>🏪</span>
              <div>
                <strong>Website Mandiri</strong>
                <p>Domain sendiri .cuan.in</p>
              </div>
            </div>
            <div className="auth-float-card card-2">
              <span>💳</span>
              <div>
                <strong>Pembayaran Otomatis</strong>
                <p>QRIS, E-Wallet, Transfer</p>
              </div>
            </div>
            <div className="auth-float-card card-3">
              <span>📦</span>
              <div>
                <strong>Integrasi Kurir</strong>
                <p>JNE, J&T, SiCepat</p>
              </div>
            </div>
          </div>
          <h2 className="auth-right-title">Mulai Jualan Online Tanpa Ribet</h2>
          <p className="auth-right-desc">
            Hanya Rp250.000/tahun — termasuk domain, hosting, dan semua fitur premium.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
