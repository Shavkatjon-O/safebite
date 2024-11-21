"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Step3 = () => {
  const router = useRouter();

  const handleFinish = () => {
    router.push("/dashboard");
  };

  return (
    <div className="text-center">
      <h2>Signup Complete!</h2>
      <button onClick={handleFinish} className="mt-4 bg-indigo-600 text-white p-3 rounded">
        Go to Dashboard
      </button>
    </div>
  );
};

export default Step3;