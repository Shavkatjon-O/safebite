"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";

type Step = {
  title: string;
  description: string;
  image: string;
};

const steps: Step[] = [
  {
    title: "Enjoy your meal time",
    description: "Just relax and not overthink what to eat. This is in our side with our personalized meal plans just prepared and adapted to your needs.",
    image: "/images/auth-image.svg",
  },
  {
    title: "Control what you eat",
    description: "Easily monitor your nutrition and stick to a healthy lifestyle with customized meal plans and insights.",
    image: "/images/auth-image.svg",
  },
  {
    title: "Find the perfect recipe",
    description: "Discover the best recipes that define your everyday meals. Get step-by-step food preparation process and start your journey to wellness.",
    image: "/images/auth-image.svg",
  },
  {
    title: "Plan, eat, and thrive with us!",
    description: "From meal planning to healthy eating, we are here to guide you toward a thriving and balanced daily routine.",
    image: "/images/auth-image.svg",
  },
];

const StepContent: React.FC<{ step: Step }> = ({ step }) => (
  <div className="w-full space-y-8 flex flex-col items-center">
    <h1 className="text-3xl mt-8 font-bold text-indigo-700 tracking-wide">
      Welcome to <span className="text-purple-600">SafeBite</span>
    </h1>
    <Image
      src={step.image}
      alt={step.title}
      className="rounded-3xl shadow-lg"
      height={512}
      width={512}
    />
    <div className="border border-custom h-full p-6 rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-semibold text-gray-800">{step.title}</h2>
      <p className="text-md text-gray-600 mt-4">{step.description}</p>
    </div>
  </div>
);

const Page = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/sign-up");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="size-full p-6 flex flex-col justify-between items-center">
      <div className="size-full flex flex-col items-center">
        <StepContent step={steps[currentStep]} />
      </div>

      <div className="w-full mt-6 flex justify-between">
        <Button onClick={handlePreviousStep} className="size-14" variant="outline">
          <ArrowLeft />
        </Button>
        <Button onClick={handleNextStep} className="size-14 shadow-lg bg-indigo-600 hover:bg-indigo-700">
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Page;
