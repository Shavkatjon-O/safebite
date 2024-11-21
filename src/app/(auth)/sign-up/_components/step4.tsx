"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Step4 = ({ onNext }: { onNext: () => void }) => {
  const [goalType, setGoalType] = useState("General goal");
  const [selectedGoal, setSelectedGoal] = useState("");

  const goals = [
    "Lose fat",
    "Maintain weight",
    "Build muscle",
    "Better overall health",
  ];

  const handleGoalTypeChange = (type: string) => {
    setGoalType(type);
    setSelectedGoal(""); // Reset selection when goal type changes
  };

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal);
  };

  const handleNext = () => {
    if (selectedGoal) {
      onNext();
    } else {
      alert("Please select a goal before proceeding.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <h2 className="text-lg font-bold mb-4">What is your goal?</h2>

      <ToggleGroup
        type="single"
        value={goalType}
        onValueChange={handleGoalTypeChange}
        className="flex mb-6"
      >
        <ToggleGroupItem
          value="General goal"
          className={`flex-1 ${
            goalType === "General goal" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
        >
          General goal
        </ToggleGroupItem>
        <ToggleGroupItem
          value="Exact goal"
          className={`flex-1 ${
            goalType === "Exact goal" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
        >
          Exact goal
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="space-y-4">
        {goals.map((goal) => (
          <Button
            key={goal}
            onClick={() => handleGoalSelect(goal)}
            variant="outline"
            className={`w-full text-left ${
              selectedGoal === goal ? "border-indigo-600 text-indigo-600" : ""
            }`}
          >
            {goal}
          </Button>
        ))}
      </div>

      <div className="flex justify-end items-center mt-6">
        <Button
          onClick={handleNext}
          className="w-2/3 bg-indigo-600 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step4;
