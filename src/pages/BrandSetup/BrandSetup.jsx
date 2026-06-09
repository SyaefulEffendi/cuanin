import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Palette, Monitor, Smartphone } from 'lucide-react';
import { brandPresets } from '../../data/mockData';
import './BrandSetup.css';

function BrandSetup() {
  const location = useLocation();
  const navigate = useNavigate();
  const businessInfo = location.state?.businessInfo || {};

  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [secondaryColor, setSecondaryColor] = useState('#F3F4F6');
  const [accentColor, setAccentColor] = useState('#10B981');
  const [previewMode, setPreviewMode] = useState('mobile');

  const applyPreset = (preset) => {
    setPrimaryColor(preset.colors[0]);
    setSecondaryColor(preset.colors.length > 2 ? preset.colors[1] : '#F3F4F6');
    setAccentColor(preset.colors[preset.colors.length - 1]);
  };

  return (
    <div className="brand-setup-page" id="brand-setup-page">
      {/* Top Bar */}
      <header className="setup-topbar">
        <div className="setup-topbar-left">
          <div className="setup-logo">
            <span className="setup-logo-icon">C</span>
            <span className="setup-logo-text">Cuan.in</span>
          </div>
        </div>
        <div className="setup-topbar-right">
          <span className="setup-step-text">Langkah 2 dari 4</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="setup-progress-wrapper">
        <div className="setup-progress-labels">
          <span className="setup-progress-label">Progres Setup</span>
          <span className="setup-progress-percent">50% Selesai</span>
        </div>
        <div className="setup-progress-bar">
          <div className="setup-progress-fill" style={{ width: '50%' }}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="setup-content">
        <div className="setup-header">
          <h1 className="setup-title">Langkah 2: Setup Identitas Brand</h1>
          <p className="setup-subtitle">
            Sesuaikan palet warna toko Anda sesuai dengan brand Anda
          </p>
        </div>

        <div className="setup-grid">
          {/* Left Panel - Color Customization */}
          <div className="setup-panel" id="color-customization">
            <div className="panel-header">
              <Palette size={20} />
              <h2 className="panel-title">Kustomisasi Warna</h2>
            </div>
            <p className="panel-subtitle">
              Tentukan warna brand Anda untuk menciptakan identitas toko yang unik
            </p>

            {/* Primary Color */}
            <div className="color-section">
              <h3 className="color-section-title">Warna Utama</h3>
              <p className="color-section-desc">
                Digunakan untuk tombol, header, dan elemen utama
              </p>
              <div className="color-picker-row">
                <div
                  className="color-preview"
                  style={{ backgroundColor: primaryColor }}
                ></div>
                <input
                  type="text"
                  className="color-input"
                  id="input-primary-color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                />
                <input
                  type="color"
                  className="color-native-picker"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                />
              </div>
            </div>

            {/* Secondary Color */}
            <div className="color-section">
              <h3 className="color-section-title">Warna Sekunder</h3>
              <p className="color-section-desc">
                Digunakan untuk background dan elemen halus
              </p>
              <div className="color-picker-row">
                <div
                  className="color-preview"
                  style={{ backgroundColor: secondaryColor }}
                ></div>
                <input
                  type="text"
                  className="color-input"
                  id="input-secondary-color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                />
                <input
                  type="color"
                  className="color-native-picker"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                />
              </div>
            </div>

            {/* Accent Color */}
            <div className="color-section">
              <h3 className="color-section-title">Warna Aksen</h3>
              <p className="color-section-desc">
                Digunakan untuk badge, link, dan highlight
              </p>
              <div className="color-picker-row">
                <div
                  className="color-preview"
                  style={{ backgroundColor: accentColor }}
                ></div>
                <input
                  type="text"
                  className="color-input"
                  id="input-accent-color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                />
                <input
                  type="color"
                  className="color-native-picker"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                />
              </div>
            </div>

            {/* Presets */}
            <div className="presets-section">
              <h3 className="color-section-title">Preset Desain</h3>
              <p className="color-section-desc">
                Pilih dari template profesional atau sesuaikan sendiri
              </p>
              <div className="presets-grid">
                {brandPresets.map((preset, index) => (
                  <button
                    key={index}
                    className="preset-card"
                    id={`preset-${index}`}
                    onClick={() => applyPreset(preset)}
                  >
                    <div className="preset-colors">
                      {preset.colors.map((color, i) => (
                        <div
                          key={i}
                          className="preset-color-dot"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                    <p className="preset-name">{preset.name}</p>
                    <p className="preset-desc">{preset.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="setup-panel" id="live-preview">
            <div className="panel-header">
              <Monitor size={20} />
              <h2 className="panel-title">Pratinjau Langsung</h2>
            </div>
            <p className="panel-subtitle">
              Lihat desain toko Anda diperbarui secara real-time
            </p>

            {/* Preview Mode Toggle */}
            <div className="preview-toggle">
              <button
                className={`preview-toggle-btn ${previewMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setPreviewMode('mobile')}
              >
                <Smartphone size={16} />
                <span>Pratinjau Mobile</span>
              </button>
              <button
                className={`preview-toggle-btn ${previewMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setPreviewMode('desktop')}
              >
                <Monitor size={16} />
                <span>Pratinjau Desktop</span>
              </button>
            </div>

            {/* Mobile Preview */}
            {previewMode === 'mobile' && (
              <div className="preview-mobile" id="preview-mobile">
                <div
                  className="preview-mobile-header"
                  style={{ backgroundColor: primaryColor }}
                >
                  <div className="preview-mobile-status-bar">
                    <span className="preview-mobile-time">9:41</span>
                    <span className="preview-mobile-dot" style={{ backgroundColor: accentColor }}></span>
                  </div>
                  <h3 className="preview-mobile-title">Toko Saya</h3>
                </div>
                <div className="preview-mobile-search" style={{ backgroundColor: secondaryColor }}>
                  <span>Cari produk...</span>
                </div>
                <div className="preview-mobile-products">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="preview-product-card" style={{ backgroundColor: secondaryColor }}>
                      <div className="preview-product-img"></div>
                      <p className="preview-product-name">Produk {i}</p>
                      <p className="preview-product-price">Rp 150.000</p>
                      <button
                        className="preview-product-btn"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Tambah ke Keranjang
                      </button>
                    </div>
                  ))}
                </div>
                <div
                  className="preview-mobile-cart"
                  style={{ backgroundColor: accentColor }}
                >
                  Lihat Keranjang (3 item)
                </div>
              </div>
            )}

            {/* Desktop Preview */}
            {previewMode === 'desktop' && (
              <div className="preview-desktop" id="preview-desktop">
                <div
                  className="preview-desktop-nav"
                  style={{ backgroundColor: primaryColor }}
                >
                  <div className="preview-desktop-logo">
                    <div className="preview-desktop-logo-box" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>My Store</div>
                  </div>
                  <div className="preview-desktop-links">
                    <span>Home</span>
                    <span>Products</span>
                    <span>Contact</span>
                  </div>
                  <div
                    className="preview-desktop-cart-btn"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                </div>
                <div className="preview-desktop-hero" style={{ backgroundColor: secondaryColor }}>
                  <h3>Selamat Datang di Toko Kami</h3>
                  <p>Temukan produk luar biasa</p>
                  <button
                    className="preview-desktop-cta"
                    style={{ backgroundColor: accentColor }}
                  >
                    Belanja Sekarang
                  </button>
                </div>
              </div>
            )}

            {/* Color Palette Summary */}
            <div className="palette-summary">
              <h3 className="color-section-title">Palet Warna Anda</h3>
              <div className="palette-row">
                <div className="palette-item">
                  <div
                    className="palette-swatch"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  <span className="palette-label">Utama</span>
                  <span className="palette-hex">{primaryColor}</span>
                </div>
                <div className="palette-item">
                  <div
                    className="palette-swatch"
                    style={{ backgroundColor: secondaryColor }}
                  ></div>
                  <span className="palette-label">Sekunder</span>
                  <span className="palette-hex">{secondaryColor}</span>
                </div>
                <div className="palette-item">
                  <div
                    className="palette-swatch"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  <span className="palette-label">Aksen</span>
                  <span className="palette-hex">{accentColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="setup-navigation">
          <Link to="/onboarding/step-1" className="setup-nav-btn setup-nav-back" id="btn-back">
            <ArrowLeft size={18} />
            <span>Kembali ke Info Bisnis</span>
          </Link>
          <button 
            onClick={() => navigate('/onboarding/products', { 
              state: { 
                businessInfo,
                brandingData: { 
                  primaryColor, 
                  secondaryColor, 
                  accentColor, 
                  previewMode,
                  logo: businessInfo.logo || null
                } 
              } 
            })} 
            className="setup-nav-btn setup-nav-next" 
            id="btn-next"
          >
            <span>Lanjut ke Produk</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BrandSetup;
