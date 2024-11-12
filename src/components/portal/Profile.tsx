import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Bell, Shield, CreditCard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUserData } from '../../hooks/useFirestore';
import * as firestoreService from '../../services/firestore';

export default function Profile() {
  const { user } = useAuth();
  const { userData, loading } = useUserData();
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    address: userData?.address || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    try {
      await firestoreService.updateUser(user.uid, profile);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-emerald-900">My Profile</h2>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors">
            <Shield className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-400 text-white py-3 px-4 rounded-xl hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
            >
              {isSaving ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">Points & Rewards</h3>
            <div className="bg-white rounded-lg p-4 border border-emerald-100">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Current Points</span>
                <span className="text-emerald-600 text-lg font-bold">{userData?.points || 0}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${Math.min(((userData?.points || 0) / 1000) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Next reward at 1,000 points</p>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">Payment Method</h3>
            <div className="bg-white rounded-lg p-4 border border-emerald-100">
              <div className="flex items-center space-x-3 mb-4">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">•••• 4242</span>
              </div>
              <button className="w-full bg-emerald-100 text-emerald-700 py-2 rounded-lg hover:bg-emerald-200 transition-colors text-sm">
                Update Payment Method
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}