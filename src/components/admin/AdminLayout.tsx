import React, { useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { LayoutGrid, Package, Users, ShoppingCart, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth');
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-emerald-800">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-emerald-900">
            <h1 className="text-white text-xl font-bold">Admin Dashboard</h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            <Link
              to="/admin/dashboard"
              className="flex items-center px-4 py-2 text-white hover:bg-emerald-700 rounded-md"
            >
              <LayoutGrid className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/admin/products"
              className="flex items-center px-4 py-2 text-white hover:bg-emerald-700 rounded-md"
            >
              <Package className="mr-3 h-5 w-5" />
              Products
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center px-4 py-2 text-white hover:bg-emerald-700 rounded-md"
            >
              <ShoppingCart className="mr-3 h-5 w-5" />
              Orders
            </Link>
            <Link
              to="/admin/clients"
              className="flex items-center px-4 py-2 text-white hover:bg-emerald-700 rounded-md"
            >
              <Users className="mr-3 h-5 w-5" />
              Clients
            </Link>
          </nav>
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-white hover:bg-emerald-700 rounded-md"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 p-8">
        <Outlet />
      </div>
    </div>
  );
}
