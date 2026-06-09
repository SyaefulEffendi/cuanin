import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Upload, ArrowRight } from 'lucide-react';
import { businessCategories } from '../../data/mockData';
import './Onboarding.css';

function BusinessInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName: '',
    customDomain: '',
    category: '',
    description: '',
    whatsapp: '',
    logo: null, // Base64 string
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file maksimal 2MB!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">
        {/* Progress Bar */}
        <div className="onboarding-progress">
          <div className="progress-info">
            <span className="progress-step">Langkah 1 dari 4</span>
            <span className="progress-label">Info Bisnis</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '25%' }} />
          </div>
        </div>

        <div className="onboarding-content">
          <div className="onboarding-form-section">
            <div className="onboarding-header">
              <div className="onboarding-icon-badge">
                <Store size={24} />
              </div>
              <h1 className="onboarding-title">Form Pemesanan Website</h1>
              <p className="onboarding-subtitle">
                Isi detail bisnis Anda untuk kami buatkan website e-commerce profesional.
              </p>
            </div>

            <div className="onboarding-form">
              <div className="form-group">
                <label>Nama Toko / Brand <span className="required">*</span></label>
                <input
                  type="text"
                  className="form-input"
                  name="storeName"
                  placeholder="Contoh: Batik Nusantara"
                  value={formData.storeName}
                  onChange={handleChange}
                  id="input-store-name"
                />
              </div>
              
              <div className="form-group">
                <label>Pilih Nama Domain <span className="required">*</span></label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="form-input"
                    name="customDomain"
                    placeholder="nama-toko"
                    value={formData.customDomain}
                    onChange={handleChange}
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    id="input-custom-domain"
                  />
                  <span style={{ 
                    padding: '10px 14px', 
                    background: 'var(--bg-gray-100)', 
                    border: '1px solid var(--border)', 
                    borderLeft: 'none',
                    borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem'
                  }}>.cuan.in</span>
                </div>
              </div>

              <div className="form-group">
                <label>Kategori Usaha <span className="required">*</span></label>
                <select
                  className="form-input form-select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  id="input-category"
                >
                  <option value="">Pilih kategori...</option>
                  {businessCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Deskripsi Singkat Toko</label>
                <textarea
                  className="form-input form-textarea"
                  name="description"
                  rows={3}
                  placeholder="Ceritakan sedikit tentang toko dan produk Anda..."
                  value={formData.description}
                  onChange={handleChange}
                  id="input-description"
                />
              </div>

              <div className="form-group">
                <label>Nomor WhatsApp (Untuk Konfirmasi) <span className="required">*</span></label>
                <input
                  type="tel"
                  className="form-input"
                  name="whatsapp"
                  placeholder="08xxxxxxxxxx"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  id="input-whatsapp"
                />
              </div>

              <div className="form-group">
                <label>Logo Toko (opsional)</label>
                <div className="upload-area" style={{ position: 'relative', overflow: 'hidden' }}>
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/svg+xml" 
                    onChange={handleFileChange}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                  />
                  {formData.logo ? (
                    <img src={formData.logo} alt="Logo" style={{ maxHeight: '80px', objectFit: 'contain' }} />
                  ) : (
                    <>
                      <Upload size={24} />
                      <span>Klik untuk upload atau drag & drop</span>
                      <span className="upload-hint">PNG, JPG, SVG (maks. 2MB)</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Side Preview */}
          <div className="onboarding-preview">
            <div className="preview-card">
              <div className="preview-header">
                <div className="preview-logo">{formData.storeName ? formData.storeName.charAt(0).toUpperCase() : '?'}</div>
                <div>
                  <h3 className="preview-store-name">{formData.storeName || 'Nama Toko Anda'}</h3>
                  <span className="preview-category">{formData.category || 'Kategori'}</span>
                </div>
              </div>
              <p className="preview-desc">{formData.description || 'Deskripsi toko Anda akan tampil di sini...'}</p>
              <div className="preview-details">
                <span>📱 {formData.whatsapp || '08xxxxxxxxxx'}</span>
              </div>
              <div className="preview-domain">
                🌐 {formData.customDomain ? `${formData.customDomain}.cuan.in` : (formData.storeName ? formData.storeName.toLowerCase().replace(/\s+/g, '-') + '.cuan.in' : 'nama-toko.cuan.in')}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="onboarding-nav">
          <div />
          <button
            className="btn-next"
            onClick={() => navigate('/brand-setup', { state: { businessInfo: formData } })}
            id="btn-next-step"
          >
            <span>Lanjut: Identitas Brand</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusinessInfo;
