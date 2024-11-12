import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Truck } from 'lucide-react';

const timeSlots = [
  { id: 'morning', label: 'Morning', time: '8AM - 12PM', icon: '🌅' },
  { id: 'afternoon', label: 'Afternoon', time: '12PM - 4PM', icon: '☀️' },
  { id: 'evening', label: 'Evening', time: '4PM - 8PM', icon: '🌅' }
];

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Delivery scheduled successfully!');
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-emerald-900 mb-6">Schedule Delivery</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Delivery Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Preferred Time
              </label>
              <div className="grid grid-cols-3 gap-4">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedTime(slot.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedTime === slot.id
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-emerald-200'
                    }`}
                  >
                    <span className="text-2xl mb-2">{slot.icon}</span>
                    <p className="font-medium">{slot.label}</p>
                    <p className="text-sm text-gray-500">{slot.time}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-400 text-white py-3 px-4 rounded-xl hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2"
            >
              <Truck className="h-5 w-5" />
              <span>Schedule Delivery</span>
            </button>
          </form>
        </div>

        <div className="bg-emerald-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-emerald-900 mb-4">Delivery Information</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-emerald-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Delivery Address</p>
                <p className="text-gray-600">123 Main St, Los Angeles, CA 90001</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-emerald-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Estimated Time</p>
                <p className="text-gray-600">2-hour delivery window</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg border border-emerald-100">
            <p className="text-sm text-emerald-800">
              <strong>Note:</strong> Our delivery personnel will call you 30 minutes before arrival.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}