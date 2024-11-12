import React from 'react';
import { Award, Star, TrendingUp } from 'lucide-react';
import { usePoints } from '../../hooks/usePoints';

export default function PointsDisplay() {
  const { points, nextAchievement, loading } = usePoints('demo-user');
  const progress = (points / nextAchievement.pointsRequired) * 100;

  if (loading) {
    return (
      <div className="animate-pulse bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg">
        <div className="h-20 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <Award className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Reward Points</h3>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-2xl font-bold text-emerald-600">{points}</span>
            </div>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-gray-600">Next Achievement</p>
          <p className="font-medium text-emerald-600">{nextAchievement.name}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress to {nextAchievement.name}</span>
          <span className="text-emerald-600 font-medium">
            {points} / {nextAchievement.pointsRequired}
          </span>
        </div>
        <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 lg:gap-3">
        {[
          { icon: Star, label: 'Silver', points: 500 },
          { icon: Award, label: 'Gold', points: 1000 },
          { icon: TrendingUp, label: 'Platinum', points: 2000 }
        ].map((tier) => {
          const Icon = tier.icon;
          const achieved = points >= tier.points;
          return (
            <div
              key={tier.label}
              className={`p-2 lg:p-3 rounded-xl text-center ${
                achieved
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-gray-50 text-gray-500'
              }`}
            >
              <Icon className={`h-4 lg:h-5 w-4 lg:w-5 mx-auto mb-1 ${achieved ? 'text-emerald-500' : 'text-gray-400'}`} />
              <p className="text-xs lg:text-sm font-medium">{tier.label}</p>
              <p className="text-xs">{tier.points} pts</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}