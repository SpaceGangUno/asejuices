import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, ShoppingBag, Calendar, User, Home, ChevronRight, Menu, X } from 'lucide-react';
import Orders from './Orders';
import Schedule from './Schedule';
import Profile from './Profile';
import PointsDisplay from './PointsDisplay';
import EmailVerification from './EmailVerification';
import { useAuth } from '../../context/AuthContext';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      onLogout();
      navigate('/portal');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-emerald-50">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed bottom-6 right-6 z-50 lg:hidden bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600 transition-colors"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={toggleMobileMenu}>
          <div
            className="absolute bottom-24 right-6 bg-white rounded-2xl shadow-xl p-4 w-64"
            onClick={e => e.stopPropagation()}
          >
            <nav className="space-y-2">
              <Link
                to="/portal/dashboard/orders"
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  location.pathname.includes('/orders')
                    ? 'bg-emerald-500 text-white'
                    : 'hover:bg-emerald-50 text-emerald-900'
                }`}
                onClick={toggleMobileMenu}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>My Orders</span>
              </Link>
              <Link
                to="/portal/dashboard/schedule"
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  location.pathname.includes('/schedule')
                    ? 'bg-emerald-500 text-white'
                    : 'hover:bg-emerald-50 text-emerald-900'
                }`}
                onClick={toggleMobileMenu}
              >
                <Calendar className="h-5 w-5" />
                <span>Schedule Delivery</span>
              </Link>
              <Link
                to="/portal/dashboard/profile"
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  location.pathname.includes('/profile')
                    ? 'bg-emerald-500 text-white'
                    : 'hover:bg-emerald-50 text-emerald-900'
                }`}
                onClick={toggleMobileMenu}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 text-red-600 w-full transition-all duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">
        <div className="grid gap-6 mb-8">
          {/* Welcome Banner - Simplified for mobile */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-2xl p-6 lg:p-8 text-white shadow-lg">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome Back</h1>
            <div className="flex items-center text-emerald-100 text-sm lg:text-base">
              <Home className="h-4 w-4" />
              <ChevronRight className="h-4 w-4 mx-1" />
              <span>{location.pathname.split('/').pop()?.charAt(0).toUpperCase() + location.pathname.split('/').pop()?.slice(1) || 'Dashboard'}</span>
            </div>
          </div>

          {/* Email Verification Banner */}
          <EmailVerification />

          {/* Points Display */}
          <PointsDisplay />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden lg:block bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 h-fit">
            <nav className="space-y-2">
              <Link
                to="/portal/dashboard/orders"
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  location.pathname.includes('/orders')
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'hover:bg-emerald-50 text-emerald-900'
                }`}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>My Orders</span>
              </Link>
              <Link
                to="/portal/dashboard/schedule"
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  location.pathname.includes('/schedule')
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'hover:bg-emerald-50 text-emerald-900'
                }`}
              >
                <Calendar className="h-5 w-5" />
                <span>Schedule Delivery</span>
              </Link>
              <Link
                to="/portal/dashboard/profile"
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  location.pathname.includes('/profile')
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'hover:bg-emerald-50 text-emerald-900'
                }`}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 text-red-600 w-full transition-all duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <Routes>
                <Route path="/" element={<Orders />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}