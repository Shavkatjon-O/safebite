"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { 
  sendVerificationCode,
  checkVerificationCode,
} from "@/services/auth";


const Step1FormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const Step1 = ({ onNext }: { onNext: () => void }) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof Step1FormSchema>>({
    resolver: zodResolver(Step1FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof Step1FormSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await sendVerificationCode(data.email);
      setMessage(response.message);
      if (response.success) {
        onNext();
      } else {
        console.log("Sign-up failed");
      }
    } catch (error) {
      console.log("Error during sign-up:", error);
      setMessage("An error occurred during sign-up.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="size-full flex justify-center items-center px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 w-full space-y-4 rounded-md">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email" {...field}
                    className="h-14"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {message && (
            <div className="flex justify-center w-full bg-slate-100 py-2 rounded-md">
              <span className="text-indigo-500">{message}</span>
            </div>
          )}
          <Button
            type="submit"
            className="w-full h-14 bg-custom hover:bg-indigo-800 font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              "Sign Up"
            )}
          </Button>
          <div className="w-full flex justify-center">
            <span className="text-slate-500">Already have account?</span>
            <Link href="/sign-up" className="text-custom ml-1">Sign In</Link>
          </div>
        </form>
      </Form>
    </div>
  );
};


const Step2FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

const Step2 = ({ email, onNext }: { email: string, onNext: () => void }) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof Step2FormSchema>>({
    resolver: zodResolver(Step2FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof Step2FormSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await checkVerificationCode(email, data.pin);
      setMessage(response.message);
      if (response.success) {
        onNext();
      } else {
        console.log("Otp verification failed");
      }
    } catch (error) {
      console.log("Error during sign-up:", error);
      setMessage("An error occurred during sign-up.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="size-full flex justify-center items-center px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-4">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="w-full flex justify-between">
                      <InputOTPSlot index={0} className="w-full h-14 text-lg"/>
                      <InputOTPSlot index={1} className="w-full h-14 text-lg"/>
                      <InputOTPSlot index={2} className="w-full h-14 text-lg" />
                      <InputOTPSlot index={3} className="w-full h-14 text-lg" />
                      <InputOTPSlot index={4} className="w-full h-14 text-lg" />
                      <InputOTPSlot index={5} className="w-full h-14 text-lg" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {message && (
            <div className="flex justify-center w-full bg-slate-100 py-2 rounded-md">
              <span className="text-indigo-500">{message}</span>
            </div>
          )}
          <Button
            type="submit"
            className="w-full h-14 bg-custom hover:bg-indigo-800 font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};


const Step3 = ({ email, onNext }: { email: string, onNext: () => void }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await checkVerificationCode(email, otp);
    setLoading(false);
    setMessage(response.message);
    if (response.success) {
      onNext();  // Move to the next step (Post verification)
    }
  };

  return (
    <div>
      <h2>Enter Verification Code</h2>
      <form onSubmit={handleVerify}>
        <input 
          type="text" 
          value={otp} 
          onChange={(e) => setOtp(e.target.value)} 
          placeholder="Enter OTP" 
        />
        <button type="submit" disabled={loading}>Verify</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};


const Step4 = () => {
  const router = useRouter();

  const handleFinish = () => {
    // You could also redirect the user to the home page or login
    router.push("/dashboard");
  };

  return (
    <div>
      <h2>Signup Complete!</h2>
      <button onClick={handleFinish}>Go to Dashboard</button>
    </div>
  );
};

const Page = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleNextStep = (email: string = "") => {
    if (email) setEmail(email);
    setStep(step + 1);
  };

  return (
    <div className="size-full">
      {step === 1 && <Step1 onNext={() => handleNextStep(email)} />}
      {step === 2 && <Step2 email={email} onNext={() => handleNextStep()} />}
      {step === 3 && <Step3 email={email} onNext={() => handleNextStep()} />}
      {step === 4 && <Step4 />}
    </div>
  );
};

export default Page;
