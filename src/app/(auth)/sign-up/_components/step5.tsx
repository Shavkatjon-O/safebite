"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Step5 = ({ onNext }: { onNext: () => void }) => {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState("");

  const allergies = [
    "Gluten",
    "Diary",
    "Egg",
    "Soy",
    "Peanut",
    "Wheat",
    "Milk",
    "Fish",
    "Banana",
  ];

  const handleToggleAllergy = (allergy: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergy)
        ? prev.filter((item) => item !== allergy)
        : [...prev, allergy]
    );
  };

  const handleAddCustomAllergy = () => {
    if (customAllergy.trim() && !selectedAllergies.includes(customAllergy)) {
      setSelectedAllergies((prev) => [...prev, customAllergy]);
      setCustomAllergy("");
    }
  };

  const handleNext = () => {
    // Proceed only if at least one allergy is selected (optional validation)
    if (selectedAllergies.length > 0 || customAllergy) {
      onNext();
    } else {
      alert("Please select or add any ingredient allergies before proceeding.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <h2 className="text-lg font-bold mb-4">Do you have any ingredient allergies?</h2>
      <p className="text-sm mb-6">
        To offer you the best tailored diet experience we need to know more information about you.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {allergies.map((allergy) => (
          <Button
            key={allergy}
            variant="outline"
            onClick={() => handleToggleAllergy(allergy)}
            className={`text-sm ${
              selectedAllergies.includes(allergy) ? "bg-indigo-600 text-white" : ""
            }`}
          >
            {allergy}
          </Button>
        ))}
      </div>

      <div className="flex gap-2 items-center mb-4">
        <Input
          type="text"
          value={customAllergy}
          onChange={(e) => setCustomAllergy(e.target.value)}
          placeholder="If other, type here"
          className="flex-1"
        />
        <Button onClick={handleAddCustomAllergy} className="bg-indigo-600 text-white">
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {selectedAllergies.map((allergy) => (
          <Badge
            key={allergy}
            className="flex items-center bg-indigo-600 text-white px-3 py-1 rounded-full"
          >
            {allergy}
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

export default Step5;
