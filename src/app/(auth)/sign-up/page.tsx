// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { sendVerificationCode } from "@/services/auth";
// import { z } from "zod";
// import { useRouter } from "next/navigation";
// import { Loader2 } from "lucide-react";
// import Link from "next/link";

// const FormSchema = z.object({
//   email: z.string().email("Invalid email address"),
// });

// const Page = () => {
//   const router = useRouter();

//   const [message, setMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       email: "",
//     },
//   });

//   const onSubmit = async (data: z.infer<typeof FormSchema>) => {
//     setIsSubmitting(true);
//     try {
//       const response = await sendVerificationCode(data.email);

//       setMessage(response.message);

//       if (response.success) {
//         console.log("Sign-up successful");
//         router.push("/verify-otp");
//       } else {
//         console.log("Sign-up failed");
//       }
//     } catch (error) {
//       console.log("Error during sign-up:", error);

//       setMessage("An error occurred during sign-up.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="size-full flex justify-center items-center px-4">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="py-6 max-w-sm w-full px-6 space-y-3 shadow-sm rounded-md border">
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="email"
//                     placeholder="Email" {...field}
//                     className="h-12"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {message && (
//             <div className="flex justify-center w-full bg-slate-100 py-2 rounded-md">
//               <span className="text-indigo-500">{message}</span>
//             </div>
//           )}

//           <Button
//             type="submit"
//             className="w-full h-12 bg-custom hover:bg-indigo-800 font-semibold"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <Loader2 className="animate-spin text-white" />
//             ) : (
//               "Continue"
//             )}
//           </Button>

//           <div className="w-full flex justify-center">
//             <span className="text-slate-500">Already have account?</span>
//             <Link href="/sign-in" className="text-custom ml-1">Sign In</Link>
//           </div>

//         </form>
//       </Form>
//     </div>
//   );
// }

// export default Page;

"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { signUp } from "@/services/auth";
import { sendVerificationCode } from "@/services/auth";
import { checkVerificationCode } from "@/services/auth";


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
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 w-full space-y-3 rounded-md">
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

const Step2 = ({ email, onNext }: { email: string, onNext: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendCode = async () => {
    setLoading(true);
    const response = await sendVerificationCode(email);
    setLoading(false);
    setMessage(response.message);
    if (response.success) {
      onNext();  // Move to the next step (Verify OTP)
    }
  };

  return (
    <div>
      <h2>Verify your Email</h2>
      <button onClick={handleSendCode} disabled={loading}>
        {loading ? "Sending..." : "Send Verification Code"}
      </button>
      {message && <p>{message}</p>}
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
