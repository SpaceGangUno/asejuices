import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/portal/Dashboard';
import Login from '../components/portal/Login';
import { useAuth } from '../context/AuthContext';

export default function ClientPortal() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/portal/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/dashboard/*"
        element={
          user ? (
            <Dashboard onLogout={() => {}} />
          ) : (
            <Navigate to="/portal" replace />
          )
        }
      />
    </Routes>
  );
}