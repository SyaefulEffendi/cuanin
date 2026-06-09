import React, { useState, useEffect } from 'react';
import { Search, Globe, Check, ExternalLink, Eye, X } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { formatRupiah } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import './OrderManagement.css';

function OrderManagement() {
  const { token, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'completed'
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/admin/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsDone = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'Selesai',
          live_url: `https://${orders.find(o => o.id === orderId).domainRequest}`
        })
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toString().includes(searchTerm.toLowerCase()) ||
      o.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.domainRequest.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'pending') {
      return matchesSearch && o.status === 'Belum Dikerjakan';
    } else {
      return matchesSearch && o.status === 'Selesai';
    }
  });

  return (
    <DashboardLayout>
      <div className="orders-page" id="joki-orders-page">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Pesanan Joki Website</h1>
          <p className="page-subtitle">Kelola antrean pembuatan website klien Anda</p>
        </div>

        {/* Tabs */}
        <div className="joki-tabs">
          <button
            className={`joki-tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Belum Dikerjakan
          </button>
          <button
            className={`joki-tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Sudah Selesai
          </button>
        </div>

        {/* Orders Card */}
        <div className="orders-card">
          <div className="orders-card-header">
            <div>
              <h2 className="orders-card-title">
                {activeTab === 'pending' ? 'Antrean Pembuatan' : 'Website Live'}
              </h2>
              <p className="orders-card-subtitle">{filteredOrders.length} pesanan</p>
            </div>
            <div className="orders-actions">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Cari klien / domain..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table orders-table">
              <thead>
                <tr>
                  <th>ID Pesanan</th>
                  <th>Tanggal</th>
                  <th>Klien</th>
                  <th>Permintaan Domain</th>
                  <th>Jml Produk</th>
                  <th>Total Tagihan</th>
                  <th>Status Bayar</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>Memuat data...</td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-tertiary)' }}>
                      Tidak ada pesanan ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="table-id">{order.id}</td>
                      <td className="table-date">{order.date}</td>
                      <td className="table-bold">{order.clientName}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                          <Globe size={14} style={{ color: 'var(--text-tertiary)' }} />
                          <span style={{ fontWeight: 500, color: 'var(--primary)' }}>{order.domainRequest}</span>
                        </div>
                      </td>
                      <td>{order.productCount} item</td>
                      <td className="table-bold">{formatRupiah(order.totalPrice)}</td>
                      <td>
                        <span className={`payment-badge ${order.paymentStatus === 'Lunas' ? 'paid' : 'unpaid'}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            className="btn-mark-done" 
                            style={{ background: '#f3f4f6', color: '#4b5563', border: '1px solid #d1d5db' }}
                            title="Lihat Detail" 
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye size={16} /> Detail
                          </button>
                          {activeTab === 'pending' ? (
                            <button className="btn-mark-done" title="Tandai Selesai" onClick={() => markAsDone(order.id)}>
                              <Check size={16} /> Selesai
                            </button>
                          ) : (
                            <a href={order.liveUrl} target="_blank" rel="noreferrer" className="btn-visit-site" title="Kunjungi Website">
                              <ExternalLink size={16} /> Visit
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
    </DashboardLayout>
  );
}

export default OrderManagement;
