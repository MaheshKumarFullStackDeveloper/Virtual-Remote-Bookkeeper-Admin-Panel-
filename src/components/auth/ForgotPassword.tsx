"use client";
import { useForgotPasswordMutation } from "@/app/store/api";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2, Mail } from "lucide-react";
import { MotionConfig } from "framer-motion";
import toast from "react-hot-toast";
interface ForgotPasswordFormData {
  email: string;
}
export default function ForgotPassword() {

  const [forgetPasswordSuccess, setForgetPasswordSuccess] = useState(false);
  const [fogotPasswordLoading, setFogotPasswordLoading] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation()
  const {
    register: registerForgotPassword,
    handleSubmit: handleForgotPasswordSubmit,
    formState: { errors: forgotPasswordError },
  } = useForm<ForgotPasswordFormData>();

  const onSubmitFogotPassword = async (data: ForgotPasswordFormData) => {
    setFogotPasswordLoading(true);

    try {
      const { email } = data;
      const result = await forgotPassword({ email }).unwrap();

      if (result.success) {
        toast.success("Mail send successfully for forgot password")
        setForgetPasswordSuccess(true);
      }
    } catch (error) {
      console.log("Error on forgot password", error)
      toast.error("Email not found ");
    } finally {
      setFogotPasswordLoading(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              ForgotPassword
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and rest password
            </p>
          </div>
          <div>
            {!forgetPasswordSuccess ? (
              <>
                <form onSubmit={handleForgotPasswordSubmit(onSubmitFogotPassword)} className="space-y-4">
                  <div className="relative">
                    <Input
                      {...registerForgotPassword("email", {
                        required: "Email is required",
                      })}
                      placeholder="Email"
                      type="email"
                      className="pl-10"
                    />
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 "
                      size={20}
                    />
                  </div>
                  {forgotPasswordError.email && (
                    <p className="text-red-700 text-sm">
                      {forgotPasswordError.email.message}
                    </p>
                  )}
                  <Button type="submit" className="w-full font-bold">
                    {fogotPasswordLoading ? (
                      <>
                        {" "}
                        <Loader2
                          className="animate-spin mr-2"
                          size={20}
                        />{" "}
                      </>
                    ) : (
                      <>Send rest Link</>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <MotionConfig transition={{ type: "spring" }}>



                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                  <h3 className="text-xl font-semibold text-gray-600">
                    Rest link sended
                  </h3>
                  <p className="text-gray-500 ">
                    {`We've sent a password reset link to your email. Please
                  check your inbox and follow the instructions to reset
                  your password.`}
                  </p>
                  <Button
                    onClick={() => setForgetPasswordSuccess(false)}
                    className="w-full"
                  >
                    Send another llink to Email
                  </Button>

                </MotionConfig>
              </>
            )}

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Back to login Page ?
                <Link
                  href="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
