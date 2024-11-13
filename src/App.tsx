import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Process from './pages/Process';
import Benefits from './pages/Benefits';
import ClientPortal from './pages/ClientPortal';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useScrollToTop } from './hooks/useScrollToTop';

// Admin components
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import AdminProducts from './components/admin/Products';
import Orders from './components/admin/Orders';
import Clients from './components/admin/Clients';

function ScrollToTop() {
  useScrollToTop();
  return null;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen">
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin">
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="login" element={<AdminLogin />} />
                <Route path="" element={<AdminLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="clients" element={<Clients />} />
                </Route>
              </Route>

              {/* Client Routes */}
              <Route
                path="*"
                element={
                  <>
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/process" element={<Process />} />
                      <Route path="/benefits" element={<Benefits />} />
                      <Route path="/portal/*" element={<ClientPortal />} />
                    </Routes>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
