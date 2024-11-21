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
    { value: "weight_loss", label: "Lose fat" },
    { value: "maintain", label: "Maintain weight" },
    { value: "muscle_gain", label: "Build muscle" },
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
      <h2 className="text-lg font-bold mb-4">What is your goal?</h2>

      <div className="space-y-4">
        {goals.map((goal) => (
          <Button
            key={goal.value}
            onClick={() => handleGoalSelect(goal.value)}
            variant="outline"
            className={`w-full text-left ${
              selectedGoal === goal.value ? "border-indigo-600 text-indigo-600" : ""
            }`}
          >
            {goal.label}
          </Button>
        ))}
      </div>

      <div className="flex justify-end items-center mt-6">
        <Button onClick={handleNext} className="w-2/3 bg-indigo-600 text-white">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step4;
