import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Package, ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { formatRupiah } from '../../data/mockData';
import './Onboarding.css';

function ProductSetup() {
  const navigate = useNavigate();
  const location = useLocation();
  const businessInfo = location.state?.businessInfo || {};
  const brandingData = location.state?.brandingData || {};
  
  const [products, setProducts] = useState([
    { id: 1, name: '', price: '', stock: '', description: '', emoji: '📦' },
  ]);

  const emojis = ['📦', '👔', '👟', '👜', '🕶️', '⌚', '👛', '👕', '🎒', '🧢', '💍', '🍰'];

  const addProduct = () => {
    setProducts([
      ...products,
      { id: Date.now(), name: '', price: '', stock: '', description: '', emoji: emojis[Math.floor(Math.random() * emojis.length)], image: null },
    ]);
  };

  const removeProduct = (id) => {
    if (products.length > 1) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const updateProduct = (id, field, value) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleProductImage = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file maksimal 2MB!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProduct(id, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">
        <div className="onboarding-progress">
          <div className="progress-info">
            <span className="progress-step">Langkah 3 dari 4</span>
            <span className="progress-label">Tambah Produk</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '75%' }} />
          </div>
        </div>

        <div className="onboarding-content">
          <div className="onboarding-form-section">
            <div className="onboarding-header">
              <div className="onboarding-icon-badge">
                <Package size={24} />
              </div>
              <h1 className="onboarding-title">Tambah Produk Pertama Anda</h1>
              <p className="onboarding-subtitle">
                Mulai dengan menambahkan setidaknya satu produk ke toko Anda.
              </p>
            </div>

            <div className="onboarding-form">
              {products.map((product, index) => (
                <div key={product.id} className="product-form-card">
                  <div className="product-form-header">
                    <span className="product-form-number">Produk #{index + 1}</span>
                    {products.length > 1 && (
                      <button className="btn-remove-product" onClick={() => removeProduct(product.id)}>
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Nama Produk</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Contoh: Kemeja Batik Premium"
                      value={product.name}
                      onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Harga (Rp)</label>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="275000"
                        value={product.price}
                        onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Stok</label>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="50"
                        value={product.stock}
                        onChange={(e) => updateProduct(product.id, 'stock', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Deskripsi Singkat</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Deskripsi singkat produk..."
                      value={product.description}
                      onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Gambar Produk (opsional)</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/svg+xml"
                        onChange={(e) => handleProductImage(product.id, e)}
                        style={{ fontSize: '0.85rem' }}
                      />
                      {product.image && (
                        <img src={product.image} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button className="btn-add-more" onClick={addProduct} id="btn-add-product">
                <Plus size={18} />
                <span>Tambah Produk Lagi</span>
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="onboarding-preview">
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
              Preview Produk ({products.length})
            </h3>
            <div className="product-cards">
              {products.filter(p => p.name).map((product) => (
                <div key={product.id} className="product-preview-card">
                  <div className="product-preview-emoji">{product.emoji}</div>
                  <div className="product-preview-info">
                    <div className="product-preview-name">{product.name}</div>
                    <div className="product-preview-price">
                      {product.price ? formatRupiah(Number(product.price)) : 'Rp0'}
                    </div>
                    <div className="product-preview-stock">
                      Stok: {product.stock || '0'} unit
                    </div>
                  </div>
                </div>
              ))}
              {products.filter(p => p.name).length === 0 && (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', textAlign: 'center', padding: '20px' }}>
                  Isi nama produk untuk melihat preview
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="onboarding-nav">
          <button className="btn-back" onClick={() => navigate('/brand-setup')}>
            <ArrowLeft size={18} />
            <span>Kembali</span>
          </button>
          <button 
            className="btn-next" 
            onClick={() => navigate('/onboarding/checkout', { 
              state: { 
                productCount: products.length, 
                businessInfo,
                brandingData,
                productsData: products.filter(p => p.name) // Only pass non-empty products
              } 
            })} 
            id="btn-next-step"
          >
            <span>Lanjut: Pembayaran</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductSetup;
