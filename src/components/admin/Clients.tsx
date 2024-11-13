import React, { useState } from 'react';
import { Search, Eye, ShoppingBag } from 'lucide-react';

// Mock clients data
const initialClients = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    joinDate: '2024-01-01',
    totalOrders: 5,
    totalSpent: 494.95,
    lastOrder: '2024-01-15',
    status: 'Active',
    orders: [
      {
        id: '1',
        date: '2024-01-15',
        total: 94.97,
        status: 'Completed'
      },
      {
        id: '2',
        date: '2024-01-10',
        total: 129.99,
        status: 'Completed'
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '(555) 987-6543',
    joinDate: '2024-01-05',
    totalOrders: 3,
    totalSpent: 298.91,
    lastOrder: '2024-01-14',
    status: 'Active',
    orders: [
      {
        id: '3',
        date: '2024-01-14',
        total: 98.97,
        status: 'Processing'
      }
    ]
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '(555) 456-7890',
    joinDate: '2024-01-08',
    totalOrders: 2,
    totalSpent: 199.94,
    lastOrder: '2024-01-14',
    status: 'Inactive',
    orders: [
      {
        id: '4',
        date: '2024-01-14',
        total: 99.97,
        status: 'Pending'
      }
    ]
  }
];

interface ClientOrder {
  id: string;
  date: string;
  total: number;
  status: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: string;
  orders: ClientOrder[];
}

export default function Clients() {
  const [clients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'all' || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-40 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Spent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {client.name}
                  </div>
                  <div className="text-sm text-gray-500">{client.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.totalOrders}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${client.totalSpent.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      client.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedClient(client)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Client Details Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Client Details
              </h2>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Client Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Personal Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p>Name: {selectedClient.name}</p>
                  <p>Email: {selectedClient.email}</p>
                  <p>Phone: {selectedClient.phone}</p>
                  <p>Join Date: {selectedClient.joinDate}</p>
                  <p>Status: {selectedClient.status}</p>
                </div>
              </div>

              {/* Activity Summary */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Activity Summary
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {selectedClient.totalOrders}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <p className="text-xl font-semibold text-gray-900">
                      ${selectedClient.totalSpent.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Last Order</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {selectedClient.lastOrder}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Order History
                </h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  {selectedClient.orders.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="text-left text-sm font-medium text-gray-500">
                            Order ID
                          </th>
                          <th className="text-left text-sm font-medium text-gray-500">
                            Date
                          </th>
                          <th className="text-left text-sm font-medium text-gray-500">
                            Total
                          </th>
                          <th className="text-left text-sm font-medium text-gray-500">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedClient.orders.map((order) => (
                          <tr key={order.id}>
                            <td className="py-2">#{order.id}</td>
                            <td className="py-2">{order.date}</td>
                            <td className="py-2">${order.total.toFixed(2)}</td>
                            <td className="py-2">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === 'Completed'
                                    ? 'bg-green-100 text-green-800'
                                    : order.status === 'Processing'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center py-4">
                      <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        No orders found
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
