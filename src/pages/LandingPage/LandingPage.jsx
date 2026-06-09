import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import { features, pricingFeatures, testimonials } from '../../data/mockData';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page" id="landing-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="hero-container">
          <div className="hero-badge">
            <Star size={14} />
            <span>Jasa Web E-Commerce No.1 di Indonesia</span>
          </div>
          <h1 className="hero-title">
            Kami Buatkan Toko Online Anda
            <br />
            <span className="hero-title-gradient">Terima Beres, Siap Jualan</span>
          </h1>
          <p className="hero-subtitle">
            Pilih domain, tentukan warna, masukkan produk. Tim profesional Cuan.in akan menyiapkan website Anda dalam 7x24 jam.
          </p>
          <div className="hero-badge-small">
            <Check size={14} />
            <span>0% Komisi Transaksi Selamanya</span>
          </div>
          <div className="hero-actions">
            <Link to="/onboarding/step-1" className="hero-btn-primary" id="hero-cta-primary">
              Pesan Website Sekarang
            </Link>
          </div>
          <p className="hero-trust-text">
            Mulai dari Rp 250.000 • Domain .cuan.in • Integrasi Midtrans Otomatis
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="fitur">
        <div className="features-container">
          <h2 className="section-title">Semua yang Anda Butuhkan untuk Sukses Online</h2>
          <p className="section-subtitle">
            Fitur lengkap yang membantu Anda membuat toko online, mengelola, dan meningkatkan bisnis Anda
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index} id={`feature-${index}`}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section" id="harga">
        <div className="pricing-container">
          <h2 className="section-title">Harga Sederhana & Transparan</h2>
          <p className="section-subtitle">
            Mulai bisnis Anda dengan paket starter yang terjangkau
          </p>
          <div className="pricing-card" id="pricing-card">
            <div className="pricing-badge">PALING POPULER</div>
            <h3 className="pricing-plan-name">Paket Starter</h3>
            <div className="pricing-amount">
              <span className="pricing-currency">Rp</span>
              <span className="pricing-value">250.000</span>
              <span className="pricing-period">/bulan</span>
            </div>
            <p className="pricing-description">
              Semua yang Anda butuhkan untuk mulai berjualan online
            </p>
            <ul className="pricing-features-list">
              {pricingFeatures.map((feature, index) => (
                <li key={index} className="pricing-feature-item">
                  <div className="pricing-check-icon">
                    <Check size={14} />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link to="/onboarding/step-1" className="pricing-cta" id="pricing-cta">
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimoni">
        <div className="testimonials-container">
          <h2 className="section-title">Dipercaya oleh Pengusaha Indonesia</h2>
          <p className="section-subtitle">
            Lihat apa yang para pebisnis katakan tentang Cuan.in
          </p>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={index} id={`testimonial-${index}`}>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{testimonial.avatar}</div>
                  <div>
                    <p className="testimonial-name">{testimonial.name}</p>
                    <p className="testimonial-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="cta">
        <div className="cta-container">
          <h2 className="cta-title">
            Siap Membangun Website Anda?
          </h2>
          <p className="cta-subtitle">
            Mulai dari Rp 250.000, tingkatkan kredibilitas bisnis Anda dengan website profesional.
          </p>
          <div className="cta-actions">
            <Link to="/onboarding/step-1" className="cta-btn-primary" id="cta-btn-primary">
              Pesan Website Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-icon">C</span>
                <span className="footer-logo-text">Cuan.in</span>
              </div>
              <p className="footer-brand-desc">
                Platform E-commerce Lengkap untuk Usaha Kecil & Non-Teknis di Indonesia.
              </p>
            </div>
            <div className="footer-links-group">
              <h4 className="footer-links-title">Produk</h4>
              <a href="#fitur" className="footer-link">Fitur Lengkap</a>
              <a href="#harga" className="footer-link">Harga & Paket</a>
              <a href="#" className="footer-link">Integrasi</a>
            </div>
            <div className="footer-links-group">
              <h4 className="footer-links-title">Dukungan</h4>
              <a href="#" className="footer-link">Pusat Bantuan</a>
              <a href="#" className="footer-link">Dokumentasi API</a>
              <a href="#" className="footer-link">Status Sistem</a>
            </div>
            <div className="footer-links-group">
              <h4 className="footer-links-title">Perusahaan</h4>
              <a href="#" className="footer-link">Tentang Kami</a>
              <a href="#" className="footer-link">Blog</a>
              <a href="#" className="footer-link">Kebijakan Privasi</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Cuan.in. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
