"use client";

import React, { useState } from "react";
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
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { SignUpDataType } from "../page";

const Step2FormSchema = z.object({
  pin: z.string().length(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const Step2 = ({
  onNext,
  onData,
}: {
  onNext: () => void;
  onData: (data: Partial<SignUpDataType>) => void;
}) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof Step2FormSchema>>({
    resolver: zodResolver(Step2FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof Step2FormSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulated API Call
      console.log("PIN:", data.pin);
      setMessage("OTP verified successfully");

      onData({ pin: data.pin }); // Pass the pin to the parent
      onNext(); // Move to the next step
    } catch (error) {
      console.error("Error during OTP verification:", error);
      setMessage("An error occurred during verification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="size-full flex justify-center items-center px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="w-full flex justify-between">
                      <InputOTPSlot index={0} className="w-full h-14 text-lg" />
                      <InputOTPSlot index={1} className="w-full h-14 text-lg" />
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

export default Step2;
