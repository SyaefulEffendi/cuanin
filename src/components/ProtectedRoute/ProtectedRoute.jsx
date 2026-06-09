import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children, requireAdmin }) {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user && user.role !== 'admin') {
    return <Navigate to="/404" replace />;
  }

  return children;
}

export default ProtectedRoute;
