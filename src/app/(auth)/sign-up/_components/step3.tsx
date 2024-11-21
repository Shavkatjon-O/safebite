"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SignUpDataType } from "../page";

const Step3 = ({
  onNext,
  onData,
}: {
  onNext: () => void;
  onData: (data: Partial<SignUpDataType>) => void;
}) => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    gender: "",
    age: "",
  });

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (gender: string) => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleNext = () => {
    const { height, weight, gender, age } = formData;
    if (height && weight && gender && age) {
      onData({
        height: parseFloat(height),
        weight: parseFloat(weight),
        gender,
        age: parseInt(age, 10),
      });
      onNext();
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <h2 className="text-lg font-bold mb-4">Physical Profile</h2>
      <p className="text-sm mb-6">
        We use RMR (Resting Metabolic Rate) to estimate your calorie budget,
        which uses height, weight, gender, and age as inputs.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="height">
            Height (cm)
          </label>
          <Input
            id="height"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleInputChange}
            placeholder="Enter your height in cm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="weight">
            Weight (kg)
          </label>
          <Input
            id="weight"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="Enter your weight in kg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <RadioGroup
            value={formData.gender}
            onValueChange={handleGenderChange}
            className="flex space-x-4"
          >
            {genders.map((gender) => (
              <RadioGroupItem key={gender.value} value={gender.value}>
                {gender.label}
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="age">
            Age (years)
          </label>
          <Input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter your age in years"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button variant="outline" className="w-1/3">
          Previous
        </Button>
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

export default Step3;
