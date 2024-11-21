"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Step8 = ({ onNext }: { onNext: () => void }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const mealPlans = [
    { label: "Three meals per day" },
    { label: "Four meals per day" },
    { label: "Full plan - five times per day" },
    { label: "Just lunch and dinner" },
    {
      label: "Flexible",
      tooltip: "Choose this if you don’t want a fixed number of meals.",
    },
  ];

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleNext = () => {
    if (selectedPlan) {
      onNext();
    } else {
      alert("Please select your meal plan before proceeding.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <h2 className="text-lg font-bold mb-4">How often do you plan to eat per day?</h2>

      <div className="space-y-4">
        {mealPlans.map((plan) => (
          <div key={plan.label} className="relative">
            <Button
              variant="outline"
              onClick={() => handleSelectPlan(plan.label)}
              className={`w-full text-left ${
                selectedPlan === plan.label ? "border-indigo-600 text-indigo-600" : ""
              }`}
            >
              {plan.label}
            </Button>
            {plan.tooltip && (
              <Tooltip>
                <TooltipTrigger className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <span className="text-indigo-600 text-lg">?</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{plan.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button variant="outline" className="w-1/3">
          Previous
        </Button>
        <Button onClick={handleNext} className="w-2/3 bg-indigo-600 text-white">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step8;
