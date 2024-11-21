"use client"

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
// import { sendVerificationCode } from "@/services/auth";

const Step1FormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const Step1 = ({ onNext }: { onNext: (email: string) => void }) => {
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
      // const response = await sendVerificationCode(data.email);
      // setMessage(response.message);
      // if (response.success) {
      //   onNext(data.email);
      // } else {
      //   console.log("Sign-up failed");
      // }
      onNext(data.email);
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