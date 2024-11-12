import React from 'react';
import DetoxQuiz from './DetoxQuiz';
import { Sparkles, Leaf, Battery } from 'lucide-react';

const benefits = [
  { icon: Sparkles, text: "Reset Your Body" },
  { icon: Leaf, text: "Natural Ingredients" },
  { icon: Battery, text: "Boost Energy" },
];

export default function Hero() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&q=80"
          alt="Fresh juices background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-800/50" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-100 mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Transform Your Life with Our Detox Programs</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Start Your Wellness Journey Today
          </h1>
          <p className="text-xl text-emerald-50 mb-8">
            Experience the power of natural detoxification. Our carefully crafted programs 
            help cleanse your body, boost energy levels, and restore your natural balance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.text} className="flex items-center space-x-2 text-emerald-100">
                  <Icon className="h-5 w-5" />
                  <span>{benefit.text}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <DetoxQuiz />
          </div>
        </div>
      </div>
    </div>
  );
}