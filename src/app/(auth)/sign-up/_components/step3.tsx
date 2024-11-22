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
      <h2 className="text-3xl text-custom text-center mb-8 font-bold">Physical Profile</h2>

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
            className="h-14"
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
            className="h-14"
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
              <div key={gender.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={gender.value}
                  id={`gender-${gender.value}`}
                />
                <label htmlFor={`gender-${gender.value}`} className="text-sm">
                  {gender.label}
                </label>
              </div>
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
            className="h-14"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 gap-4">
        <Button variant="outline" className="w-1/2 h-14">
          Previous
        </Button>
        <Button
          onClick={handleNext}
          className="w-1/2 h-14 bg-indigo-600 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step3;
