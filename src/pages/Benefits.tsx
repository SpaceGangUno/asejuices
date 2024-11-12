import React from 'react';
import { Heart, Brain, Battery, Shield, Leaf, Sparkles, Scale, Sun, ArrowRight, Check, Star, Quote } from 'lucide-react';

const benefits = [
  {
    icon: Heart,
    title: "Heart Health",
    description: "Support cardiovascular health with antioxidant-rich ingredients that promote healthy blood flow and circulation.",
    features: ["Reduces inflammation", "Supports healthy blood pressure", "Rich in omega-3 fatty acids"],
    color: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    icon: Brain,
    title: "Mental Clarity",
    description: "Enhance cognitive function and focus with nutrient-dense superfoods and natural nootropics.",
    features: ["Improves concentration", "Boosts memory", "Reduces brain fog"],
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: Battery,
    title: "Energy Boost",
    description: "Natural, sustained energy without crashes, powered by vitamin-rich fruits and vegetables.",
    features: ["No caffeine crashes", "Sustained energy release", "Enhanced stamina"],
    color: "text-yellow-500",
    bgColor: "bg-yellow-50"
  },
  {
    icon: Shield,
    title: "Immune Support",
    description: "Strengthen your immune system with vitamin C and antioxidant-rich ingredients.",
    features: ["Boosts immune response", "Rich in antioxidants", "Natural vitamin C"],
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  {
    icon: Scale,
    title: "Weight Management",
    description: "Support healthy weight management with nutrient-dense, low-calorie options.",
    features: ["Controls cravings", "Supports metabolism", "Natural appetite control"],
    color: "text-emerald-500",
    bgColor: "bg-emerald-50"
  },
  {
    icon: Sun,
    title: "Skin Health",
    description: "Promote radiant skin with collagen-supporting ingredients and antioxidants.",
    features: ["Natural glow", "Anti-aging properties", "Hydration support"],
    color: "text-orange-500",
    bgColor: "bg-orange-50"
  }
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Fitness Enthusiast",
    quote: "After 30 days on Asé Juices, my energy levels have skyrocketed and my post-workout recovery is noticeably faster!",
    rating: 5
  },
  {
    name: "David L.",
    role: "Business Professional",
    quote: "The mental clarity blend has transformed my workday. I'm more focused, productive, and feel amazing!",
    rating: 5
  },
  {
    name: "Emma R.",
    role: "Yoga Instructor",
    quote: "My clients notice the difference in my energy and vitality. These juices are now an essential part of my daily routine!",
    rating: 5
  }
];

const stats = [
  { value: "92%", label: "Customer Satisfaction" },
  { value: "30+", label: "Natural Ingredients" },
  { value: "24hrs", label: "Fresh Pressed" },
  { value: "100%", label: "Organic Produce" }
];

export default function Benefits() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-900 to-emerald-700 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80"
            alt="Fresh juices background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Leaf className="h-16 w-16 mx-auto mb-8 text-emerald-400 animate-bounce" />
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Transform Your Life,<br />One Sip at a Time
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto mb-12">
            Experience the power of nature's finest ingredients, carefully crafted to enhance your wellbeing and vitality.
          </p>
          <div className="flex justify-center space-x-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400">{stat.value}</div>
                <div className="text-sm text-emerald-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nature's Power in Every Bottle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our cold-pressed juices are crafted with purpose, combining the finest organic ingredients 
              to deliver maximum health benefits and exceptional taste.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 group hover:-translate-y-1"
                >
                  <div className={`${benefit.bgColor} p-4 rounded-full w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${benefit.color}`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {benefit.description}
                  </p>
                  <ul className="space-y-3">
                    {benefit.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-700">
                        <Check className="h-5 w-5 text-emerald-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Sparkles className="h-12 w-12 mx-auto text-emerald-600 mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Life-Changing Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their health and vitality with Asé Juices.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative"
              >
                <Quote className="h-8 w-8 text-emerald-200 absolute top-4 right-4" />
                <div className="mb-4">
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-lg italic mb-6">"{testimonial.quote}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-emerald-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Start Your Wellness Journey Today</h2>
          <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto">
            Experience the transformative power of our cold-pressed juices and feel the difference in your body and mind.
          </p>
          <a
            href="#products"
            className="inline-flex items-center px-8 py-4 bg-white text-emerald-900 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-colors duration-300"
          >
            Explore Our Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}