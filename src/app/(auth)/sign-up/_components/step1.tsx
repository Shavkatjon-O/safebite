"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { SignUpDataType } from "../page";

const Step1FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
});

const Step1 = ({
  onNext,
  onData,
}: {
  onNext: () => void;
  onData: (data: Partial<SignUpDataType>) => void;
}) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof Step1FormSchema>>({
    resolver: zodResolver(Step1FormSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof Step1FormSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulated API call
      // const response = await sendVerificationCode(data.email);
      // setMessage(response.message);

      // Mock success behavior
      setMessage("Email verified successfully");
      onData({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      }); // Pass data to the parent component
      onNext(); // Proceed to the next step
    } catch (error) {
      console.error("Error during sign-up:", error);
      setMessage("An error occurred during sign-up.");
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...field}
                    className="h-14"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="First Name"
                    {...field}
                    className="h-14"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    {...field}
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
            <span className="text-slate-500">Already have an account?</span>
            <Link href="/sign-in" className="text-custom ml-1">
              Sign In
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Step1;
