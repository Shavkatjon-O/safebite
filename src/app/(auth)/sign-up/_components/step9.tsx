"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SignUpDataType } from "../page";

const Step9 = ({
  onNext,
  userData,
}: {
  onNext: () => void;
  userData: Partial<SignUpDataType>;
}) => {
  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <h2 className="text-lg font-bold mb-4">Summary of Your Information</h2>
      <p className="text-sm mb-6">
        Please review the details below. If everything looks good, proceed to
        complete the sign-up process.
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
        <Button variant="outline" className="w-1/3">
          Previous
        </Button>
        <Button onClick={onNext} className="w-2/3 bg-indigo-600 text-white">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Step9;
