import React from 'react';
import { Leaf, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-brand text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6" />
              <span className="text-xl font-bold">Asé Juices</span>
            </div>
            <p className="text-white/90">
              Nourishing bodies and minds with nature's finest cold-pressed juices and detox teas.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#products" className="text-white/90 hover:text-white transition">Products</a></li>
              <li><a href="#benefits" className="text-white/90 hover:text-white transition">Benefits</a></li>
              <li><a href="#process" className="text-white/90 hover:text-white transition">Our Process</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-white/90">
              <li>7850 Melrose Ave</li>
              <li>Los Angeles, CA 90046</li>
              <li>asejuices7@gmail.com</li>
              <li>310-365-1617</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/ase_juices/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/90">
          <p>&copy; {new Date().getFullYear()} Asé Juices. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}