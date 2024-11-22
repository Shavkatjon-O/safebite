"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { SignUpDataType } from "../page";
import { getCalculatedCalorie } from "@/services/auth";

const Step8 = ({
  onNext,
  onData,
  userData,
}: {
  onNext: () => void;
  onData: (data: Partial<SignUpDataType>) => void;
  userData: Partial<SignUpDataType>;
}) => {
  const [loading, setLoading] = useState(false);
  const [calorieData, setCalorieData] = useState<{
    calories: number;
    carbs: number;
    proteins: number;
    fats: number;
  } | null>(null);

  const handleCalculate = async () => {
    if (
      !userData.age ||
      !userData.gender ||
      !userData.height ||
      !userData.weight ||
      !userData.activity_level ||
      !userData.goal
    ) {
      alert("Please ensure all required fields are filled.");
      return;
    }

    setLoading(true);
    try {
      const result = await getCalculatedCalorie(
        userData.age,
        userData.gender,
        userData.height.toString(),
        userData.weight.toString(),
        userData.activity_level,
        userData.goal
      );

      console.log(result);

      if (result?.success && result?.data?.data) {
        const responseData = result.data.data.data;

        console.log(responseData.data)

        // Check and extract calorie and macro data safely
        const calories = responseData.calories || 0;
        const macros = responseData.macros || {};
        const proteins = macros.protein || 0;
        const carbs = macros.carb || 0;
        const fats = macros.fat || 0;

        // Save extracted data to state and pass to parent
        const calculatedData = { calories, carbs, proteins, fats };
        setCalorieData(calculatedData);
        onData(calculatedData);
      } else {
        alert(result?.message || "Failed to calculate calories.");
      }
    } catch (error) {
      console.error("Error calculating calories:", error);
      alert("Failed to calculate calories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <h2 className="text-3xl text-center text-custom font-bold mb-4">Calorie Calculation</h2>
      <p className="mb-6 text-center">
        Based on your details, we will calculate your recommended daily intake.
      </p>

      {!calorieData ? (
        <div className="text-center">
          <Button
            onClick={handleCalculate}
            className="hover:bg-indigo-800 bg-custom h-14 text-white w-full"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Calculate"}
          </Button>
        </div>
      ) : (
        <div className="p-4 border rounded-md shadow-md border-custom space-y-4">
        
          <h3 className="font-semibold">Your Calorie Details</h3>

          <div className="flex justify-between border-b pb-2">
            <p>Calories</p>
            <span>{calorieData.calories || 0} kcal</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <p>Carbs</p> 
            <span>{calorieData.carbs || 0}g</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <p>Proteins</p>
            <span>{calorieData.proteins || 0}g</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <p>Fats</p>
            <span>{calorieData.fats || 0}g</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        {calorieData && (
          <Button onClick={onNext} className="w-full h-14 text-base bg-custom hover:bg-indigo-800 text-white">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Step8;
