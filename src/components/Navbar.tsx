import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, User, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

export default function Navbar() {
  const { items, total, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handlePaymentComplete = () => {
    clearCart();
    setIsCheckoutModalOpen(false);
    navigate('/');
    alert('Thank you for your purchase!');
  };

  return (
    <>
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-brand-primary" />
              <span className="text-2xl font-bold text-gradient">Asé Juices</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/benefits" className="text-brand-dark hover:text-brand-primary transition">Benefits</Link>
              <Link to="/products" className="text-brand-dark hover:text-brand-primary transition">Products</Link>
              <Link to="/process" className="text-brand-dark hover:text-brand-primary transition">Our Process</Link>
              <Link to="/portal" className="bg-gradient-brand text-white px-6 py-2 rounded-full hover:opacity-90 transition flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Client Portal</span>
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="flex items-center space-x-2 text-brand-dark hover:text-brand-primary transition"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>

                {isCartOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 animate-fade-in">
                    <h3 className="text-lg font-semibold text-brand-dark mb-4">Shopping Cart</h3>
                    {items.length === 0 ? (
                      <p className="text-gray-500">Your cart is empty</p>
                    ) : (
                      <>
                        <div className="space-y-3 mb-4">
                          {items.map((item) => (
                            <div key={item.name} className="flex justify-between items-center">
                              <div>
                                <p className="text-brand-dark">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                  ${item.price.toFixed(2)} x {item.quantity}
                                </p>
                              </div>
                              <span className="font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center font-semibold text-brand-dark">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                          </div>
                          <button 
                            onClick={handleCheckout}
                            className="w-full mt-4 bg-gradient-brand text-white px-4 py-2 rounded-full hover:opacity-90 transition"
                          >
                            Checkout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 text-brand-dark hover:text-brand-primary transition"
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-brand-dark hover:bg-gray-100 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg rounded-b-xl animate-fade-in">
              <div className="px-4 py-6 space-y-4">
                <Link
                  to="/benefits"
                  className="block text-brand-dark hover:text-brand-primary transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Benefits
                </Link>
                <Link
                  to="/products"
                  className="block text-brand-dark hover:text-brand-primary transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  to="/process"
                  className="block text-brand-dark hover:text-brand-primary transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Process
                </Link>
                <Link
                  to="/portal"
                  className="block text-brand-dark hover:text-brand-primary transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Client Portal
                </Link>
              </div>
            </div>
          )}

          {/* Mobile Cart Popup */}
          {isCartOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg rounded-b-xl animate-fade-in p-4">
              <h3 className="text-lg font-semibold text-brand-dark mb-4">Shopping Cart</h3>
              {items.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.name} className="flex justify-between items-center">
                        <div>
                          <p className="text-brand-dark">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center font-semibold text-brand-dark">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={handleCheckout}
                      className="w-full mt-4 bg-gradient-brand text-white px-4 py-2 rounded-full hover:opacity-90 transition"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        total={total}
        onPaymentComplete={handlePaymentComplete}
      />
    </>
  );
}