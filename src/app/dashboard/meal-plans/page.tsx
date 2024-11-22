"use client";

import { useEffect, useState } from "react";
import coreApi from "@/lib/coreApi";

// TypeScript Interfaces
interface MealPlanType {
  success: boolean;
  code: number;
  message: string;
  data: MealPlanData[];
}

interface MealPlanData {
  [key: string]: MealPlanCategory; // e.g., "breakfast", "lunch", "dinner"
}

interface MealPlanCategory {
  id: string;
  recipes: Recipe[];
  created_at: string;
  updated_at: string;
  date: string;
  meal_time: string;
  user: string;
}

interface Recipe {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  instructions: string;
  ingredients_text: string;
  image: string;
  meal_categories: MealCategories;
  allergies: string;
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
  user: string;
  ingredients: string[];
  diet_type: string[];
}

interface MealCategories {
  Lunch: boolean;
  Dinner: boolean;
  Breakfast: boolean;
}

const MealPlanner = () => {
  const [responseData, setResponseData] = useState<MealPlanType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await coreApi.get<MealPlanType>("/meal/plan/");
        console.log("API Response:", response.data);
        setResponseData(response.data); // Store the response data with type safety
      } catch (error) {
        console.error("Error fetching meal plans:", error);
        setResponseData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlans();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto pt-16 pb-20">
      <h1 className="text-3xl font-semibold text-center mb-6">Meal Plan Response</h1>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
        {JSON.stringify(responseData, null, 2)}
      </pre>
    </div>
  );
};

export default MealPlanner;
