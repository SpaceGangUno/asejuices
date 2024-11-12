import React from 'react';
import { Package } from 'lucide-react';

export default function Orders() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-emerald-900">My Orders</h2>
      </div>

      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
          <Package className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
        <p className="text-gray-600">
          Your order history will appear here once you make your first purchase.
        </p>
      </div>
    </div>
  );
}