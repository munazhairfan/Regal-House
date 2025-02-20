"use client";
import React, { useState } from "react";
import Footer2 from "@/components/footer2";
import { useToast } from "@/hooks/use-toast";
import client from "../sanity";
import Link from "next/link";
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';

interface FormErrors {
  email?: string;
  password?: string;
}

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const { toast } = useToast();
    const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // Password must be at least 8 characters, include one lowercase, one uppercase, one digit, and one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit form data to Sanity
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors: FormErrors = {};
    const user = await client.fetch(
      `*[_type == "users" && email == "${formData.email}"][0]`
    );

    if (!validateEmail(formData.email)) {
      formErrors.email = "Invalid email format.";
    } else {
      if (user && user.email != formData.email) {
        formErrors.email = "Email does not exists!";
      }
    }

    if (!validatePassword(formData.password)) {
      formErrors.password =
        "Incorrect password!";
    }else{
      if(user && user.email==formData.email){
        const isPasswordMatch = await bcrypt.compare(formData.password, user.password);
        if(!isPasswordMatch){
          formErrors.password = "Incorrect password!"
        }            
      }
    }

    if (Object.keys(formErrors).length === 0) {
          toast({
            title: "Good to see you again!",
            description: `You've successfully signed in!`,
          });
          setFormData({
            email: "",
            password: "",
          });
          router.push('/');
    } else {
      setErrors(formErrors); // Show errors on form
    }
  };

  return (
    <div className="font-poppins">
      <div className="w-full flex justify-center">
        <form onSubmit={handleSubmit}>
          <div className="lg:w-[608px] h-[630px] flex flex-col justify-between p-16">
            <div>
              <p className="font-semibold text-[36px] leading-[54px]">
                Sign In
              </p>
            </div>
            <div className="h-[121px] flex flex-col justify-between">
              <label className="font-medium">Email address</label>
              <input
                className="lg:w-[423px] h-[75px] border-2 rounded-[10px] p-3"
                type="text"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                name="email"
              ></input>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="h-[121px] flex flex-col justify-between">
              <label className="font-medium">Password</label>
              <input
                className="lg:w-[423px] h-[75px] border-2 rounded-[10px] p-3"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              ></input>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="flex items-center space-x-[12px]">
              <input type="checkbox" className="h-[27px] w-[30px]" />
              <label className="text-gray-700">Remember me</label>
            </div>
            <div className="lg:h-[64px] flex lg:w-[423px] justify-between items-center flex-col">
              <button
                type="submit"
                className="w-[215px] h-[64px] border rounded-[15px] 
                    text-xl border-black"
              >
                Sign In
              </button>
            </div>
            <div className="flex">
              <p>Create account?&nbsp;</p>
              <Link href={"/signup"} className="underline">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Footer2 />
    </div>
  );
};

export default Page;
