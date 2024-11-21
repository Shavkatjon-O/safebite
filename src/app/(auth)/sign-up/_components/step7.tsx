"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SignUpDataType } from "../page";

const Step7 = ({
  onNext,
  onData,
}: {
  onNext: () => void;
  onData: (data: Partial<SignUpDataType>) => void;
}) => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const activityLevels = [
    { label: "Sedentary", value: "sedentary" },
    { label: "Lightly Active", value: "lightly_active" },
    { label: "Moderately Active", value: "moderately_active" },
    { label: "Very Active", value: "very_active" },
    { label: "Extremely Active", value: "extremely_active" },
  ];

  const handleSelectActivity = (activity: string) => {
    setSelectedActivity(activity);
  };

  const handleNext = () => {
    if (selectedActivity) {
      onData({ activity_level: selectedActivity }); // Pass the selected activity level to the parent
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
            key={activity.value}
            variant="outline"
            onClick={() => handleSelectActivity(activity.value)}
            className={`w-full text-left ${
              selectedActivity === activity.value
                ? "border-indigo-600 text-indigo-600"
                : ""
            }`}
          >
            <div>
              <div className="font-semibold">{activity.label}</div>
              {/* <div className="text-sm text-gray-600">{activity.description}</div> */}
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
