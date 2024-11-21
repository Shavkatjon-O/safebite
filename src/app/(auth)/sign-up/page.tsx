"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import Step1 from "./_components/step1";
import Step2 from "./_components/step2";
import Step3 from "./_components/step3";

const Page = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleNextStep = (email?: string) => {
    if (email) setEmail(email);
    setStep((prev) => prev + 1);
  };

  const progressPercentage = (step / 3) * 100;

  return (
    <div className="size-full p-6">
      <div className="px-4">
        <Progress value={progressPercentage} className="w-full [&>*]:bg-indigo-600 bg-indigo-200" />
      </div>

      {step === 1 && <Step1 onNext={handleNextStep} />}
      {step === 2 && <Step2 email={email} onNext={() => handleNextStep()} />}
      {step === 4 && <Step3 />}
    </div>
  );
};

export default Page;
