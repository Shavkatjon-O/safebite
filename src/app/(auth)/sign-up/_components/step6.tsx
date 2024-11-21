"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SignUpDataType } from "../page";

const Step6 = ({
  onNext,
  onData,
}: {
  onNext: () => void;
  onData: (data: Partial<SignUpDataType>) => void;
}) => {
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [customDiet, setCustomDiet] = useState("");

  const diets = [
    "None",
    "Vegan",
    "Paleo",
    "Diabetes",
    "Vegetarian",
    "Atkins",
    "Intermittent Fasting",
    "Gluten-free",
    "Low carb",
  ];

  const handleToggleDiet = (diet: string) => {
    setSelectedDiets((prev) =>
      prev.includes(diet)
        ? prev.filter((item) => item !== diet)
        : [...prev, diet]
    );
  };

  const handleAddCustomDiet = () => {
    if (customDiet.trim() && !selectedDiets.includes(customDiet)) {
      setSelectedDiets((prev) => [...prev, customDiet]);
      setCustomDiet("");
    }
  };

  const handleNext = () => {
    if (selectedDiets.length > 0) {
      onData({ diet_type: selectedDiets.join(", ") }); // Pass diets as a string to the parent
      onNext();
    } else {
      alert("Please select or add any specific diets before proceeding.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <h2 className="text-lg font-bold mb-4">Do you follow any specific diets?</h2>
      <p className="text-sm mb-6">
        To offer you the best tailored diet experience, we need to know more
        information about you.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {diets.map((diet) => (
          <Button
            key={diet}
            variant="outline"
            onClick={() => handleToggleDiet(diet)}
            className={`text-sm ${
              selectedDiets.includes(diet) ? "bg-indigo-600 text-white" : ""
            }`}
          >
            {diet}
          </Button>
        ))}
      </div>

      <div className="flex gap-2 items-center mb-4">
        <Input
          type="text"
          value={customDiet}
          onChange={(e) => setCustomDiet(e.target.value)}
          placeholder="If other, type here"
          className="flex-1"
        />
        <Button
          onClick={handleAddCustomDiet}
          className="bg-indigo-600 text-white"
        >
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {selectedDiets.map((diet) => (
          <Badge
            key={diet}
            className="flex items-center bg-indigo-600 text-white px-3 py-1 rounded-full"
          >
            {diet}
          </Badge>
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

export default Step6;
