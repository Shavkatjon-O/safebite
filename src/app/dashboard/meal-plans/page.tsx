"use client";

import { useEffect, useState } from "react";
import coreApi from "@/lib/coreApi";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

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

  if (loading)
    return (
      <div className="max-w-4xl mx-auto pt-16 pb-20">
        <Skeleton className="h-12 w-full mb-6" />
        <Skeleton className="h-6 w-1/2 mb-4" />
        <Skeleton className="h-40 w-full mb-6" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto pt-16 pb-20">
      <h1 className="text-3xl font-semibold text-center mb-6">Meal Plan</h1>

      <Tabs defaultValue="day" className="mb-6">
        <TabsList>
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
        </TabsList>
        <TabsContent value="day">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Calories</h2>
                <Button variant="link">See more</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold">2,700</h3>
                <p className="text-sm text-muted-foreground">100% Goal</p>
              </div>
              <Progress value={100} className="mb-4" />
              <p className="text-sm text-muted-foreground text-center">4/4 meals tracked</p>
            </CardContent>
          </Card>

          {responseData?.data.map((categoryData, index) => (
            <div key={index} className="mt-6">
              <h3 className="text-xl font-semibold mb-4 capitalize">{Object.keys(categoryData)[0]}</h3>
              <div className="space-y-4">
                {Object.values(categoryData)[0].recipes.map((recipe) => (
                  <Card key={recipe.id} className="flex items-center p-4">
                    <div className="relative h-16 w-16 mr-4">
                      <Image
                        src={recipe.image}
                        alt={recipe.name}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div>
                      {recipe.image}
                      <h4 className="text-lg font-medium">{recipe.name}</h4>
                      <p className="text-sm text-muted-foreground">{recipe.calories} Cal</p>
                    </div>
                    <Button variant="link" className="ml-auto">
                      View more
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="week">
          <p className="text-center text-muted-foreground">Weekly view is under construction.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MealPlanner;
