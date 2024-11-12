import { useState, useEffect } from 'react';

// This would normally come from Square's API
interface SquarePointsResponse {
  points: number;
  nextAchievement: {
    name: string;
    pointsRequired: number;
  };
}

// Mock Square API call - Replace with actual Square API integration
const fetchSquarePoints = async (userId: string): Promise<SquarePointsResponse> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        points: 750,
        nextAchievement: {
          name: "Gold Status",
          pointsRequired: 1000
        }
      });
    }, 1000);
  });
};

export function usePoints(userId: string) {
  const [points, setPoints] = useState(0);
  const [nextAchievement, setNextAchievement] = useState({ name: '', pointsRequired: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPoints = async () => {
      try {
        const data = await fetchSquarePoints(userId);
        setPoints(data.points);
        setNextAchievement(data.nextAchievement);
      } catch (error) {
        console.error('Error fetching points:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPoints();
  }, [userId]);

  return { points, nextAchievement, loading };
}