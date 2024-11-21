"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { SignUpDataType } from "../page";
import { signUp } from "@/services/auth";

const Step9 = ({
  onPrevious,
  onComplete,
  userData,
}: {
  onPrevious: () => void;
  onComplete: () => void;
  userData: Partial<SignUpDataType>;
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      !userData.email ||
      !userData.password ||
      !userData.first_name ||
      !userData.last_name ||
      !userData.age ||
      !userData.gender ||
      !userData.height ||
      !userData.weight ||
      !userData.activity_level ||
      !userData.goal ||
      !userData.diet_type ||
      !userData.allergies ||
      !userData.calories ||
      !userData.carbs ||
      !userData.proteins ||
      !userData.fats
    ) {
      alert("Please ensure all required fields are filled before submitting.");
      return;
    }

    // Adjust payload to ensure proper data types
    const payload = {
      email: userData.email,
      password: userData.password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      age: Number(userData.age), // Ensure age is a number
      gender: userData.gender.toLowerCase(), // Match backend expected format
      height: parseFloat(userData.height.toString()), // Ensure height is a float
      weight: parseFloat(userData.weight.toString()), // Ensure weight is a float
      activity_level: userData.activity_level.toLowerCase(), // Match backend expected format
      goal: userData.goal.toLowerCase(), // Match backend expected format
      diet_type: userData.diet_type,
      allergies: userData.allergies,
      calories: parseFloat(userData.calories.toString()), // Ensure calories is a float
      carbs: parseFloat(userData.carbs.toString()), // Ensure carbs is a float
      proteins: parseFloat(userData.proteins.toString()), // Ensure proteins is a float
      fats: parseFloat(userData.fats.toString()), // Ensure fats is a float
    };

    console.log("Payload:", payload);

    setLoading(true);
    try {
      const response = await signUp(
        payload.email,
        payload.password,
        payload.first_name,
        payload.last_name,
        payload.age,
        payload.gender,
        payload.height,
        payload.weight,
        payload.activity_level,
        payload.goal,
        payload.diet_type,
        payload.allergies,
        payload.calories,
        payload.carbs,
        payload.proteins,
        payload.fats
      );

      if (response.success) {
        alert("Registration successful!");
        onComplete();
      } else {
        alert(response.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <h2 className="text-lg font-bold mb-4">Summary of Your Information</h2>
      <p className="text-sm mb-6">
        Please review the details below. If everything looks good, click Submit
        to complete your registration.
      </p>

      <div className="space-y-4">
        <div className="p-4 border rounded-md bg-gray-50">
          <h3 className="font-semibold">Personal Information</h3>
          <p>Email: {userData.email || "Not provided"}</p>
          <p>
            Name: {userData.first_name || "Not provided"}{" "}
            {userData.last_name || "Not provided"}
          </p>
          <p>Age: {userData.age || "Not provided"}</p>
          <p>Gender: {userData.gender || "Not provided"}</p>
        </div>

        <div className="p-4 border rounded-md bg-gray-50">
          <h3 className="font-semibold">Physical Profile</h3>
          <p>Height: {userData.height || "Not provided"} cm</p>
          <p>Weight: {userData.weight || "Not provided"} kg</p>
        </div>

        <div className="p-4 border rounded-md bg-gray-50">
          <h3 className="font-semibold">Lifestyle & Preferences</h3>
          <p>Activity Level: {userData.activity_level || "Not provided"}</p>
          <p>Goal: {userData.goal || "Not provided"}</p>
          <p>Diet Type: {userData.diet_type || "Not provided"}</p>
          <p>Allergies: {userData.allergies || "None"}</p>
        </div>

        <div className="p-4 border rounded-md bg-gray-50">
          <h3 className="font-semibold">Calorie Details</h3>
          <p>Calories: {userData.calories || "Not calculated"}</p>
          <p>Carbs: {userData.carbs || "Not calculated"}g</p>
          <p>Proteins: {userData.proteins || "Not calculated"}g</p>
          <p>Fats: {userData.fats || "Not calculated"}g</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          className="w-1/3"
          onClick={onPrevious}
          disabled={loading}
        >
          Previous
        </Button>
        <Button
          onClick={handleSubmit}
          className="w-2/3 bg-indigo-600 text-white"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default Step9;
