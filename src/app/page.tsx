"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/sign-up');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const progressPercentage = ((currentStep + 1) / 4) * 100;

  return (
    <div className="size-full p-6 flex flex-col justify-between items-center">
      <Progress value={progressPercentage} className="w-full mb-6 [&>*]:bg-indigo-600 bg-indigo-200"  />

      <div className="size-full flex flex-col items-center mb-6">
        <h1 className='text-2xl mb-6'>Welcome to <span className='font-semibold text-indigo-700'>SafeBite</span></h1>
        {currentStep === 0 && 
          <div className='w-full space-y-6 text-center'>
            <Image
              src="/images/auth-image.svg"
              alt="SafeBite"
              className="w-full"
              height={512}
              width={512}
            />
            <h1 className='font-semibold text-xl'>Enjoy your meal time</h1>
            <p className='text-lg'>Just relax and not overthink what to eat. This is in our side with our personalized meal plans just prepared and adapted to your needs.</p>
          </div>
        }
        {currentStep === 1 && 
          <div className='w-full space-y-6 text-center'>
            <Image
              src="/images/auth-image.svg"
              alt="SafeBite"
              className="w-full"
              height={512}
              width={512}
            />
            <h1 className='font-semibold text-xl'>Control what you eat</h1>
            <p className='text-lg'>Easily monitor your nutrition  and stick to a healthy lifestyle with customized meal plans and insights.</p>
          </div>
        }
        {currentStep === 2 && 
          <div className='w-full space-y-6 text-center'>
            <Image
              src="/images/auth-image.svg"
              alt="SafeBite"
              className="w-full"
              height={512}
              width={512}
            />
            <h1 className='font-semibold text-xl'>Find the perfect recipe</h1>
            <p className='text-lg'>Discover the best recipes that define your everyday meals. Get step-by-step food preparation process and start your journey to wellness.</p>
          </div>
        }
        {currentStep === 3 && 
          <div className='w-full space-y-6 text-center'>
            <Image
              src="/images/auth-image.svg"
              alt="SafeBite"
              className="w-full"
              height={512}
              width={512}
            />
            <h1 className='font-semibold text-xl'>Plan, eat, and thrive with us!</h1>
            <p className='text-lg'>From meal planning to healthy eating, we are here to guide you toward a thriving and balanced daily routine.</p>
          </div>
        }
      </div>

      <div className="flex w-full justify-between">
        <Button 
          onClick={handlePreviousStep} 
          disabled={currentStep === 0} 
          className="w-1/4 h-14 bg-indigo-600 hover:bg-indigo-700 text-base rounded-2xl"
        >
          Previous
        </Button>
        <Button 
          onClick={handleNextStep} 
          className="w-1/4 h-14 bg-indigo-600 hover:bg-indigo-700 text-base rounded-2xl"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Page;
