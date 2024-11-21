"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import Step1 from "./_components/step1";
import Step2 from "./_components/step2";
import Step3 from "./_components/step3";
import Step4 from "./_components/step4";
import Step5 from "./_components/step5";
import Step6 from "./_components/step6";
import Step7 from "./_components/step7";
import Step8 from "./_components/step8";
import Step9 from "./_components/step9";

export interface SignUpDataType {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  activity_level: string;
  goal: string;
  diet_type: string;
  allergies: string;
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
  pin?: string;
}

const Page = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<Partial<SignUpDataType>>({});

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleData = (data: Partial<SignUpDataType>) => {
    setUserData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleRegister = async () => {
    console.log("Final user data:", userData);
    // Add your backend registration logic here
  };

  const progressPercentage = (step / 9) * 100;

  return (
    <div className="size-full p-6">
      <div className="px-4">
        <Progress
          value={progressPercentage}
          className="w-full [&>*]:bg-indigo-600 bg-indigo-200"
        />
        <div className="mt-2 text-center text-sm font-medium text-gray-700">
          Step {step} of 9
        </div>
      </div>
      <div className="mt-6">
        {step === 1 && <Step1 onNext={handleNextStep} onData={handleData} />}
        {step === 2 && <Step2 onNext={handleNextStep} onData={handleData} />}
        {step === 3 && <Step3 onNext={handleNextStep} onData={handleData} />}
        {step === 4 && <Step4 onNext={handleNextStep} onData={handleData} />}
        {step === 5 && <Step5 onNext={handleNextStep} onData={handleData} />}
        {step === 6 && <Step6 onNext={handleNextStep} onData={handleData} />}
        {step === 7 && <Step7 onNext={handleNextStep} onData={handleData} />}
        {step === 8 && (
          <Step8
            onNext={handleNextStep}
            onData={handleData}
            userData={userData}
          />
        )}
        {step === 9 && (
          <Step9
            onPrevious={handlePreviousStep}
            onComplete={handleRegister}
            userData={userData}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
