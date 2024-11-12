import React from 'react';
import { Leaf, Droplets, ThermometerSun, Timer, TrendingUp, Truck, Award, Sparkles } from 'lucide-react';

const processSteps = [
  {
    icon: Leaf,
    title: "1. Sourcing",
    description: "We partner with local organic farms to source the freshest produce daily. Each ingredient is carefully selected for maximum nutritional value.",
    details: [
      "100% Organic produce",
      "Local farm partnerships",
      "Daily fresh deliveries",
      "Seasonal selections"
    ],
    color: "text-green-500",
    bgColor: "bg-green-50"
  },
  {
    icon: Droplets,
    title: "2. Cold Pressing",
    description: "Our hydraulic press uses thousands of pounds of pressure to extract every drop of nutrition, ensuring maximum yield and minimal waste.",
    details: [
      "Hydraulic press technology",
      "No heat processing",
      "Maximum nutrient retention",
      "Minimal oxidation"
    ],
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: ThermometerSun,
    title: "3. Preservation",
    description: "We use High-Pressure Processing (HPP) to maintain freshness and extend shelf life without heat or preservatives.",
    details: [
      "Natural preservation",
      "No artificial additives",
      "Extended freshness",
      "Safety verified"
    ],
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  {
    icon: Timer,
    title: "4. Bottling",
    description: "Each juice is bottled in UV-protected glass to maintain freshness and prevent nutrient degradation from light exposure.",
    details: [
      "UV-protected bottles",
      "Sealed for freshness",
      "Eco-friendly packaging",
      "Recyclable materials"
    ],
    color: "text-amber-500",
    bgColor: "bg-amber-50"
  }
];

const qualityMarkers = [
  {
    icon: Award,
    title: "Quality Certified",
    description: "USDA Organic certified facility and processes"
  },
  {
    icon: TrendingUp,
    title: "Nutrient Testing",
    description: "Regular lab testing ensures optimal nutritional content"
  },
  {
    icon: Truck,
    title: "Cold Chain Delivery",
    description: "Temperature-controlled from press to doorstep"
  }
];

export default function Process() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 to-emerald-700 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80"
            alt="Juice pressing process"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="h-16 w-16 mx-auto mb-8 text-emerald-400" />
          <h1 className="text-5xl font-bold mb-6">Our Craft Process</h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            From farm to bottle, every step of our process is designed to deliver the highest quality, 
            most nutritious cold-pressed juices possible.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.title}
                  className={`relative ${isEven ? 'lg:translate-y-12' : ''}`}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-8 relative z-10 hover:shadow-2xl transition-shadow duration-300">
                    <div className={`${step.bgColor} p-4 rounded-full w-fit mb-6`}>
                      <Icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 mb-6">{step.description}</p>
                    <ul className="space-y-3">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-center text-gray-700">
                          <div className={`h-2 w-2 rounded-full ${step.color} mr-3`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute h-24 w-px bg-emerald-200 top-full left-1/2 transform -translate-x-1/2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-emerald-900 mb-4">
              Quality Assurance
            </h2>
            <p className="text-lg text-emerald-600 max-w-2xl mx-auto">
              We maintain the highest standards throughout our process to ensure you receive 
              the best possible product.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {qualityMarkers.map((marker) => {
              const Icon = marker.icon;
              return (
                <div
                  key={marker.title}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-6">
                    <Icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-900 mb-3">
                    {marker.title}
                  </h3>
                  <p className="text-gray-600">{marker.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Experience the Difference</h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Taste the result of our meticulous process and commitment to quality. 
            Try our cold-pressed juices today.
          </p>
          <a
            href="/products"
            className="inline-flex items-center px-8 py-3 border-2 border-white rounded-full text-lg font-semibold hover:bg-white hover:text-emerald-900 transition-colors duration-300"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
}