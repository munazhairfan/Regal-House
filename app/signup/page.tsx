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

  const hashPassword = async (password:string) => {
    const saltRounds = 10; // You can adjust the salt rounds (higher = slower but more secure)
    return await bcrypt.hash(password, saltRounds);
  };

  // Submit form data to Sanity
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors: FormErrors = {};

    if (!validateEmail(formData.email))
      formErrors.email = "Invalid email format.";
    if (!validatePassword(formData.password))
      formErrors.password = "Password must be at least 8 characters, include one lowercase, one uppercase, one digit, and one special character.";

    if (Object.keys(formErrors).length === 0) {
      const document = {
        _type: "users",
        email: formData.email,
        password: await hashPassword(formData.password),
      };
      // 
      const user = await client.fetch(`*[_type == "users" && email == "${formData.email}"][0]`)
      if(user && user.email == formData.email){
        toast({
          title: "Failed sign up",
          description: `This user already exists!`,
        });
      }else{

        try {
          const result = await client.create(document); // Create document in Sanity
          console.log("Signed Up:", result);
          toast({
            title: "Welcome!",
            description: `Your account has been created!`,
          });
          setFormData({
            email: "",
            password: "",
          });
          router.push('/');
        } catch (error) {
          console.error("Error submitting data:", error);
          toast({
            title: "Error Signing up",
            description: `There occured an issue in submitting your details!`,
          });
        }
      }
      // 

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
              <p className="font-semibold text-[36px] leading-[54px]">Sign Up</p>
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
                Sign Up
              </button>
            </div>
            <div className="flex">
            <p>Already have an account?&nbsp;</p><Link href={"/signin"} className="underline">Sign In</Link>
          </div>
          </div>
        </form>
      </div>
      <Footer2 />
    </div>
  );
};

export default Page;
