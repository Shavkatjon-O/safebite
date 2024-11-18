"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const progressPercentage = ((currentStep + 1) / 4) * 100;

  return (
    <div className="size-full flex flex-col justify-between p-4 items-center h-screen">
      {/* Progress Bar */}
      <Progress value={progressPercentage} className="w-full mb-6" />

      {/* Step Content */}
      <div className="flex flex-col items-center mb-6 w-full">
        {currentStep === 0 && <p>This is the content for Step 1</p>}
        {currentStep === 1 && <p>This is the content for Step 2</p>}
        {currentStep === 2 && <p>This is the content for Step 3</p>}
        {currentStep === 3 && <p>This is the content for Step 4</p>}
      </div>

      {/* Navigation Buttons */}
      <div className="flex w-full gap-4 justify-between">
        <Button 
          onClick={handlePreviousStep} 
          disabled={currentStep === 0} 
          className="w-1/2"
        >
          Previous
        </Button>
        <Button 
          onClick={handleNextStep} 
          disabled={currentStep === 3} 
          className="w-1/2"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Page;
