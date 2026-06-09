import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import OrderManagement from './pages/OrderManagement/OrderManagement';
import BrandSetup from './pages/BrandSetup/BrandSetup';
import BusinessInfo from './pages/Onboarding/BusinessInfo';
import ProductSetup from './pages/Onboarding/ProductSetup';
import Checkout from './pages/Onboarding/Checkout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Dashboard */}
            <Route path="/dashboard" element={
              <ProtectedRoute requireAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute requireAdmin={true}>
                <OrderManagement />
              </ProtectedRoute>
            } />

            {/* Pemesanan Jasa Joki (Client Wizard) */}
            <Route path="/onboarding/step-1" element={<BusinessInfo />} />
            <Route path="/brand-setup" element={<BrandSetup />} />
            <Route path="/onboarding/products" element={<ProductSetup />} />
            <Route path="/onboarding/checkout" element={<Checkout />} />
            
            {/* Client Profile */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
