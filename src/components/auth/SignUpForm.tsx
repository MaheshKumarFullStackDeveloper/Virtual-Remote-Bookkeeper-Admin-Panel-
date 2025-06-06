"use client";
import { useRegisterMutation } from "@/app/store/api";
import { toggleLoginDialog } from "@/app/store/slice/userSlice";
import {  EyeCloseIcon, EyeIcon, LockIcon, MailIcon, UserIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { LoaderIcon } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input" 
import { Button } from "@/components/ui/button"
interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

export default function SignUpForm() {

  const dispatch=useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [register]=useRegisterMutation()
  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signupError },
  } = useForm<SignUpFormData>();
    const onSubmitSignUp =async(data:SignUpFormData)=>{
    setSignupLoading(true);

    try{
      const {email,password,name}=data;
      const result = await register({email,password,name}).unwrap();
      console.log("this is register result",result)
      if(result.success){
        toast.success("Verification link send to your email successfully")
        dispatch(toggleLoginDialog())
      }
    }catch(error){
      console.log("Error on register",error)
      toast.error("Email Allready Register");
    }finally{    setSignupLoading(false);
    }
  }
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
     
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            <form className="space-y-4"  onSubmit={handleSignUpSubmit(onSubmitSignUp)} >
                  <div className="relative">
                    <Input
                      {...registerSignUp("name", {
                        required: "Name is required",
                      })}
                      placeholder="Name"
                      type="text"
                      className="pl-10"
                    />
                    <UserIcon
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 "
                      size={20}
                    />
                  </div>
                  {signupError.name && (
                    <p className="text-red-700 text-sm">
                      {signupError.name.message}
                    </p>
                  )}
                  <div className="relative">
                    <Input
                      {...registerSignUp("email", {
                        required: "Email is required",
                      })}
                      placeholder="Email"
                      type="email"
                      className="pl-10"
                    />
                    <MailIcon
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 "
                      size={20}
                    />
                  </div>
                  {signupError.email && (
                    <p className="text-red-700 text-sm">
                      {signupError.email.message}
                    </p>
                  )}
                  <div className="relative">
                    <Input
                      {...registerSignUp("password", {
                        required: "Password is required",
                      })}
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10"
                    />
                    <LockIcon
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 "
                      size={20}
                    />
                    {showPassword ? (
                      <>
                        <EyeCloseIcon
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 "
                          size={20}
                          onClick={() => setShowPassword(false)}
                        />
                      </>
                    ) : (
                      <>
                        <EyeIcon
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 "
                          size={20}
                          onClick={() => setShowPassword(true)}
                        />
                      </>
                    )}
                  </div> 
                  {signupError.password && (
                    <p className="text-red-700 text-sm">
                      {signupError.password.message}
                    </p>
                  )}

                  <div className="flex items-center ">
                    <Input
                      type="checkbox"
                      className="mr-2 h-5 w-5"
                      {...registerSignUp("agreeTerms", {
                        required: "Agree to Terms is required",
                      })}
                    />
                    <label className="text-sm text-gray-700">
                      Agree to Terms and Condition
                    </label>
                  </div>
                  {signupError.agreeTerms && (
                    <p className="text-red-700 text-sm">
                      {signupError.agreeTerms.message}
                    </p>
                  )}
                  <Button type="submit" className="w-full font-bold">
                    {signupLoading ? (
                      <>
                        {" "}
                        <LoaderIcon className="animate-spin mr-2 h-5 w-5" />{" "}
                      </>
                    ) : (
                      <>SignUp</>
                    )}
                  </Button >
                </form>

      
      
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?
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
