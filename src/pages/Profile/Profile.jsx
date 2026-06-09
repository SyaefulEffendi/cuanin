import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { LogOut, User, Globe, CheckCircle2, Clock, ArrowLeft, Eye, X } from 'lucide-react';
import './Profile.css';

function Profile() {
  const { user, token, logout, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === 'client') {
      fetch('http://localhost:5000/api/orders/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.orders) setOrders(data.orders);
        setFetchingOrders(false);
      })
      .catch(err => {
        console.error(err);
        setFetchingOrders(false);
      });
    }
  }, [user, token]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (user.role === 'admin') return <Navigate to="/dashboard" />;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(number).replace('IDR', 'Rp').trim();
  };

  return (
    <div className="profile-page">
      <div className="profile-top-nav">
        <button className="btn-back-landing" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          <span>Kembali ke Beranda</span>
        </button>
      </div>
      <div className="profile-container">
        {/* Sidebar Profile Info */}
        <div className="profile-sidebar">
          <div className="profile-avatar">
            <User size={48} color="white" />
          </div>
          <h2 className="profile-name">{user.full_name || user.username}</h2>
          <p className="profile-email">{user.email}</p>
          
          <div className="profile-details">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Bergabung:</strong> {user.created_at ? new Date(user.created_at).toLocaleDateString('id-ID') : '-'}</p>
          </div>

          <button className="btn-logout" onClick={logout}>
            <LogOut size={18} /> Keluar
          </button>
        </div>

        {/* Main Content - Order History */}
        <div className="profile-main">
          <div className="profile-header">
            <h1 className="profile-title">Riwayat Pesanan Website</h1>
            <p className="profile-subtitle">Lacak status pembuatan website Anda di sini.</p>
          </div>

          <div className="orders-list">
            {fetchingOrders ? (
              <div className="loading-state">Memuat riwayat pesanan...</div>
            ) : orders.length === 0 ? (
              <div className="empty-state">
                <Globe size={48} className="empty-icon" />
                <h3>Belum Ada Pesanan</h3>
                <p>Anda belum memiliki pesanan pembuatan website.</p>
                <button className="btn-primary mt-4" onClick={() => navigate('/onboarding/step-1')}>
                  Pesan Website Sekarang
                </button>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="order-history-card">
                  <div className="order-history-header">
                    <span className="order-date">{order.date}</span>
                  </div>
                  
                  <div className="order-history-body">
                    <div className="order-domain">
                      <Globe size={18} /> 
                      {order.status === 'Selesai' && order.liveUrl ? (
                        <a href={order.liveUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                          <strong>{order.domainRequest}</strong>
                        </a>
                      ) : (
                        <strong>{order.domainRequest}</strong>
                      )}
                    </div>
                    <div className="order-info-grid">
                      <div>
                        <span className="info-label">Kategori:</span>
                        <span className="info-value">{order.category || '-'}</span>
                      </div>
                      <div>
                        <span className="info-label">Jumlah Produk:</span>
                        <span className="info-value">{order.productCount} Item</span>
                      </div>
                      <div>
                        <span className="info-label">Total Harga:</span>
                        <span className="info-value font-bold">{formatRupiah(order.totalPrice)}</span>
                      </div>
                      <div>
                        <span className="info-label">Pembayaran:</span>
                        <span className={`badge-payment ${order.paymentStatus === 'Lunas' ? 'success' : 'pending'}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="order-history-footer">
                    <div className="order-status">
                      <span className="status-label">Status Pengerjaan:</span>
                      <span className={`status-badge ${order.status === 'Selesai' ? 'completed' : 'working'}`}>
                        {order.status === 'Selesai' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                        {order.status}
                      </span>
                    </div>
                    
                    {order.status === 'Selesai' && order.liveUrl ? (
                      <a href={order.liveUrl} target="_blank" rel="noreferrer" className="btn-visit-site">
                        Kunjungi Website
                      </a>
                    ) : (
                      <button 
                        className="btn-visit-site" 
                        style={{ background: '#f3f4f6', color: '#4b5563', border: '1px solid #d1d5db', display: 'flex', alignItems: 'center', gap: '6px' }}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye size={16} /> Detail
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Detail Modal */}
        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Detail Pesanan #{selectedOrder.id}</h2>
                <button className="btn-close-modal" onClick={() => setSelectedOrder(null)}><X size={20} /></button>
              </div>
              <div className="modal-body">
                <h3>Informasi Warna (Branding)</h3>
                {selectedOrder.brandingData ? (
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <div style={{ padding: '10px', background: selectedOrder.brandingData.primaryColor, color: '#fff', borderRadius: '4px' }}>
                      Primary ({selectedOrder.brandingData.primaryColor})
                    </div>
                    <div style={{ padding: '10px', background: selectedOrder.brandingData.secondaryColor, color: '#000', border: '1px solid #ccc', borderRadius: '4px' }}>
                      Secondary ({selectedOrder.brandingData.secondaryColor})
                    </div>
                    <div style={{ padding: '10px', background: selectedOrder.brandingData.accentColor, color: '#fff', borderRadius: '4px' }}>
                      Accent ({selectedOrder.brandingData.accentColor})
                    </div>
                    {selectedOrder.brandingData.logo && (
                      <div style={{ padding: '10px', background: '#f3f4f6', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{fontWeight: 'bold', fontSize: '0.9rem'}}>Logo:</span>
                        <a href={selectedOrder.brandingData.logo} target="_blank" rel="noopener noreferrer">
                          <img src={selectedOrder.brandingData.logo} alt="Logo Toko" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }} />
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '20px' }}>Tidak ada data warna.</p>
                )}

                <h3>Daftar Produk ({selectedOrder.productsData ? selectedOrder.productsData.length : 0})</h3>
                {selectedOrder.productsData && selectedOrder.productsData.length > 0 ? (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedOrder.productsData.map((p, idx) => (
                      <li key={idx} style={{ padding: '12px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ fontWeight: 'bold' }}>{p.emoji} {p.name}</div>
                          {p.image && (
                            <a href={p.image} target="_blank" rel="noopener noreferrer">
                              <img src={p.image} alt={p.name} style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }} />
                            </a>
                          )}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '4px' }}>
                          Harga: {formatRupiah(p.price)} | Stok: {p.stock}
                        </div>
                        {p.description && <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '4px' }}>{p.description}</div>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Tidak ada data produk yang diinput spesifik.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
