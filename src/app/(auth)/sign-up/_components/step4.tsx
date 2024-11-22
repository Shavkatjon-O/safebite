"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SignUpDataType } from "../page";

const Step4 = ({
  onNext,
  onData,
}: {
  onNext: () => void;
  onData: (data: Partial<SignUpDataType>) => void;
}) => {
  const [selectedGoal, setSelectedGoal] = useState("");

  const goals = [
    { value: "lose_weight", label: "Lose weight" },
    { value: "maintain", label: "Maintain weight" },
    { value: "gain_muscle", label: "Gain muscle" },
  ];

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal);
  };

  const handleNext = () => {
    if (selectedGoal) {
      onData({ goal: selectedGoal });
      onNext();
    } else {
      alert("Please select a goal before proceeding.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <h2 className="text-3xl text-center text-custom font-bold mb-8">What is your goal?</h2>

      <div className="space-y-4">
        {goals.map((goal) => (
          <Button
            key={goal.value}
            onClick={() => handleGoalSelect(goal.value)}
            variant="outline"
            className={`w-full text-left h-14 ${
              selectedGoal === goal.value ? "border-custom text-custom" : ""
            }`}
          >
            {goal.label}
          </Button>
        ))}
      </div>

      <div className="flex justify-end items-center mt-6">
        <Button onClick={handleNext} className="w-full h-14 bg-custom hover:bg-indigo-700 text-white">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step4;
