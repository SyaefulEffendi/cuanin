import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, QrCode, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatRupiah } from '../../data/mockData';
import './Onboarding.css';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPaid, setIsPaid] = useState(false);

  const { token, user } = useAuth();
  
  // Retrieve product count from previous step, default to 1 if missing
  const productCount = location.state?.productCount || 1;
  const businessInfo = location.state?.businessInfo || {
    customDomain: 'demo', storeName: 'Demo Store', category: 'Lainnya', whatsapp: ''
  };
  const brandingData = location.state?.brandingData || null;
  const productsData = location.state?.productsData || null;
  
  // Calculate pricing: 250k base + 10k per product
  const basePrice = 250000;
  const pricePerProduct = 10000;
  const productTotal = productCount * pricePerProduct;
  const grandTotal = basePrice + productTotal;

  const handlePayment = async () => {
    if (!token) {
      alert("Anda harus login untuk membuat pesanan!");
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          domain_request: businessInfo.customDomain || 'demo',
          business_name: businessInfo.storeName || 'Demo Store',
          category: businessInfo.category || 'Lainnya',
          whatsapp: businessInfo.whatsapp || '',
          product_count: productCount,
          total_price: grandTotal,
          branding_data: brandingData,
          products_data: productsData
        })
      });

      if (res.ok) {
        setIsPaid(true);
      } else {
        alert("Gagal membuat pesanan.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  const handleFinish = () => {
    navigate('/profile'); // Go to profile to see the order
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">
        <div className="onboarding-progress">
          <div className="progress-info">
            <span className="progress-step">Langkah 4 dari 4</span>
            <span className="progress-label">Pembayaran</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '100%' }} />
          </div>
        </div>

        <div className="checkout-content">
          {/* Order Summary */}
          <div className="checkout-summary-card">
            <h2 className="checkout-title">Ringkasan Pesanan</h2>
            <div className="checkout-items">
              <div className="checkout-item">
                <div className="checkout-item-info">
                  <span className="checkout-item-name">Pembuatan Website E-Commerce</span>
                  <span className="checkout-item-desc">Termasuk hosting, custom domain .cuan.in, SSL, & integrasi Midtrans</span>
                </div>
                <span className="checkout-item-price">{formatRupiah(basePrice)}</span>
              </div>
              <div className="checkout-item">
                <div className="checkout-item-info">
                  <span className="checkout-item-name">Input Data Produk ({productCount} item)</span>
                  <span className="checkout-item-desc">Jasa input produk ke katalog website</span>
                </div>
                <span className="checkout-item-price">{formatRupiah(productTotal)}</span>
              </div>
            </div>
            
            <div className="checkout-total">
              <span>Total Tagihan</span>
              <span className="checkout-total-price">{formatRupiah(grandTotal)}</span>
            </div>

            <div className="checkout-guarantee">
              <ShieldCheck size={18} className="text-green-600" />
              <span>Garansi uang kembali 100% jika website tidak selesai dalam 3x24 jam.</span>
            </div>
          </div>

          {/* Payment Section */}
          <div className="checkout-payment-card">
            {isPaid ? (
              <div className="payment-success">
                <CheckCircle2 size={64} className="success-icon" />
                <h3 className="success-title">Pembayaran Berhasil!</h3>
                <p className="success-desc">
                  Terima kasih! Pesanan Anda telah kami terima dan akan segera diproses oleh tim kami. 
                  Anda akan menerima notifikasi WhatsApp saat website Anda sudah siap.
                </p>
                <button className="btn-finish-order" onClick={handleFinish}>
                  Selesai
                </button>
              </div>
            ) : (
              <div className="payment-qr-section">
                <h3 className="payment-title">Scan QRIS untuk Membayar</h3>
                <p className="payment-subtitle">Buka aplikasi m-Banking atau E-Wallet Anda (GoPay, OVO, Dana, ShopeePay) dan scan kode QR di bawah ini.</p>
                
                <div className="qr-code-wrapper" onClick={handlePayment}>
                  <QrCode size={180} />
                  {/* Overlay mock text */}
                  <div className="qr-overlay-text">Klik untuk Mock Bayar</div>
                </div>

                <div className="payment-instructions">
                  <p><strong>Total Bayar:</strong> {formatRupiah(grandTotal)}</p>
                  <p className="text-sm text-gray-500 mt-2">Menunggu pembayaran...</p>
                </div>
              </div>
            )}
          </div>

          <div className="onboarding-nav">
            {!isPaid && (
              <button className="btn-back" onClick={() => navigate('/onboarding/products')}>
                <ArrowLeft size={18} />
                <span>Kembali</span>
              </button>
            )}
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
