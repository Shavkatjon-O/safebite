"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const Step7 = ({ onNext }: { onNext: () => void }) => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const activityLevels = [
    {
      label: "Sedentary",
      description: "Little to exercise with a desk job",
    },
    {
      label: "Lightly Active",
      description: "Light daily activity with some exercises 1-3 days a week",
    },
    {
      label: "Moderately Active",
      description: "Moderately active daily life with exercise 3-5 days a week",
    },
    {
      label: "Very Active",
      description: "Physically demanding lifestyle with hard exercises or sports 6-7 days a week",
    },
  ];

  const handleSelectActivity = (activity: string) => {
    setSelectedActivity(activity);
  };

  const handleNext = () => {
    if (selectedActivity) {
      onNext();
    } else {
      alert("Please select your activity level before proceeding.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <h2 className="text-lg font-bold mb-4">How active are you?</h2>

      <div className="space-y-4">
        {activityLevels.map((activity) => (
          <Button
            key={activity.label}
            variant="outline"
            onClick={() => handleSelectActivity(activity.label)}
            className={`w-full text-left ${
              selectedActivity === activity.label ? "border-indigo-600 text-indigo-600" : ""
            }`}
          >
            <div>
              <div className="font-semibold">{activity.label}</div>
              <div className="text-sm text-gray-600">{activity.description}</div>
            </div>
          </Button>
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

export default Step7;
