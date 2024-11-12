import React, { useState } from 'react';
import { Sparkles, Battery, Brain, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const questions = [
  {
    id: 1,
    question: "What's your main wellness goal?",
    options: [
      { text: "Boost Energy", icon: Battery },
      { text: "Mental Clarity", icon: Brain },
      { text: "Digestive Health", icon: Heart },
      { text: "Overall Detox", icon: Sparkles }
    ]
  },
  {
    id: 2,
    question: "How would you describe your current lifestyle?",
    options: [
      { text: "Always on the go", icon: Battery },
      { text: "Mostly sedentary", icon: Brain },
      { text: "Balanced but need boost", icon: Heart },
      { text: "Stressed and tired", icon: Sparkles }
    ]
  },
  {
    id: 3,
    question: "What's your experience with detox programs?",
    options: [
      { text: "First timer", icon: Battery },
      { text: "Occasional", icon: Brain },
      { text: "Regular", icon: Heart },
      { text: "Expert", icon: Sparkles }
    ]
  }
];

const recommendations = {
  "Boost Energy-Always on the go-First timer": {
    name: "Energize & Revive Program",
    description: "A gentle introduction to detoxing with focus on natural energy boosters.",
    products: [
      { name: "Morning Sunrise Juice", price: 9.99 },
      { name: "Green Energy Blend", price: 8.99 },
      { name: "Citrus Boost Tea", price: 7.99 }
    ]
  },
  "Mental Clarity-Mostly sedentary-Occasional": {
    name: "Mind & Body Reset",
    description: "Perfect for mental focus and gentle cleansing.",
    products: [
      { name: "Brain Boost Elixir", price: 10.99 },
      { name: "Clarity Tea Blend", price: 8.99 },
      { name: "Focus Factor Juice", price: 9.99 }
    ]
  }
};

export default function DetoxQuiz() {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const key = newAnswers.join("-");
      setRecommendation(recommendations[key as keyof typeof recommendations] || {
        name: "Custom Wellness Program",
        description: "A personalized program tailored to your unique needs.",
        products: [
          { name: "Premium Detox Blend", price: 11.99 },
          { name: "Wellness Tea", price: 8.99 },
          { name: "Recovery Juice", price: 9.99 }
        ]
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setRecommendation(null);
    setAddedToCart(false);
  };

  const handleAddToCart = () => {
    recommendation.products.forEach((product: { name: string; price: number }) => {
      addToCart({ name: product.name, price: product.price, quantity: 1 });
    });
    setAddedToCart(true);
  };

  return (
    <div className="mt-8">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white text-emerald-600 px-8 py-3 rounded-full hover:bg-emerald-50 transition flex items-center space-x-2"
        >
          <Sparkles className="h-5 w-5" />
          <span>Find Your Perfect Detox</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 max-w-xl animate-fade-in">
          {!recommendation ? (
            <div>
              <h3 className="text-xl font-semibold text-emerald-900 mb-4">
                {questions[currentQuestion].question}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.text}
                      onClick={() => handleAnswer(option.text)}
                      className="flex flex-col items-center p-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition"
                    >
                      <Icon className="h-8 w-8 text-emerald-600 mb-2" />
                      <span className="text-emerald-900">{option.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                {recommendation.name}
              </h3>
              <p className="text-emerald-700 mb-6">{recommendation.description}</p>
              <div className="space-y-2 mb-6">
                {recommendation.products.map((product: { name: string; price: number }) => (
                  <div key={product.name} className="bg-emerald-50 p-3 rounded flex justify-between items-center">
                    <span>{product.name}</span>
                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="bg-emerald-100 text-emerald-700 px-6 py-2 rounded-full hover:bg-emerald-200 transition"
                >
                  Start Over
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-full transition ${
                    addedToCart
                      ? 'bg-emerald-200 text-emerald-800 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{addedToCart ? 'Added to Cart' : 'Add All to Cart'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}