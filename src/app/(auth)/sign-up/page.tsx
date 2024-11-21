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

const Page = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleNextStep = (email?: string) => {
    if (email) setEmail(email);
    setStep((prev) => prev + 1);
  };

  const progressPercentage = (step / 9) * 100;

  return (
    <div className="size-full p-6">
      <div className="px-4">
        <Progress value={progressPercentage} className="w-full [&>*]:bg-indigo-600 bg-indigo-200" />
        <div className="mt-2 text-center text-sm font-medium text-gray-700">
          Step {step} of 9
        </div>
      </div>

      {step === 1 && <Step1 onNext={handleNextStep} />}
      {step === 2 && <Step2 email={email} onNext={() => handleNextStep()} />}
      {step === 3 && <Step3 onNext={handleNextStep} />}
      {step === 4 && <Step4 onNext={handleNextStep} />}
      {step === 5 && <Step5 onNext={handleNextStep} />}
      {step === 6 && <Step6 onNext={handleNextStep} />}
      {step === 7 && <Step7 onNext={handleNextStep} />}
      {step === 8 && <Step8 onNext={handleNextStep} />}

      {step === 9 && <div>Done</div>}
    </div>
  );
};

export default Page;
