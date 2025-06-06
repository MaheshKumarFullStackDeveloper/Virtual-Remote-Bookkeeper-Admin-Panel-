"use client";
import { useLoginMutation } from "@/app/store/api";

import { Input } from "@/components/ui/input" 
import { Button } from "@/components/ui/button"

import {  EyeCloseIcon, EyeIcon, LockIcon, MailIcon } from "@/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast, { LoaderIcon } from "react-hot-toast";
import { authStatus } from "@/app/store/slice/userSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/store/store";
export default function SignInForm() {

 const router =useRouter();
  
interface LoginFormData {
  email: string;
  password: string;
}
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const user = useSelector((state: RootState) => state?.user?.user);
    const dispatch=useDispatch();
      const [login]=useLoginMutation()
        const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginError },
  } = useForm<LoginFormData>();
    const onSubmitLogin =async(data:LoginFormData)=>{
    setLoginLoading(true);

    try{
      const {email,password}=data;
      const result = await login({email,password}).unwrap();
      console.log("this is login result",result)
      if(result.success){
        toast.success("Login successfully")
       
        dispatch(authStatus())
         window.location.reload();
      
      }

    }catch(error){
      console.log("Error on login",error)
      toast.error("Email and password not metch ");
    }finally{
    setLoginLoading(false);
    }
  }

    useEffect(() => {
          if (user) {
            router.push('/');
         
        }
     }, []);

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
  
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
          
          
          <form onSubmit={handleLoginSubmit(onSubmitLogin)} className="space-y-4">
                  <div className="relative">
                    <Input
                      {...registerLogin("email", {
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
                  {loginError.email && (
                    <p className="text-red-700 text-sm">
                      {loginError.email.message}
                    </p>
                  )}
                  <div className="relative">
                    <Input
                      {...registerLogin("password", {
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
                  {loginError.password && (
                    <p className="text-red-700 text-sm">
                      {loginError.password.message}
                    </p>
                  )}
                  <Button type="submit" className="w-full font-bold">
                    {loginLoading ? (
                      <>
                        {" "}
                        <LoaderIcon className="animate-spin mr-2 h-[20px] w-[20px]"  />{" "}
                      </>
                    ) : (
                      <>Login</>
                    )}
                  </Button>
                </form>
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
